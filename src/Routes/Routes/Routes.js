import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import AddTasks from "../../Pages/Tasks/AddTasks/AddTasks";
import CompletedTasks from "../../Pages/Tasks/CompletedTasks/CompletedTasks";
import MyTasks from "../../Pages/Tasks/MyTasks/MyTasks";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addTasks",
        element: <AddTasks></AddTasks>,
      },
      {
        path: "/myTasks",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "/completedTasks",
        element: <CompletedTasks></CompletedTasks>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
