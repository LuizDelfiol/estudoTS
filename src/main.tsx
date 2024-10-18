import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './view/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    children: [
      {
        path: '/Home',
        element: <App />
      }
    ]
  },
]
)
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
