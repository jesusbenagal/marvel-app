import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";

import AppLayout from "@/layout/app-layout";

import Router from "@/router";

export default function App() {
  return (
    <BrowserRouter>
      <SWRConfig>
        <AppLayout>
          <Router />
        </AppLayout>
      </SWRConfig>
    </BrowserRouter>
  );
}
