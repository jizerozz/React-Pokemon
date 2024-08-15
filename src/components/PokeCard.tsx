import { useState, useEffect } from 'react';
import axios from 'axios';
//import { setColors } from './SetColors';
import { Link } from 'react-router-dom';

export interface PokemonType {
  id: number;
  name: string;
  type: string;
}

interface FormatType {
  id: number;
  name: string;
  types: { type: { name: string } }[];
}

export interface pokeCardProps {
  id?: number | undefined;
  url: string;
  name: string;
}

export const PokeCard = ({ url, name }: pokeCardProps) => {
  const [pokemon, setPokemon] = useState<PokemonType | null>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      const pokemonData = formatPokedata(res.data);
      setPokemon(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatPokedata = (params: FormatType) => {
    const { id, types, name } = params;
    const pokeData = {
      id,
      name,
      type: types[0].type.name,
    };
    return pokeData;
  };

  const bg = `bg-${pokemon?.type}`;
  const border = `border-${pokemon?.type}`;
  const text = `text-${pokemon?.type}`;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  return (
    <div
      className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0  bg-slate-800 justify-between items-center`}
    >
      {pokemon && (
        <Link to={`/pokemon/${name}`}>
          <div
            className={`${text} h-[1.5rem] text-xs w-full pt-1 px-2 text-right rounded-t-lg `}
          >
            #{pokemon.id.toString().padStart(3, '00')}
          </div>
          <div className={`w-full f-6 flex items-center justify-center`}>
            <div
              className={
                'box-border relative flex w-full h-[5.5rem] basis justify-center items-center'
              }
            >
              <img
                src={img}
                alt={name}
                width="100%"
                className={`object-contain h-full`}
              />
            </div>
          </div>
          <div
            className={`${bg} text-xs text-zinc-100 h-[1.5rem] rounded-b-lg uppercase font-medium pt-1 text-center`}
          >
            {pokemon.name}
          </div>
        </Link>
      )}
    </div>
  );
};
