import { createBrowserRouter } from "react-router-dom"
import { App } from "./App"
import { MedicationSearchPage } from "./app/medicationSearch"
import { DonatePage } from "./app/donate"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "search",
    element: <MedicationSearchPage />,
  },
  {
    path: "donate",
    element: <DonatePage />,
  }
])