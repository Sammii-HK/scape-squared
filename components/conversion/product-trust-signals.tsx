import { isCanvas, isWallArt } from 'constants/item-details';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

// Icons as simple SVG components
const HandIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const BoxIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FrameIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

type TrustSignal = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function ProductTrustSignals({ product }: { product: Product }) {
  const tags = product.tags;
  const productIsCanvas = isCanvas(tags);
  const productIsWallArt = isWallArt(tags);
  
  // Different signals for different product types
  const getSignals = (): TrustSignal[] => {
    if (productIsCanvas) {
      return [
        { icon: <HandIcon />, title: 'Made to Order', description: 'Printed just for you' },
        { icon: <LeafIcon />, title: 'FSC Certified Wood', description: 'Sustainably sourced frame' },
        { icon: <FrameIcon />, title: 'Ready to Hang', description: 'Hardware included' },
        { icon: <GlobeIcon />, title: 'Worldwide Shipping', description: 'Ships globally' }
      ];
    }
    
    if (productIsWallArt) {
      // Poster/Print
      return [
        { icon: <HandIcon />, title: 'Made to Order', description: 'Printed just for you' },
        { icon: <LeafIcon />, title: 'FSC Certified Paper', description: 'Sustainably sourced' },
        { icon: <BoxIcon />, title: 'Protective Packaging', description: 'Arrives safely' },
        { icon: <GlobeIcon />, title: 'Worldwide Shipping', description: 'Ships globally' }
      ];
    }
    
    // Garments (t-shirts, hoodies, etc.)
    return [
      { icon: <HandIcon />, title: 'Made to Order', description: 'Created just for you' },
      { icon: <LeafIcon />, title: '100% Organic Cotton', description: 'GOTS certified' },
      { icon: <BoxIcon />, title: 'Plastic Free', description: 'Eco-friendly packaging' },
      { icon: <GlobeIcon />, title: 'Worldwide Shipping', description: 'Ships globally' }
    ];
  };

  const signals = getSignals();

  return (
    <div className="my-6 py-4 border-t border-b border-neutral-200 dark:border-neutral-700">
      <div className="grid grid-cols-2 gap-4 text-sm">
        {signals.map((signal, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-neutral-500 dark:text-neutral-400">{signal.icon}</span>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">{signal.title}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{signal.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
        <Link href="/sustainability" className="underline hover:text-neutral-900 dark:hover:text-neutral-100">
          Learn more about our sustainability
        </Link>
      </p>
    </div>
  );
}
