import './index.css'
import App from './App.jsx'
import { GlobalProvider } from '../../GlobalContext.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ShowListMusic from './categoryShow/categoryShow.jsx'
import ErrorPage from './errPage/errPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App MusicNumber = {0}/>,
  },
  {
    path: '/music/*',
    element: <App MusicNumber= {1}/>,
  },
  {
    path: '/songs/*',
    element: <App MusicNumber= {2}/>,
  },
  {
    path: '/search/*',
    element: <App MusicNumber= {3}/>,
  },
  {
    path: '/error',
    element: <ErrorPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
)
