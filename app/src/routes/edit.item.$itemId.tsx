import { useNavigate, useParams } from 'react-router-dom';
import { ButtonEditor } from '../features/ButtonEditor';
import { CBInstanceEditor } from '../features/PageItemEditor/CBEditor';
import { ipcSend } from '../ipcEvent';
import { usePageItem } from '../store';

export default function RouteEditItem() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [pageItem] = usePageItem(itemId);

  return (
    <>
      {pageItem?.type === 'Button' && (
        <ButtonEditor
          button={pageItem}
          setter={async (item) => {
            await ipcSend('edit:item', item);
          }}
          onClose={() => {
            navigate('/edit');
          }}
        />
      )}
      {pageItem?.type === 'ControlButton' && (
        <CBInstanceEditor
          instance={pageItem}
          setter={async (item) => {
            await ipcSend('edit:item', item);
          }}
          onClose={() => {
            navigate('/edit');
          }}
        />
      )}
    </>
  );
}
