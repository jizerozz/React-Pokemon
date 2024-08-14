import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface Pokemonstat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Damageslot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface DamageRelations {
  double_damage_from: { name: string; url: string }[];
  double_damage_to: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  half_damage_to: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
  no_damage_to: { name: string; url: string }[];
}

interface PokemonData {
  id: number;
  name: string;
  weight: number;
  height: number;
  previous: { name: string; url: string } | null;
  next: { name: string; url: string } | null;
  abilities: string[];
  stats: { name: string; basestat: number }[];
  DamageRelations: DamageRelations[];
}

export default function DetailPage() {
  const [pokemon, setPokemon] = useState<PokemonData>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
    try {
      const { data: pokemonData } = await axios.get(url);
      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities } =
          pokemonData;
        const nextAndPrevPokemon = await getNextAndPreviousPokemon(id);

        const DamageRelations = await Promise.all(
          types.map(async (i: Damageslot) => {
            console.log('i', i);
            const type = await axios.get(i.type.url);
            return type.data.damage_relations;
          })
        );

        const formattedData = {
          id: id,
          name: name,
          weight: weight / 10,
          height: height / 10,
          previous: nextAndPrevPokemon.previous,
          next: nextAndPrevPokemon.next,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          DamageRelations,
        };

        setPokemon(formattedData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatPokemonStats = (stats: Pokemonstat[]) => {
    return stats.map((stat) => ({
      name: stat.stat.name,
      basestat: stat.base_stat,
    }));
  };
  const formatPokemonAbilities = (abilities: PokemonAbility[]): string[] => {
    return abilities
      .filter((_, idx: number) => idx <= 1)
      .map((obj) => obj.ability.name.replace(/-/g, ' '));
  };

  async function getNextAndPreviousPokemon(id: number) {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);

    const prevPokemon =
      pokemonData.previous && (await axios.get(pokemonData.previous));
    const nextPokemon = pokemonData.next && (await axios.get(pokemonData.next));

    return {
      next: nextPokemon?.data?.results?.[0],
      previous: prevPokemon?.data?.results?.[0],
    };
  }

  if (isLoading) return <div>loading...</div>;
  return <div></div>;
}
