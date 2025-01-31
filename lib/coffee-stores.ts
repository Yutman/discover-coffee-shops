import { MapboxType } from '../types';

const transormCoffeeData = (result: MapboxType) => {
    return {
        id: result.id,
        address: result.properties?.address || 'Toronto',
        name: result.text,
        imgUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmVlfGVufDB8fDB8fHww',
    }
}


export const fetchCoffeeStores = async () => {
    try {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=6&proximity=-79.3789680885594%2C43.653833032607096&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();

    return data.features.map((result: MapboxType) => 
        transormCoffeeData(result)
);

} catch (error) {
    console.error('Error while fetching stores', error);
}
};