interface TypeProps {
  type: string;
  dmvalue?: string;
}
export function Type({ type, dmvalue }: TypeProps) {
  const bg = `bg-${type}`;
  return (
    <div>
      <span
        className={`h-[1.5rem] py-1 px-3 rounded-2xl ${bg} font-bold text-zinc-800 text-[0.6rem] leading-[0.8rem] capitalize flex gap-1 justify-center items-center`}
      >
        {type}
      </span>
      {dmvalue && (
        <span className="bg-zinc-200/40 p-[.125rem] rounded-lg">{dmvalue}</span>
      )}
    </div>
  );
}
