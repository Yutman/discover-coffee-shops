import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const longLat = searchParams.get('longLat');

    if (!longLat) {
        return NextResponse.json({ error: 'Location not provided' }, { status: 400 });
    }

    try {
        const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${longLat}&radius=50000&type=cafe&key=${process.env.GOOGLE_API_KEY}`;
        const response = await fetch(googlePlacesUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch coffee stores: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return NextResponse.json({ error: 'No coffee stores found' }, { status: 404 });
        }

        const coffeeStores = data.results.slice(0, 6).map((result: any) => ({
            id: result.place_id,
            name: result.name,
            address: result.vicinity,
            imgUrl: result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}` : ''
        }));

        return NextResponse.json(coffeeStores);
    } catch (error) {
        console.error('Error fetching coffee stores:', error);
        return NextResponse.json({ error: 'An error occurred while fetching coffee stores.' }, { status: 500 });
    }
}
