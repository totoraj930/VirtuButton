import { PageEditor } from '@/src/features/PageEditor';
import { useCurrentPage, useSettings } from '@/src/store';
import { useNavigate } from 'react-router-dom';

export default function RouteEdit() {
  const page = useCurrentPage();
  const settings = useSettings();
  const navigate = useNavigate();
  return (
    <>
      <PageEditor
        key={page.id}
        pageIndex={settings.pageIndex}
        page={page}
        onClose={() => {
          navigate('/');
        }}
      />
    </>
  );
}
