export const fetchCoffeeStores = async () => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?access_token=${process.env.MAPBOX_API_KEY}&limit=10&bbox=-122.4,37.7,-122.5,37.8`
    );
    return await response.json();
};