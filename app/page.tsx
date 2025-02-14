import Card from "@/components/card.server";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";

async function getData() {
  const TORONTO_LAT_LONG = '43.65107,-79.347015';
  return await fetchCoffeeStores('43.65107,-79.347015');
}

export default async function Home() {
  const coffeeStores = await getData();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores/>
        <div className="nt-20">
          <h2 className="nt-8 pb-8 text-4xl font-bold text-white">
            Toronto Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((coffeeStore: CoffeeStoreType, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${idx}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
