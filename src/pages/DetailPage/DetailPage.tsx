import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from '../../assets/Loading';
import ArrowRight from '../../assets/ArrowRight';
import ArrowLeft from '../../assets/ArrowLeft';

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
  types: string[];
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
          types: types.map((type: Damageslot) => type.type.name),
        };

        setPokemon(formattedData);
        console.log(pokemon);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

  if (isLoading)
    return (
      <div
        className={`absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-50`}
      >
        <Loading />
      </div>
    );

  if (!isLoading && !pokemon) {
    return <div>Not found</div>;
  }

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
  const bg = `bg-${pokemon?.types?.[0]}`;
  const text = `text-${pokemon?.types?.[0]}`;
  return (
    <article className="flex items-center gap-1 flex-col w-full">
      <div
        className={`${bg} w-auto h-full flex flex-col z-0 items-center justify-end relative overflow-hidden`}
      >
        {pokemon?.previous && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 x-50 left-1"
            to={`/pokemon/${pokemon?.previous}`}
          >
            <ArrowLeft />
          </Link>
        )}

        {pokemon?.next && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 x-50 left-1"
            to={`/pokemon/${pokemon?.next}`}
          >
            <ArrowRight />
          </Link>
        )}
      </div>
    </article>
  );
}
