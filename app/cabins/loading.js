"use client";
import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid place-items-center">
      <Spinner />
      <p className="text-xl text-primary-100">Loading Cabins data....</p>
    </div>
  );
}
