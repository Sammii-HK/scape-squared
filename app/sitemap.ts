import { getCollections, getPages, getProducts } from 'lib/shopify';
import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<Promise<Promise<MetadataRoute.Sitemap>>> {
  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1.0
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: product.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.9
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  );

  const fetchedRoutes = (
    await Promise.all([collectionsPromise, productsPromise, pagesPromise])
  ).flat();

  return [...routesMap, ...fetchedRoutes];
}
