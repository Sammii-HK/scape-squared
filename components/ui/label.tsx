import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="w-full flex items-center rounded bg-white/70 p-1 text-[10px] font-semibold text-black backdrop-blur-md @[275px]/label:text-xs dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-4 inline pl-2 leading-none tracking-tight">{title}</h3>
        <Price
          // className="flex-none rounded-full bg-gray-600 p-2 text-white"
          className="ml-auto flex-none text-gray-600 text-bold"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
