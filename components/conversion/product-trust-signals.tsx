import Link from 'next/link';

export function ProductTrustSignals() {
  return (
    <div className="my-4 py-4 border-t border-b border-neutral-200 dark:border-neutral-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-start gap-3">
          <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
          <div>
            <p className="font-semibold">Made to Order</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Each piece is created just for you
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
          <div>
            <p className="font-semibold">Worldwide Shipping</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Carbon neutral delivery options
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
          <div>
            <p className="font-semibold">100% Organic Cotton</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              GOTS certified materials
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
          <div>
            <p className="font-semibold">Plastic Free Packaging</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              <Link href="/sustainability" className="underline">
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
