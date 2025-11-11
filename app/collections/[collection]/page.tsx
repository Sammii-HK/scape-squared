import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductGridItems from '../../../components/layout/product-grid-items';
import { defaultSort, sorting } from '../../../lib/constants';
import { getCollection, getCollectionProducts } from '../../../lib/shopify';
import {
  collectionTypes,
  getAllLiveProducts,
  getLiveWallProducts,
  getLiveWardrobeProducts,
  getCanonicalUrl
} from '../../../lib/utils';

export const runtime = 'edge';
export const revalidate = 86400; // Revalidate daily (24 hours)

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const canonicalUrl = getCanonicalUrl(`/collections/${params.collection}`);

  // Handle custom collections (wall, wardrobe) that don't exist in Shopify
  if (params.collection === 'wall' || params.collection === 'wardrobe') {
    const title = params.collection === 'wall' ? 'Wall Art' : 'Wardrobe';
    return {
      title: `${title} | scape²`,
      description: `Browse our ${title.toLowerCase()} collection - consciously created, art to wear, altering angles.`,
      alternates: {
        canonical: canonicalUrl
      },
      openGraph: {
        url: canonicalUrl,
        type: 'website'
      }
    };
  }

  // For Shopify collections, fetch metadata
  if (collectionTypes.includes(params.collection)) {
    const collection = await getCollection(params.collection);

    if (!collection) return notFound();

    return {
      title: collection.seo?.title || collection.title,
      description:
        collection.seo?.description || collection.description || `${collection.title} products`,
      alternates: {
        canonical: canonicalUrl
      },
      openGraph: {
        title: collection.seo?.title || collection.title,
        description:
          collection.seo?.description || collection.description || `${collection.title} products`,
        type: 'website',
        url: canonicalUrl
      }
    };
  }

  // Default for all products
  return {
    title: 'All Products | scape²',
    description: 'Browse all products - consciously created, art to wear, altering angles.',
    alternates: {
      canonical: canonicalUrl
    }
  };
}

export default async function CollectionPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const getCollection = async () => {
    if (params && params.collection === 'wall') {
      return await getLiveWallProducts(searchParams);
    }
    if (params && params.collection === 'wardrobe') {
      return await getLiveWardrobeProducts(searchParams);
    }
    if (params && collectionTypes.includes(params.collection)) {
      return await getCollectionProducts({ collection: params.collection, sortKey, reverse });
    }

    return await getAllLiveProducts(searchParams);
  };

  const currentProducts = await getCollection();
  const parseCollectionTitle = params.collection.replace('-', ' ');

  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://scapedsquared.com';

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: parseCollectionTitle,
    description: `Browse our ${parseCollectionTitle} collection`,
    itemListElement: currentProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        url: `${siteUrl}/products/${product.handle}`,
        image: product.featuredImage?.url
      }
    }))
  };

  const breadcrumbJsonLd = {
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
        name: parseCollectionTitle,
        item: `${siteUrl}/collections/${params.collection}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd)
        }}
      />
      <div className="p-8">
        <h2 className="text-2xl mb-5 capitalize">{parseCollectionTitle}</h2>
        <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
          <ProductGridItems products={currentProducts} colSpan={1} searchParams={searchParams} />
        </div>
      </div>
    </>
  );
}
