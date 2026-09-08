export default function CategoryRow({ title, items }) {
  return (
    <>
      <div className="cat-row-title">{title}</div>
      <div className="cat-cards">
        {items.map((item) => (
          <div className="ccard" key={item.title}>
            <div className="thumb">
              {item.img ? (
                <img src={item.img} alt={item.title} />
              ) : (
                <span>{item.emoji}</span>
              )}
            </div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
