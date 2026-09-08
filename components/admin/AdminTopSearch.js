"use client";
import { useRouter } from "next/navigation";
import { AdmIcons } from "./AdmIcons";

export default function AdminTopSearch() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.q.value.trim();
    if (value) router.push(`/admin/orders?search=${encodeURIComponent(value)}`);
  };

  return (
    <form className="adm-search" onSubmit={handleSubmit}>
      <AdmIcons.Search />
      <input name="q" type="text" placeholder="Order ID, name, mobile…" />
    </form>
  );
}
