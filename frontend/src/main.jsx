import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AnimatedLayout from './components/AnimatedLayout.jsx';

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import { CoDrawing, MapExplorer, TinyCats, LucyChat, LucyChatBase } from './pages/index.js'

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
    path: "lucychat/base",
    element: <LucyChatBase />,
  },
  {
    path: "lucychat/:convId",
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