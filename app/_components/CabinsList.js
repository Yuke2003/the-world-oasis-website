import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinsList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;

  let displayCabins;

  if (filter === "all") displayCabins = cabins;

  if (filter === "small")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 6 && cabin.maxCapacity <= 8);
  if (filter === "large")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 9);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinsList;
