This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Next.js 13 brought significant architectural changes, focusing on React Server Components, layouts, enhanced data fetching, and Turbopack. Earlier versions relied on traditional SSR/SSG and lacked many of these modern, performance-oriented features.
Instructor: Ankita Kulkarni

App Router: 
What is Next.js?
It is a framework built on top of react that gives a developer flexibility by allowing us to render content on the server.
It is a full stack framework
It provides us with a node server
Known as react framework for production

React Refresher
React created in 2013
Started with Classes then Hooks then Vite
npx is a CLI tool whose purpose is to make it easy to install and manage dependencies hosted in npm registry 
primary use of Tachyons is to provide a functional CSS framework that allows developers to rapidly build responsive, consistent, and scalable user interfaces with minimal CSS.


We use Fragment to resolve the error: Adjacent JSX elements must be wrapped in an enclosing tag.
Options:
We can wrap the elements with a parent element <div><div/> but this method introduces an element into the DOM, increasing nesting.
We can return an array of elements but we have to add a key to every element but is quite cumbersome
An even better method is to use the shorthand syntax for Fragments, which looks like empty tags: <> and </>.

To make the app dynamic and enable searching for items from the robots array using the SearchBox, one needs to manage the state in the App component and filter the robots array based on the search input.

Read on class components, headed to hooks.

To update a component with new data, two things need to happen:
1.Retain the data between renders.
2.Trigger React to render the component with new data (re-rendering).
The useState Hook provides those two things:
1.A state variable to retain the data between renders.
2.A state setter function to update the variable and trigger React to render the component again.

Next JS Course: 
Benefits of NextJS:
1. Different rendering techniques; static generation, server-side rendering, incremental site generation
2. Performance; code splitting, minifying files, image optimization, pre-fetching assets
3. File Based Routing; reduces initial load sizes through code splitting and lazy loading
4. SEO
5. Serverless Functions - serverless functions are deployed to serverless platforms (like Vercel or AWS Lambda) where they are executed on-demand in isolated environments. Reduces latency, efficient resource usage, scalability, localized execution.

What are we building: App called Coffee Connoisseur
Project Setup: 
public - all static assets such as icons, fonts, svg images.

Server Components:
Area feature that allows certain parts of my application to be rendered exclusively on the server.
Xtics: 
Rendered on server and resulting html or serialized data is sent to client.
Do not ship JavaScript to browser 
Can coexist with client components thus seamless integration

How they work:
The /app directory uses server components by default unless stated otherwise. 
If one needs interactivity one must define the component as a client component by adding 'use client' directive at the top
Can fetch data directly without using hooks 
They are also streamed faster to the browser

When to use:
Server components: 
-Heavy data fetching
-Pages that do not require interactivity
Client components:
-buttons, forms and components with user interactions
-pages requiring client-side management or effects

You cannot pass a server component to a client component.
To read: Composition patterns on NextJS website
To prevent your environment variables from being leaked to the client, Next.js replaces private environment variables with an empty string.
To prevent unintended client usage of server code, we can use the server-only package (npm install server-only) to give other developers a build-time error if they ever accidentally import one of these modules into a Client Component.
From React we learned that Context providers are typically rendered near the root of an application to share global concerns, like the current theme. Since React context is not supported in Server Components, trying to create a context at the root of your application will cause an error.

Introduction to Routing:
A page is UI that is rendered on a specific route.
A layout is UI that is shared between multiple pages. Layouts preserve state, remain interactive, and do not re-render.
To create nested routes, you can nest folders inside each other. 
--- For example, to add a route for /blog, create a folder called blog in the app directory. Then, to make /blog publicly accessible, add a page file

All the files inside /app are react server components by default. Anything in the /pages router are react client components

A Dynamic Segment can be created by wrapping a folder's name in square brackets: examples: [id] or [slug]
Dynamic Segments are passed as the params prop to layout, page, route, and generateMetadata functions.

