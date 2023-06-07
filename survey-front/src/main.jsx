import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

//paginas
import Home from "./routes/Home.jsx";
import NewQuestion from "./routes/NewQuestion.jsx";
import NewOption from "./routes/NewOption.jsx";
import NewVote from "./routes/NewVote.jsx";

import "./index.css";

const router = createBrowserRouter([{
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/newquestion",
      element: <NewQuestion />,
    },
    {
      path: "/option/:id",
      element: <NewOption />,
    },
    {
      path: "/vote/:id",
      element: <NewVote />,
    },
  ],
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
