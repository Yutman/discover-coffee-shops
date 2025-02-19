import React from 'react'
import Link from 'next/link';
import { fetchCoffeeStore, fetchCoffeeStores } from '@/lib/coffee-stores';
import Image from 'next/image';
import { CoffeeStoreType } from '@/types';


async function getData(id: string) {
  //google api call
  const coffeeStore = await fetchCoffeeStore(id);
  if (!coffeeStore) {
    throw new Error(`Coffee store with id ${id} not found`);
  }
  return coffeeStore;
}

export async function generateStaticParams () {
  const coffeeStores = await fetchCoffeeStores('43.65107,-79.347015');

  return coffeeStores.map((coffeeStore: CoffeeStoreType) => ({
    id: coffeeStore.id, //Ensure that each object contains the id
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  // Await the data properly
  const { id } = params;

  // Fetch coffee store data
  const coffeeStore: CoffeeStoreType = await getData(id);


  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{coffeeStore.name}</h1>
          </div>
          <Image
            src={coffeeStore.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px]"
            alt={'Coffee Store Image'}
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {coffeeStore.address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{coffeeStore.address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
