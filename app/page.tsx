import Banner from "@/components/banner.client";
import Card from "@/components/card.server";

export default function Home() {
  const coffeeStoreId = 'dark-horse-coffee';
 const coffeeStores = [
  {
    name: "StrangeLove Coffee",
    imgUrl: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Dark Horse Coffee",
    imgUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "StrangeLove Coffee",
    imgUrl: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Dark Horse Coffee",
    imgUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "StrangeLove Coffee",
    imgUrl: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Dark Horse Coffee",
    imgUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

  return (
    <div className='mb-56'>
       <main className="mx-auto mt-10 max-w-6xl px-4">
          <Banner/>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 
          lg:gap-6">
            {coffeeStores.map((coffeeStore, idx) => (
          <Card 
            key={`${coffeeStore.name}-${idx}`}
            name={coffeeStore.name}
            imgUrl={coffeeStore.imgUrl} 
            href={`/coffee-store/${idx}`}
          />
            ))}
          </div>
       </main>
    </div>
  );
}
