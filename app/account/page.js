import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Account() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1 className=" text-accent-500 text-xl ">
        Welcome, {session.user.name}
      </h1>
    </div>
  );
}
