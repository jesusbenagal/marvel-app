import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";

import AppLayout from "@/layout/app-layout";

import Router from "@/router";

import { swrConfig } from "@/api/config/swr-config";

export default function App() {
  return (
    <BrowserRouter>
      <SWRConfig value={swrConfig}>
        <AppLayout>
          <Router />
        </AppLayout>
      </SWRConfig>
    </BrowserRouter>
  );
}
