import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
