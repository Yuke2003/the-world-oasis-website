"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <button
        className="px-5 py-2 hover:bg-primary-600"
        onClick={() => handleFilter("all")}
      >
        All Cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-600"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </button>

      <button
        className="px-5 py-2 hover:bg-primary-600"
        onClick={() => handleFilter("medium")}
      >
        4&mdash;8 guests
      </button>

      <button
        className="px-5 py-2 hover:bg-primary-600"
        onClick={() => handleFilter("large")}
      >
        9&mdash;12 guests
      </button>
    </div>
  );
}

export default Filter;
