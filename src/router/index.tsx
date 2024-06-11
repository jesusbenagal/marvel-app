import { Route, Routes } from "react-router-dom";

import { CharacterView, FavouritesView, MainView } from "@/views";

import { appRoutes } from "@/constants/app-routes";

export default function Router() {
  return (
    <Routes>
      <Route path={appRoutes.HOME} element={<MainView />} />
      <Route path={appRoutes.CHARACTER}>
        <Route path=":id" element={<CharacterView />} />
      </Route>
      <Route path={appRoutes.FAVOURITES} element={<FavouritesView />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
