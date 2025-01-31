import Banner from "@/components/banner.client";
import Card from "@/components/card.server";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";


async function getData() {
  //mapbox api
    return await fetchCoffeeStores();
  }

export default async function Home() {
  const coffeeStores = await getData();

  return (
    <div className='mb-56'>
       <main className="mx-auto mt-10 max-w-6xl px-4">
          <Banner/>
          <div className="nt-20">
            <h2 className="nt-8 pb-8 text-4xl font-bold text-white">
              Toronto Stores
            </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 
          lg:gap-6">
            {coffeeStores.map((coffeeStore: CoffeeStoreType, idx: number) => (
          <Card 
            key={`${coffeeStore.name}-${idx}`}
            name={coffeeStore.name}
            imgUrl={coffeeStore.imgUrl} 
            href={`/coffee-store/${idx}`}
          />
            ))}
          </div>
          </div>
       </main>
    </div>
  );
}
