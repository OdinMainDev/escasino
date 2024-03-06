import React from 'react';
import ReactDOM from 'react-dom/client';
import Repositories from './app/repositories';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/Routes';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //  Репозитории - хранилища ( нужны для хранения данных в памяти )
  // TODO: исправить косяк ниже (У типа "{ children: Element; }" нет общих свойств с типом "IntrinsicAttributes".)
  <Repositories>
    <RouterProvider router={router} />
  </Repositories>,
);
