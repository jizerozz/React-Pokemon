import React from 'react';
import { Button } from './Button/Button';
import { Input } from './Input/Input';
import { useState } from 'react';
//import { useDebounce } from '../hooks/useDebounce';
import { pokemon } from '../pages/MainPage/MainPage';

export interface AutoCompleteprops {
  allpokemons: pokemon[];
  setdisplayPokemons: React.Dispatch<React.SetStateAction<pokemon[]>>;
}

const AutoComplete = ({
  allpokemons,
  setdisplayPokemons,
}: AutoCompleteprops) => {
  const [searchTerm, setSearchTerm] = useState('');
  //const debounceSearchTerm = useDebounce({ value: searchTerm, delay: 1000 });

  const filterNames = (input: string) => {
    const value = input.toLowerCase();
    return value ? allpokemons.filter((item) => item.name.includes(value)) : [];
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = searchTerm.trim();
    setdisplayPokemons(filterNames(text));
    setSearchTerm('');
  };

  const checkEqualName = (input: string) => {
    const filteredArray = filterNames(input);

    return filteredArray[0]?.name === input ? [] : filteredArray;
  };

  return (
    <div className="relative z-50">
      <form
        className="relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto"
        onSubmit={handleSubmit}
      >
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
      {checkEqualName(searchTerm).length > 0 && (
        <div
          className={`w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2`}
        >
          <div
            className={`w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 -translate-y-1/2`}
          >
            <ul
              className={`w-40 max-h-[134px] py-1 bg-gray-700 rounded-lg absolute top-0 overflow-auto scrollbar-none`}
            >
              {checkEqualName(searchTerm).map((item, idx) => {
                return (
                  <li key={`button-${idx}`}>
                    <button
                      onClick={() => setSearchTerm(item.name)}
                      className={`text-base w-full hover:bg-gray-600 p-[2px] text-gray-100`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
