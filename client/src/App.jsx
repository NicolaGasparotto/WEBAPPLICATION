import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  UserContext,
  PageNotFound,
  Login,
  DefaultLayout,
  MainLayout,
  WebPage,
  AddWebPage,
  EditWebPage,
} from "./components";
import { useState } from "react";

import { checkLogin } from "./API";

function App() {
  
  const [user, setUser] = useState({});

  const validateLogin = async (username, password) => {
    const usert = await checkLogin(username, password);
    setUser(usert);
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<MainLayout setUser={setUser} />} />
            <Route path="/pages/:pageId" element={<WebPage />} />
            <Route
              path="/pages/:pageId/edit"
              element={user.id ? <EditWebPage /> : <Navigate replace to="/" />}
            />
            <Route
              path="/newPage"
              element={user.id ? <AddWebPage /> : <Navigate replace to="/" />}
            />

            <Route
              path="/login"
              element={<Login handleLogin={validateLogin} />}
            />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
