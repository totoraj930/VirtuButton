import '@/src/assets/base.css';
import { aModalNodeView } from '@/src/components/modal';
import { Button } from '@/src/components/ui/button';
import { addAllMainEventListeners, ipcSend } from '@/src/ipcEvent';
import RouteIndex from '@/src/routes';
import RouteEdit from '@/src/routes/edit';
import RouteEditItem from '@/src/routes/edit.item.$itemId';
import RouteSettings from '@/src/routes/settings';
import { wsClient } from '@/src/store';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, RouterProvider, createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '*',
    element: (
      <div className="flex flex-col gap-1 p-2">
        <p>ページが見つかりません</p>
        <p>
          <Button asChild>
            <Link to="/">戻る</Link>
          </Button>
        </p>
      </div>
    ),
  },
  {
    path: '/',
    Component: RouteIndex,
  },
  {
    path: 'settings',
    Component: RouteSettings,
  },
  {
    path: 'edit',
    Component: RouteEdit,
  },
  {
    path: 'edit/item/:itemId',
    Component: RouteEditItem,
  },
]);

ipcSend('get:settings').then((settings) => {
  wsClient.connect(`ws://localhost:${settings.server.port}/ws`);
});

addAllMainEventListeners();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

function Root() {
  const modals = useAtomValue(aModalNodeView);
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      {modals}
    </>
  );
}
