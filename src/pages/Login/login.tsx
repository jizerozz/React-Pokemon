import React from 'react';
// import { Button } from '../../components/Button/Button';
// import { Input } from '../../components/Input/Input';

export default function Login() {
  return (
    <>
      <div className="bg-gray-50 min-h=[90vh] flex items-center justify-center">
        <div className=" bg-gray-100 flex rounded-2xl max-w-2.5xl p-5">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl max-w-3xl p-5">Pokemon</h2>
            {/* <div className="flex flex-col items-center pt-5">
              <Input type="text" bsize="lg" placeholder="아이디를 입력하세요" />
              <Input
                type="text"
                bsize="lg"
                placeholder="비밀번호를 입력하세요"
              />
              <Button btnType="lg" color="red-500">
                로그인
              </Button>
            </div> */}
          </div>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
            alt="pokemon"
            className="rounded-2xl"
          />
        </div>
      </div>
    </>
  );
}
