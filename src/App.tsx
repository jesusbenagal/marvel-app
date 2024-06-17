import { BrowserRouter } from "react-router-dom";

import AppLayout from "@/layout/app-layout";

import Router from "@/router";
import AppProvider from "./context/app-context";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout>
          <Router />
        </AppLayout>
      </AppProvider>
    </BrowserRouter>
  );
}
