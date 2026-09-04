const StarRating = ({
  filled,
  total = 3,
  onRate,
}: {
  filled: number;
  total?: number;
  onRate?: (n: number) => void;
}) => {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${filled} / ${total} 星`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={i < filled ? "star" : "star-off"}
          onClick={onRate ? () => onRate(i + 1) : undefined}
          role={onRate ? "button" : undefined}
          tabIndex={onRate ? 0 : undefined}
          onKeyDown={
            onRate
              ? (e) => {
                  if (e.key === " ") e.preventDefault();
                  if (e.key === "Enter" || e.key === " ") onRate(i + 1);
                }
              : undefined
          }
          style={onRate ? { cursor: "pointer" } : undefined}
        >
          ★
        </span>
      ))}
    </span>
  );
};

export default StarRating;
