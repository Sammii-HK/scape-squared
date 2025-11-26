const brandFeatures = [
  {
    heading: 'Consciously Created',
    content: '100% organic cotton, plastic-free packaging'
  },
  {
    heading: 'Made to Order',
    content: 'Crafted just for you, reducing waste'
  },
  {
    heading: 'Unique Designs',
    content: 'Photography-based art that stands out'
  }
];

export function BrandPillars() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        {brandFeatures.map((feature, index) => (
          <div key={`feature-${index}`} className="text-center">
            <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-900 dark:text-neutral-100">
              {feature.heading}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {feature.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
