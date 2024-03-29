interface Props {
  title: string;
  description: string;
}

export function ListColumn({ title, description }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center" key={title}>
      <div className="text-xl font-bold">{title}</div>
      <p className="text-lg">{description}</p>
    </div>
  );
}
