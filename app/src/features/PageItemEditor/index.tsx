import { ipcSend } from '@/src/ipcEvent';
import { getPageItem } from '@/src/store';
import { useAsync } from 'react-use';
import { ButtonEditor } from '../ButtonEditor';
import { CBInstanceEditor } from './CBEditor';

type Props = {
  itemId: string;
  onClose: () => void;
};
export function PageItemEditor({ itemId, onClose }: Props) {
  const { value: pageItem } = useAsync(async () => {
    return await getPageItem(itemId);
  }, [itemId]);

  return !pageItem ? (
    <></>
  ) : (
    <>
      {pageItem.type === 'Button' && (
        <ButtonEditor
          button={pageItem}
          setter={async (item) => {
            await ipcSend('edit:item', item);
          }}
          onClose={onClose}
        />
      )}
      {pageItem.type === 'ControlButton' && (
        <CBInstanceEditor
          instance={pageItem}
          setter={async (item) => {
            await ipcSend('edit:item', item);
          }}
          onClose={onClose}
        />
      )}
    </>
  );
}
