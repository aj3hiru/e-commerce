function Star({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

export default function StarRating({ value, size = 16 }) {
  const rounded = Math.round(value);
  return (
    <span className="pdp-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ width: size, height: size }}>
          <Star filled={i <= rounded} />
        </span>
      ))}
    </span>
  );
}
