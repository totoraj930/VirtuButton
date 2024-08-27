import { usePageItem } from '@/src/store';
import { ButtonEditor } from '../ButtonEditor';
import { CBInstanceEditor } from './CBEditor';

type Props = {
  itemId: string;
  onClose: () => void;
};
export function PageItemEditor({ itemId, onClose }: Props) {
  const [pageItem, setter] = usePageItem(itemId);

  return !pageItem ? (
    <></>
  ) : (
    <>
      {pageItem.type === 'Button' && (
        <ButtonEditor button={pageItem} setter={setter} onClose={onClose} />
      )}
      {pageItem.type === 'ControlButton' && (
        <CBInstanceEditor
          instance={pageItem}
          setter={setter}
          onClose={onClose}
        />
      )}
    </>
  );
}
