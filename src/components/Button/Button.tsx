import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  btnType: string;
  color?: string;
}

export function Button({ children, btnType, color, ...props }: ButtonProps) {
  const size =
    btnType === 'lg' ? 'w-full' : btnType === 'md' ? 'w-1/3' : 'w-1/7';
  return (
    <button
      className={`items-center bg-${color} ${size} rounded-md h-10 text-white`}
      {...props}
    >
      {children}
    </button>
  );
}
