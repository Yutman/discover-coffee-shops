'use client'

import React, { useState, useEffect } from 'react'
import Banner from './banner.client';
import useTrackLocation from '@/hooks/use-track-location';
import Card from './card.server';
import { CoffeeStoreType } from '@/types';
import { fetchCoffeeStores } from '@/lib/coffee-stores';

export default function NearbyCoffeeStores() {
    const [coffeeStores, setCoffeeStores] = useState<CoffeeStoreType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } = useTrackLocation(); 

    const handleOnClick = () => {
        handleTrackLocation(); 
    };

    // Fetch coffee stores when location changes
    useEffect(() => {
        async function fetchStoresNearby() {
            if (longLat) {
                setIsLoading(true);
                try {
                    const stores = await fetchCoffeeStores(longLat); // Pass longLat to the fetch function
                    setCoffeeStores(stores); // Store the fetched data
                    setIsLoading(false);
                } catch (err) {
                    setError('Unable to fetch nearby coffee shops.');
                    setIsLoading(false);
                }
            }
        }

        fetchStoresNearby();
    }, [longLat]); // Dependency array to trigger when longLat changes

    return (
        <div>
            <Banner handleOnClick={handleOnClick} buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'} />
            {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
            {isLoading && <p>Loading stores...</p>}
            {error && <p>{error}</p>}

            <div className="nt-20">
                <h2 className="nt-8 pb-8 text-4xl font-bold text-white">Stores near me</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {coffeeStores.length > 0 ? (
                        coffeeStores.map((coffeeStore: CoffeeStoreType, idx: number) => (
                            <Card
                                key={`${coffeeStore.name}-${idx}`}
                                name={coffeeStore.name}
                                imgUrl={coffeeStore.imgUrl}
                                href={`/coffee-store/${coffeeStore.id}`}
                            />
                        ))
                    ) : (
                        <p>No stores found</p>
                    )}
                </div>
            </div>
        </div>
    );
}





// export default function NearbyCoffeeStores() {

//     const {handleTrackLocation, isFindingLocation, longLat, locationErrorMsg} = useTrackLocation(); //this hook will be used for mainly getting the location info and showing it to us

//     const handleOnClick = () => {
//         handleTrackLocation(); 
// };


//   useEffect(() => {
//     async function coffeeStoresByLocation(){
//       if(longLat) {
//         const response = await fetchCoffeeStores (longLat);
//         console.log({response});
//       }
//     }

//     coffeeStoresByLocation();
//   }, [longLat]);

//   return (
//   <div>
//         <Banner handleOnClick={handleOnClick}
//         buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
//         />
//         {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}

//           <div className="nt-20">
//           <h2 className="nt-8 pb-8 text-4xl font-bold text-white">
//             Stores near me
//           </h2>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
//             {[].map((coffeeStore: CoffeeStoreType, idx: number) => (
//               <Card
//                 key={`${coffeeStore.name}-${idx}`}
//                 name={coffeeStore.name}
//                 imgUrl={coffeeStore.imgUrl}
//                 href={`/coffee-store/${coffeeStore.id}`}
//               />
//             ))}
//           </div>
//         </div>
//   </div>
//   );
// }