'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createUrl } from 'lib/utils';
import { SearchIcon } from 'lucide-react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [searchIsActive, setSearchIsActive] = useState(false);

  useEffect(() => {
    setSearchValue(searchParams?.get('q') || '');
  }, [searchParams, setSearchValue]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <div className='mr-3 h-11'>
      {!searchIsActive && <SearchIcon onClick={() => setSearchIsActive(true)} className="h-11 text-white" />}
      {searchIsActive && <form onSubmit={onSubmit} className="relative w-full lg:w-[350px] align-middle flex">
        <input
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-lg border bg-black h-11 border-white py-1 px-2 text-sm text-white placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-1 flex items-center align-middle">
          <SearchIcon className="h-11" />
        </div>
    </form>}
    </div>
  );
}
