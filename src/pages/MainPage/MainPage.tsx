import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/global.css';
import { Button } from '../../components/Button/Button.tsx';
import { PokeCard } from '../../components/PokeCard.tsx';
import AutoComplete from '../../components/AutoComplete.tsx';

export interface pokemon {
  id?: number | undefined;
  name: string;
  url: string;
}
export interface pokeDataProps {
  allPokemons: pokemon[];
  displayPokemons: pokemon[];
}

function MainPage() {
  const [allPokemons, setAllpokemons] = useState<pokemon[]>([]);
  const [displayPokemons, setDisplayPokemons] = useState<pokemon[]>([]);
  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;
  const color = 'slate-800';

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      setAllpokemons(response.data.results);
      setDisplayPokemons(
        filteredDisplayPokemon({
          allPokemons: response.data.results,
          displayPokemons: [],
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDisplayPokemon = ({
    allPokemons,
    displayPokemons,
  }: pokeDataProps) => {
    const limit = displayPokemons.length + limitNum;

    const array = allPokemons.filter((item, idx) => idx + 1 <= limit);
    return array;
  };

  useEffect(() => {
    fetchPokeData();
  }, []);

  return (
    <>
      <article className="pt-6">
        <header className="flex flex-col gap-2 w-full px-4 x-50">
          <AutoComplete
            allpokemons={allPokemons}
            setdisplayPokemons={setDisplayPokemons}
          />
        </header>
        <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
          <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
            {displayPokemons.length > 0 ? (
              displayPokemons.map(({ url, name, id }) => (
                <PokeCard key={id} id={id} url={url} name={name} />
              ))
            ) : (
              <h2 className="font-medium text-lg text-slate-900 mb-1">
                not values pockmon
              </h2>
            )}
          </div>
        </section>
        <div className="text-center">
          {allPokemons.length > displayPokemons.length &&
            displayPokemons.length !== 1 && (
              <Button
                color={color}
                btnType="md"
                onClick={() =>
                  setDisplayPokemons(
                    filteredDisplayPokemon({ allPokemons, displayPokemons })
                  )
                }
              >
                더보기
              </Button>
            )}
        </div>
      </article>
    </>
  );
}

export default MainPage;
