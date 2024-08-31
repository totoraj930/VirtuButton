import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
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
      {!pageItem && (
        <div className="flex flex-col gap-2 p-2">
          <p>アイテムが見つかりません</p>
          <p>
            <Button onClick={() => navigate('/edit')}>戻る</Button>
          </p>
        </div>
      )}
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
