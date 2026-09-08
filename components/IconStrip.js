import { ICON_STRIP } from "@/lib/siteData";

export default function IconStrip() {
  return (
    <div className="icon-strip">
      {ICON_STRIP.map((item) => (
        <div className="strip-item" key={item.label}>
          <div className={`circle ${item.cls}`}>{item.emoji}</div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