Catch-all routes are a type of dynamic routing that allows a single page to handle multiple routes with varying segments. Defined by using the [...slug] syntax in a file inside app directory.
How are they used: 
Create a folder named [...slug] in the app directory and add a page.tsx file to handle the route.
To make the route optional (i.e., also handle /), use double square brackets ([[...slug]]).

The <Link> component in Next.js is used for client-side navigation between pages thus improves performance and user experience.
Key features: client-side navigation, preloading, seo friendly, customizable

SEO:
What is SEO? 
. It is the process of optimizing a website to improve its visibility and ranking in search engine results pages (SERPs). 
The goal of SEO is to drive organic traffic to a website by making it more accessible, relevant, and authoritative in the eyes of search engines like Google, Bing, or Yahoo.

Next.js is SEO-friendly out of the box because it supports Server-Side Rendering (SSR) and Static Site Generation (SSG), which ensure search engines can easily index the content.
Developers can optimize pages further with metadata using the Metadata API in Next.js.

Pre-Rendering & Hydration:
Pre-rendering is the process of generating html for your pages before they are sent to the browser. There are different rendering techniques: 
SSG: Static Site Generation: pre-renders html at build time. Ideal for pages with static content. blogs and product pages are good examples
ISR: Incremental Static Regeneration: html here is generated as a specific interval. Allows you to generate static pages at build time (like SSG), but then revalidate them at run time (like SSR), without rebuilding the entire site.
SSR: Server-Side Rendering: pre-renders html on server for each request. 

Hydration simply refers to the attaching interactivity to pre-rendered HTML.

Caching in Next.js
storing data temporarily in memory to reduce need to fetch data from external sources eg databases, api.
improves performance, reduces latency and lowers load on external services

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: { data },
    revalidate: 60, // Revalidate the data every 60 seconds
  };
}

Both ISR and SSG use the getStaticProps function to fetch data at build time and pre-render the html.
In ISR, we use the revalidate key to specify amount of time in seconds after which the page should be revalidated. 

Client-Side:
Caching data in the client using libraries like SWR (stale-while-revalidate) or React Query helps manage caching, fetching, and synchronizing server data
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR('https://api.example.com/data', fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return <div>Data: {data}</div>;
}
Explanation:  libraries fetch data from an API, store it in the client’s memory, and automatically re-fetch data in the background when necessary.

The next/image component in Next.js provides a built-in feature to blur images, which enhances the visual experience when images are loading. This is often used for lazy-loading or creating a low-resolution placeholder for images.

Resource: PNG Pixel

Mapbox API Setup
API Token
sk.eyJ1IjoibXVjaGlyaWt1cmlhIiwiYSI6ImNtNjluaXR5NjBlY2YyanNlemozdG1rbHMifQ.tpcO_eCYegRW7NehpHKP3Q

generateStaticParams is a data fetching method that works with Static Site Generation (SSG) to pre-render dynamic routes at build time. It is used to generate the list of dynamic route parameters for a given dynamic route. These parameters define which pages will be statically generated when you build your Next.js project

Fetch Call for receiving unique ID
NB: The @ alias in Next.js maps to the src directory (or the root folder if not using src/).
This is cleaner and easier to manage than relative imports like ../../FOLDER/File.


generateStaticParams must return a promise (because it's async) and the params object inside your page should match the structure you're returning.


Since the Google Places API now provides image URLs for each coffee shop through the photos property, you no longer need to rely on Unsplash for fetching images. 
The Google Places API will give you the correct image for each coffee shop based on its photo_reference. This means the images are dynamic and specific to each shop which is an advantage over Mapbox Geocoding.

Geolocation API: it is used to retrieve the user's location, so that it can for example be used to display their position using a mapping API

To use geolocation we need to use the navigator which is a browser API meaning we need to create a client component to handle it. The button 'View stores nearby' is also a click handler; that functionality needs to be in a client component. 

Error Handling: 

Airtables: 
Airtable is a cloud-based database that combines the flexibility of a spreadsheet with the functionality of a relational database. Provides API access, custom views, collaboration features.
It’s often used as a backend for applications where structured data is needed but a full-fledged database like PostgreSQL or MongoDB isn't required.




