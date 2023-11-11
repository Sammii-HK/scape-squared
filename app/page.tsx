import { Carousel } from 'components/carousel';
import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import ProductGridItems from 'components/layout/product-grid-items';
import { getLiveProducts } from 'lib/utils';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'scape²: art for the wall & wardrobe.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const liveProducts  = await getLiveProducts({});
  
  return (
    <>
      <Suspense>
        <Carousel />
        {liveProducts.length > 0 ? (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-6">
            <ProductGridItems products={liveProducts} />
          </Grid>
        ) : null}
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
