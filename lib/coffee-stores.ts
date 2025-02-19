import { GooglePlacesType } from '../types';

const transformCoffeeData = (result: GooglePlacesType) => {
    return {
        id: result.id,
        address: result.address,
        name: result.name,
        imgUrl: result.imgUrl || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmVlfGVufDB8fDB8fHww',
    };
}; //  This function takes an individual coffee shop's data (from the Google Places API) and reformats it into a standard structure. 
// The goal is to make the data consistent, with the properties id, name, address, and imgUrl.

export const fetchCoffeeStores = async (longLat: string) => {
    try {
        const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${longLat}&radius=50000&type=cafe&key=${process.env.GOOGLE_API_KEY}`;

        // Log the URL properly
        console.log(`Fetching stores for location: ${longLat}`);
        console.log(`API URL: ${googlePlacesUrl}`); // Log the actual URL

        const response = await fetch(googlePlacesUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch coffee stores: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('No coffee shops found');
        }

        // Transform and limit the results to 6
        return data.results.slice(0, 6).map((result: any) => 
            transformCoffeeData({
                id: result.place_id,
                name: result.name,
                address: result.vicinity,
                imgUrl: result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}` : ''
            })
        );
    } catch (error) {
        console.error('Error while fetching coffee stores:', error);
        return [];
    }
};


export const fetchCoffeeStore = async (id: string) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${process.env.GOOGLE_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`Failed to fetch coffee store: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.result) {
            throw new Error('No coffee store found');
        }

        // Transform the result
        return transformCoffeeData({
            id: data.result.place_id,
            name: data.result.name,
            address: data.result.vicinity,
            imgUrl: data.result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.result.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}` : ''
        });
    } catch (error) {
        console.error('Error while fetching coffee store:', error);
        return {};
    }
};

// This code is for fetching and displaying coffee shop data using the Google Places API. 
// It is designed to fit into a coffee store app that shows a list of coffee shops, along with details like their name, address, and image. 
// It contains two main functions: one for fetching a list of coffee shops (fetchCoffeeStores) and one for fetching the details of a single coffee shop (fetchCoffeeStore).
