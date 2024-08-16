import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from '../../assets/Loading';
import LessThan from '../../assets/LessThan';
import GreaterThan from '../../assets/GreaterThan';
import ArrowLeft from '../../assets/ArrowLeft';
import Balance from '../../assets/Balance';
import Vector from '../../assets/Vector';
import { Type } from '../../components/Type';
import BaseStat from '../../components/BaseStat';

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
            <LessThan className="w-5 h-8 p-1" />
          </Link>
        )}

        {pokemon?.next && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 right-1"
            to={`/pokemon/${pokemon?.next}`}
          >
            <GreaterThan className="w-5 h-8 p-1" />
          </Link>
        )}

        <section className="w-full flex flex-col z-20 items-center justify-end relative h-full">
          <div className="absolute z-30 top-6 flex items-center w-full justify-between px-2">
            <div className="flex items-center gap-1">
              <Link to="/">
                <ArrowLeft className="w-6 h-8 text-zinc-200" />
              </Link>
              <h1 className="text-zinc-200 font-bold text-xl capitalize">
                {pokemon?.name}
              </h1>
            </div>
            <div>
              <h2 className="text-zinc-200 font-bold text-md">
                #{pokemon?.id.toString().padStart(3, '00')}
              </h2>
            </div>
          </div>
          <div className="relative h-auto max-w-[15.5rem] x-20 mt-6 mb-16">
            <img
              src={img}
              width="100%"
              height="auto"
              loading="lazy"
              alt={pokemon?.name}
              className={'object-contain h-full'}
            />
          </div>
        </section>

        <section className="w-full min-h-[65%] h-full bg-gray-800 z-10 pt-14 flex flex-col items-center gap-3 px-5 pb-4">
          <div className="flex items-center justify-center gap-4">
            {pokemon?.types.map((item) => <Type key={item} type={item} />)}
          </div>
          <h2 className={`text-base font-semibold ${text}`}>정보</h2>
          <div className="flex w-full items-center justify-between max-w-[400px] text-center">
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-200">Weight</h4>
              <div className="text-zinc-200 text-sm mt-1 flex gap-2 justify-center ">
                <Balance />
                {pokemon?.weight}kg
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-200">Weight</h4>
              <div className="text-zinc-200 text-sm mt-1 flex gap-2 justify-center ">
                <Vector />
                {pokemon?.height}m
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-200">Weight</h4>
              {pokemon?.abilities.map((ability) => (
                <div
                  key={ability}
                  className="text-[0.5rem] text-zinc-200 capitalize"
                >
                  {ability}
                </div>
              ))}
            </div>
          </div>

          <h2 className={`text-base font-semibold ${text}`}>기본 능력치</h2>
          <div className="w-full">
            <table>
              <tbody>
                {pokemon?.stats.map((stat) => (
                  <BaseStat
                    key={stat.name}
                    valueStat={stat.basestat}
                    nameStat={stat.name}
                    type={pokemon?.types[0]}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {pokemon?.DamageRelations && (
            <div className="w-10/12">
              <h2 className={`text-base text-center font-semibold ${text}`}>
                데미지관계
              </h2>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
