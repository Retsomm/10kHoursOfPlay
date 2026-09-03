const StarRating = ({ filled, total = 3 }: { filled: number; total?: number }) => {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${filled} / ${total} 星`}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={i < filled ? "star" : "star-off"}>
          ★
        </span>
      ))}
    </span>
  );
};

export default StarRating;
