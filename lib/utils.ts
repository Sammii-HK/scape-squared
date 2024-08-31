import { ReadonlyURLSearchParams } from 'next/navigation';
import { getCollectionProducts, getProducts } from './shopify';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
}

export const collectionTypes = [ 'flowerscapes', 'foliagescapes', 'naturescapes', 'skyscapes', 'urbanscapes'];

export async function getLiveWardrobeProducts(query?: Parameters<typeof getProducts>[0]) {
  const products = await getProducts(query || {});
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product') && product.tags.includes('tshirt'));
  return liveProducts;
}

export async function getLiveWallProducts(query?: Parameters<typeof getProducts>[0]) {
  const products = await getProducts(query || {});
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product') && product.tags.includes('print'));
  return liveProducts;
}

export async function getLiveCollectionProducts(query: Parameters<typeof getCollectionProducts>[0]) {
  const products = await getCollectionProducts(query);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product'));
  return liveProducts;
}

export async function getAllLiveProducts(query?: Parameters<typeof getProducts>[0]) {  
  const searchQuery = query || { query: undefined, reverse: undefined, sortKey: undefined}
  const products = await getProducts(searchQuery);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product'));
  return liveProducts
}
