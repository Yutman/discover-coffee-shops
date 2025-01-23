import Banner from "@/components/banner.client";
import Card from "@/components/card.server";

export default function Home() {
  const coffeeStoreId = 'dark-horse-coffee';
  const coffeeStores = [
    {
        "name": "StrangeLove Coffee",
        "imgUrl": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Dark Horse Coffee",
        "imgUrl": "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
     {
        "name": "StrangeLove Coffee",
        "imgUrl": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Dark Horse Coffee",
        "imgUrl": "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
     {
        "name": "StrangeLove Coffee",
        "imgUrl": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Dark Horse Coffee",
        "imgUrl": "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
