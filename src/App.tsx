import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/global.css';
import { Button } from './components/Button/Button.tsx';
import { PokeCard, pokeCardProps } from './components/PokeCard.tsx';
import { Input } from './components/Input/Input.tsx';
import { useDebounce } from './hooks/useDebounce.ts';

function App() {
  const [pokemon, setPokemon] = useState<pokeCardProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearchTerm = useDebounce({ value: searchTerm, delay: 1000 });
  const limit = 20;
  const color = 'slate-800';

  const fetchPokeData = async (isFetchData: boolean) => {
    try {
      const offsetValue = isFetchData ? 0 : offset;
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`;
      const response = await axios.get(url);
      const newPokemon = response.data.results.map((item: pokeCardProps) => ({
        url: item.url,
        name: item.name,
      }));

      setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokeData(true);
  }, []);

  useEffect(() => {
    handleSearchInput(debounceSearchTerm);
  }, [debounceSearchTerm]);

  const handleSearchInput = async (searchTerm: string) => {
    if (searchTerm.length > 0) {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
        );
        const pokemonData = {
          id: res.data.id,
          url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}`,
          name: searchTerm,
        };
        setPokemon([pokemonData]);
      } catch (error) {
        setPokemon([]);
        console.error(error);
      }
    } else {
      fetchPokeData(true);
    }
  };

  return (
    <>
      <article className="pt-6">
        <header className="flex flex-col gap-2 w-full px-4 x-50">
          <div className="relative z-50">
            <form className="relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto">
              <Input
                type="text"
                className="text-xs w-[20.5rem] h-6 px-2 py-1 rounded-lg text-gray-300 text-center bg-[hsl(214,13%,47%)]"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                bsize="md"
                placeholder="검색어를 입력하세요."
              />
              <Button
                type="submit"
                btnType="sm"
                className="text-xs absolute right-0 hover:bg-slate-700 text-white bg-slate-800 w-[3rem] h-6 rounded-lg"
              >
                검색
              </Button>
            </form>
          </div>
        </header>
        <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
          <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
            {pokemon.length > 0 ? (
              pokemon.map(({ url, name, id }) => (
                <PokeCard id={id} url={url} name={name} />
              ))
            ) : (
              <h2 className="font-medium text-lg text-slate-900 mb-1">
                not values pockmon
              </h2>
            )}
          </div>
        </section>
        <div className="text-center">
          <Button
            color={color}
            btnType="md"
            onClick={() => fetchPokeData(false)}
          >
            더보기
          </Button>
        </div>
      </article>
    </>
  );
}

export default App;
