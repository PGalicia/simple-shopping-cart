import { getHello } from "./actions";

export default async function Home() {
  const message = await getHello();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{message}</h1>
    </main>
  );
}
