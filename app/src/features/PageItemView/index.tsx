import { cn } from '@/src/utils';
import { PageItemSerialized } from '@virtu-button/common/Plugin';
import { ButtonView } from '../ButtonView';

type Props = {
  item: PageItemSerialized;
  rotate?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export function PageItemView({ item, ...props }: Props) {
  return (
    <>
      {item.error && (
        <div
          className={cn(
            'w-full h-full flex flex-col justify-center items-center',
            'bg-red-500 text-white',
            'opacity-50 text-sm'
          )}
        >
          <p>{item.error}</p>
        </div>
      )}
      {!item.error && (
        <ButtonView
          {...props}
          viewProps={item.viewProps}
          buttonStyles={item.styles}
        />
      )}
    </>
  );
}
