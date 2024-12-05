import { getHello } from "./actions";

export default async function Home() {
  const data = await getHello();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold">{data.message}</h1>
      <div className="flex gap-8 text-xl">
        <p>Products: {data.stats.products}</p>
        <p>Carts: {data.stats.carts}</p>
      </div>
    </main>
  );
}
