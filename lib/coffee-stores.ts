import { CoffeeStoreType, GooglePlacesType } from '../types';

// Updated transformCoffeeData to include correct fallback image logic for Tim Hortons
const transformCoffeeData = (result: GooglePlacesType) => {
    let imgUrl = result.imgUrl || '';

    // ✅ Ensure Google Places photo reference is used if available
    if (Array.isArray(result.photos) && result.photos.length > 0) {
        imgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}`;
    }

    // ✅ Fallback image for Tim Hortons if no valid image is available
    if (result.name.includes('Tim Hortons') && (!result.photos || imgUrl === '')) {
        imgUrl = 'https://images.unsplash.com/photo-1680451897740-60b06000e39b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }

    return {
        id: result.id,
        address: result.address,
        name: result.name,
        imgUrl,
    };
};

// Function to fetch a list of coffee stores near a specific location
export const fetchCoffeeStores = async (longLat: string) => {
    try {
        const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${longLat}&radius=50000&type=cafe&key=${process.env.GOOGLE_API_KEY}`;

        console.log(`Fetching stores for location: ${longLat}`);
        console.log(`API URL: ${googlePlacesUrl}`);

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
                imgUrl: '',
                photos: result.photos || [], // ✅ Ensure 'photos' is included as an array
            })
        );
    } catch (error) {
        console.error('Error while fetching coffee stores:', error);
        return [];
    }
};

// Function to fetch details of a specific coffee store by its ID
export const fetchCoffeeStore = async (id: string): Promise<CoffeeStoreType | null> => {
    try {
        if (!id) {
            throw new Error('❌ Missing coffee store ID');
        }

        console.log(`🛠 Fetching details for coffee store ID: ${id}`);

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${process.env.GOOGLE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`❌ Failed to fetch coffee store: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.result) {
            console.error(`❌ No coffee store found for ID: ${id}`);
            return null;
        }

        // Transform the result with fallback logic for Tim Hortons
        return transformCoffeeData({
            id: data.result.place_id,
            name: data.result.name,
            address: data.result.vicinity || 'No address available',
            imgUrl: '',
            photos: data.result.photos || [], // ✅ Ensure 'photos' is included as an array
        });
    } catch (error) {
        console.error('❌ Error fetching coffee store:', error);
        return null;
    }
};


// This code is for fetching and displaying coffee shop data using the Google Places API. 
// It is designed to fit into a coffee store app that shows a list of coffee shops, along with details like their name, address, and image. 
// It contains two main functions: one for fetching a list of coffee shops (fetchCoffeeStores) and one for fetching the details of a single coffee shop (fetchCoffeeStore).
