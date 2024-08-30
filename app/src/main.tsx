import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './assets/base.css';
import { aModalNodeView } from './components/modal';
import { addAllMainEventListeners, ipcSend } from './ipcEvent';
import RouteIndex from './routes';
import RouteEdit from './routes/edit';
import RouteEditItem from './routes/edit.item.$itemId';
import { wsClient } from './store';

const router = createHashRouter([
  {
    path: '/',
    Component: RouteIndex,
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
