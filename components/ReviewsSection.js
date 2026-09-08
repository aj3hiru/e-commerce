import StarRating from "./StarRating";

export default function ReviewsSection({ reviews }) {
  return (
    <div>
      <h2 className="pdp-section-title">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p className="reviews-empty">No reviews yet — be the first to review this product!</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((r, i) => (
            <div className="review-item" key={i}>
              <div className="row">
                <span className="name">{r.name}</span>
                <StarRating value={r.rating} size={14} />
              </div>
              <p className="text">{r.text}</p>
            </div>
          ))}
        </div>
      )}
      <p className="review-login-cta">
        <a href="/login">Login</a> to write a review.
      </p>
    </div>
  );
}
