"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function createBooking(bookingData, formdata) {
  const session = await auth();

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formdata.get("numGuests")),
    observations: formdata.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase
    .from("booking")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/thankyou");
}

export async function updateProfile(formdata) {
  const session = await auth();
  const nationalID = formdata.get("nationalID");
  const [nationality, countryFlag] = formdata.get("nationality").split("%");

  const updateData = { nationalID, nationality, countryFlag };

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut("google", { redirectTo: "/account" });
}

export async function deleteReservation(bookingId) {
  console.log(bookingId);
  const { error } = await supabase.from("booking").delete().eq("id", bookingId);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservation");
}

export async function updateReservation(formdata) {
  const updatedFields = {
    numGuests: Number(formdata.get("numGuests")),
    observations: formdata.get("observations").slice(0, 1000),
  };

  const bookingId = Number(formdata.get("bookingId"));

  const { error } = await supabase
    .from("booking")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservation/edit/${bookingId}`);

  revalidatePath("/account/reservation");

  redirect("/account/reservation");
}
