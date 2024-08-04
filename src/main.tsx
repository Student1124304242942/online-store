import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { PREFIX } from './components/helpers/API.tsx';
import './index.css';
import Login from './pages/Login/Login.tsx';
import { Cart} from './pages/Cart/Cart';
import { Error as ErrorPage } from './pages/Error/Error';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Layout } from './layouts/Menu/Layout.tsx';
import Product from './components/Product/Product.tsx';
import axios from "axios";
import { RequireAuth } from './components/helpers/Require.tsx'; 
import AuthLayout from './layouts/Auth/AuthLayout.tsx';
import { defer } from 'react-router-dom';
import Register from './pages/Register/Register.tsx';
import { Provider } from 'react-redux';
import { store } from './components/store/store.ts';
import { Success } from './pages/Success/Success.tsx';
import { Prod } from './interfaces/Product.interface.ts';
const Menu = lazy(() => import('./pages/Menu/Menu.tsx'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout/></RequireAuth>,
    children:[
      {
        path: '/',
        element: <Suspense fallback = {<>Загрузка...</>}><Menu/></Suspense>
      },
      {
        path: '/success',
        element: <Success/>,
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/product/:id',
        element: <Product/>,
        errorElement: <>Ошибка</>,
        loader: async ({params}) => {
          return defer({
            data: new Promise<{data: Prod}>((resolve, reject) => {
                axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
            })
          })
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout/>,
    children: [
      {
        path: 'login',
        element: <Login/>
      }, 
      {
        path: 'register',
        element: <Register/>
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)


     /*   return defer({
            data:  axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
          });
 */
         /*  await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          const {data} = await axios.get(`${PREFIX}/products/${params.id}`);
          return data; */