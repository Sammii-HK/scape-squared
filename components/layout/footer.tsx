
import FooterMenu from 'components/layout/footer-menu';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-700 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 xl:px-0">
        {/* <div>
          <Link className="flex items-center gap-2 text-black dark:text-white" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div> */}
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[100px] flex-col gap-2 ">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        {/* <div className="md:ml-auto">
          <a
            className="flex items-center gap-2 hover:text-black dark:hover:text-neutral-300"
            aria-label="Github Repository"
            href="https://github.com/vercel/commerce"
          >
            <GitHubIcon className="h-6" />
            <p>Source</p>
          </a>
        </div> */}
      </div>
      <div className="border-t border-neutral-700 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 md:flex-row md:gap-0 pl-4">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          {/* <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" /> */}
          {/* <p>Designed in England</p> */}
          {/* <p className="md:ml-auto">
            Crafted by{' '}
            <Link href="https://www.instagram.com/sammiisparkle" className="text-black dark:text-white pr-2" target="_blank">
              Sammii Sparkle
            </Link>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
