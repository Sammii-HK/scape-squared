import { getCollection } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { Breadcrumbs } from 'components/ui/breadcrumbs';
import { defaultSort, sorting } from 'lib/constants';
import { getLiveCollectionProducts, getCanonicalUrl } from 'lib/utils';

export const runtime = 'edge';
export const revalidate = 86400; // Revalidate daily (24 hours)

export async function generateMetadata({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  const canonicalUrl = getCanonicalUrl(
    `/search/${params.collection}`,
    searchParams ? new URLSearchParams(searchParams as Record<string, string>) : undefined
  );

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `Shop ${collection.title} - Sustainable art and apparel from scape²`,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      url: canonicalUrl,
      type: 'website',
      title: collection.seo?.title || collection.title,
      description: collection.seo?.description || collection.description || `Shop ${collection.title} - Sustainable art and apparel from scape²`
    }
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  
  const collection = await getCollection(params.collection);
  if (!collection) return notFound();

  const products = await getLiveCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse
  });

  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://scapesquared.com';

  // CollectionPage JSON-LD schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description || `Shop ${collection.title} from scape²`,
    url: `${siteUrl}/search/${params.collection}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/products/${product.handle}`
      }))
    }
  };

  // Breadcrumb JSON-LD schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `${siteUrl}/search`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: collection.title,
        item: `${siteUrl}/search/${params.collection}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <section className="px-4">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/search' },
            { label: collection.title }
          ]} 
        />
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {collection.description}
            </p>
          )}
        </header>
        {products.length === 0 ? (
          <p className="py-3 text-lg text-neutral-600 dark:text-neutral-400">
            No products found in this collection
          </p>
        ) : (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} searchParams={searchParams} />
          </Grid>
        )}
      </section>
    </>
  );
}
