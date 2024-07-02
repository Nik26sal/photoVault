import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import './index.css'
import About from './components/About.jsx'
import UploadPictures from './components/UploadPictures.jsx'
import Collection from './components/Collection.jsx'


const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/uploadPictures',
          element:<UploadPictures/>
        },
        {
          path:'/collection',
          element:<Collection/>
        }
      ]
    }
  ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
