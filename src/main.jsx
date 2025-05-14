import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import { CoDrawing, MapExplorer, TinyCats, LucyChat } from './pages/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "CoDrawing",
    element: <CoDrawing />,
  },
  {
    path: "LucyChat",
    element: <LucyChat />,
  },
  {
    path: "TinyCats",
    element: <TinyCats />,
  },
  {
    path: "MapExplorer",
    element: <MapExplorer />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
