import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import MainLayout from "../layouts/MainLayout"
import Dashboard from "../pages/Dashboard"
import Tasks from "../pages/Tasks"
import CreateTask from "../pages/CreateTask"
import Settings from "../pages/Settings"
import UpdateTask from "../pages/UpdateTask"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    element: <MainLayout/>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>,
        handle: { title: "dashboard" , current:"dashboard"}
      },
      {
        path: "/tasks",
        element: <Tasks/>,
        handle: { title: "all tasks" , current:"tasks"}
      },
      {
        path: "/tasks/add",
        element: <CreateTask/>,
        handle: { title: "create task" , current:"create"}
      },
      {
        path: "/settings",
        element: <Settings/>,
        handle: { title: "settings" , current:"settings"}
      },
      {
        path: "/task/:id/edit",
        element: <UpdateTask/>,
        handle: { title: "update task" , current:"edit"}
      }
    ]
  }
])