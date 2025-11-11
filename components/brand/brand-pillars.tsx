import { brandOverviewDetails } from 'constants/brand';

export function BrandPillars() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 py-8 border-t border-b border-neutral-200 dark:border-neutral-700">
      {brandOverviewDetails.map((pillar, index) => (
        <div key={`pillar-${index}`} className="text-center">
          <h3 className="text-lg font-semibold mb-2 uppercase tracking-wide">{pillar.heading}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{pillar.content}</p>
        </div>
      ))}
    </div>
  );
}
