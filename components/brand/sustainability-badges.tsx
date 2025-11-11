import Link from 'next/link';
import { credentials } from 'constants/sustainability';

export function SustainabilityBadges() {
  // Display key sustainability credentials
  const keyCredentials = ['gots', 'oekoStandard', 'peta', 'fsc'];

  return (
    <div className="my-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
      <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">
        Sustainability Credentials
      </h4>
      <div className="flex flex-wrap gap-3">
        {keyCredentials.map((key) => {
          const credential = credentials[key as keyof typeof credentials];
          if (!credential) return null;

          return (
            <Link
              key={key}
              href={credential.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title={credential.excerpt}
            >
              {credential.title}
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
        All products are made with sustainable materials and ethical practices.
      </p>
    </div>
  );
}
