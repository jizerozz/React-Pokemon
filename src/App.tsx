import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/global.css';
import { Button } from './components/Button/Button.tsx';
import { PokeCard, pokeCardProps } from './components/PokeCard.tsx';

function App() {
  const [pokemon, setPokemon] = useState<pokeCardProps[]>([]);
  const [offset, setOffset] = useState(0);
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

  return (
    <>
      <article className="pt-6">
        <header className="flex flex-col gap-2 w-full px-4 x-50"></header>
        <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
          <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
            {pokemon.length > 0 ? (
              pokemon.map(({ url, name }) => (
                <PokeCard key={url} url={url} name={name} />
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
