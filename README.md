This is a [Next.js](https://nextjs.org) project bootstrapped with  
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables.

Create a `.env` file in the project root:

```env
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
SHOPIFY_STORE_DOMAIN=https://your-store.myshopify.com
```

Then install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the UI by modifying pages inside the `app/` directory.  
The project auto-updates as you edit the files.

This project uses the Shopify Storefront GraphQL API via Apollo Client  
to fetch products and product details in a headless architecture.

## Learn More

To learn more about core tools used in this project:

- [Next.js Documentation](https://nextjs.org/docs) – features, API and routing.
- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront) – GraphQL reference.
- [Apollo Client](https://www.apollographql.com/docs/react/) – React GraphQL client library.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the  
[Vercel Platform](https://vercel.com/new?filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme&utm_medium=default-template).

See the Next.js deployment documentation:  
https://nextjs.org/docs/app/building-your-application/deploying
