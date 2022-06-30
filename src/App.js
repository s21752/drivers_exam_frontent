import {useRoutes} from "react-router";
import {Home, PageNotFound} from "./pages";

export default function App() {
  let element = useRoutes([
    {path: "/", element: <Home/>},
    {path: "*", element: <PageNotFound/>},
  ]);

  return element;
}