"use client";
import { useRouter } from "next/navigation";

const SORT_OPTIONS = [
  { value: "", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

export default function SortSelect({ categorySlug, activeSub, sort }) {
  const router = useRouter();

  const onChange = (e) => {
    const q = new URLSearchParams();
    if (activeSub) q.set("sub", activeSub);
    if (e.target.value) q.set("sort", e.target.value);
    const qs = q.toString();
    router.push(`/category/${categorySlug}${qs ? `?${qs}` : ""}`);
  };

  return (
    <select className="sort-select" defaultValue={sort} onChange={onChange}>
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          Sort: {opt.label}
        </option>
      ))}
    </select>
  );
}
