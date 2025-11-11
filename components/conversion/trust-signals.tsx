export function TrustSignals() {
  return (
    <div className="py-3 border-t border-neutral-200 dark:border-neutral-700">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400">✓</span>
          <span>100% Organic</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400">✓</span>
          <span>Made to Order</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400">✓</span>
          <span>Worldwide Shipping</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400">✓</span>
          <span>Plastic Free</span>
        </div>
      </div>
    </div>
  );
}
