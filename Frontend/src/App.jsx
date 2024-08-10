import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"
import ListPage from "./routes/listPage/listPage";
import {Layout, RequireAuth} from "./routes/layout/layout";
import HomePage from "./routes/homePage/homePage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import LoginPage from "./routes/login/loginPage";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/list",
          element: <ListPage/>
        },
        {
          path: "/:id",
          element: <SinglePage/>
        },
        {
          path: "/login",
          element: <LoginPage/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
      ]
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children: [
        {
          path: "/profile",
          element: <ProfilePage/>
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage/>
        },
      ]
    }
  ]);

  return (
    // <div className="layout">
    // <div className="navbar">
    //   <Navbar/>
    // </div>
    // <div className="content">
    //   <HomePage/>
    // </div>
    // </div>
    <RouterProvider router={router}/>
  )
}

export default App
