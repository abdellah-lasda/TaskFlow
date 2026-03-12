import { RouterProvider} from "react-router-dom"
import {router} from "./features/Router"

function App() {
  return <RouterProvider router={router} />
}

export default App
