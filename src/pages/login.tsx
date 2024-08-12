import React from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';

export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src="/src/assets/pocke.svg.png" alt="pokemon" className="w-1/2" />
        <Input type="text" bsize="md" placeholder="아이디를 입력하세요" />
        <Input type="text" bsize="md" placeholder="비밀번호를 입력하세요" />
        <Button btnType={'lg'} color="red-500">
          로그인
        </Button>
      </div>
    </>
  );
}
