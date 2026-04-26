export function RecordBody({ body }: { body: string }) {
  return (
    <div className="space-y-5 text-base leading-8 text-foam/80">
      {body.split("\n\n").map((block) => (
        <p key={block}>{block}</p>
      ))}
    </div>
  );
}
