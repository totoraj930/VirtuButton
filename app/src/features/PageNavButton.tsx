import { MaterialIcon } from '../components/icon';
import { Button } from '../components/ui/button';
import { ipcSend } from '../ipcEvent';
import { useSettings } from '../store';

type Props = {};
export function PageNavButton({}: Props) {
  const settings = useSettings();

  const getIndex = (d: 'next' | 'prev') => {
    if (d === 'next') {
      return (settings.pageIndex + 1) % settings.pages.length;
    } else {
      return (
        (settings.pageIndex - 1 + settings.pages.length) % settings.pages.length
      );
    }
  };

  const pageMove = async (d: 'next' | 'prev') => {
    const newIndex = getIndex(d);
    if (settings.pageIndex !== newIndex) {
      await ipcSend('edit:settings', { pageIndex: newIndex });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className=""
        disabled={getIndex('prev') === settings.pageIndex}
        onClick={() => pageMove('prev')}
      >
        <MaterialIcon icon="chevron_left" />
      </Button>

      <p className="font-bold text-sm">
        ページ:
        <span className="inline-flex w-3 ml-1">{settings.pageIndex + 1}</span>
      </p>

      <Button
        variant="ghost"
        size="icon"
        disabled={getIndex('next') === settings.pageIndex}
        onClick={() => pageMove('next')}
      >
        <MaterialIcon icon="chevron_right" />
      </Button>
    </>
  );
}
