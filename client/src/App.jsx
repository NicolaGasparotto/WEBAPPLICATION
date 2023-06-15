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
import { useState, useEffect } from "react";

import { checkLogin, doLogout, getUserInfo } from "./API";

function App() {
  
  const [user, setUser] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getUserInfo();  // here you have the user info, if already logged in
        setUser(user);
      } catch (err) {
        setUser({});
      }
    };
    init();
  }, []);  // This useEffect is called only the first time the component is mounted.


  const validateLogin = async (username, password) => {
    const usert = await checkLogin(username, password);
    setUser(usert);
  };

  const logout = async () => {
    await doLogout();
    setUser({});
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout handleLogout={logout} />}>
            <Route index element={<MainLayout setUser={setUser} />} />
            <Route path="/pages/:pageId" element={<WebPage />} />
            <Route
              path="/pages/:pageId/edit"
              element={(user && user.id) ? <EditWebPage /> : <Navigate replace to="/" />}
            />
            <Route
              path="/newPage"
              element={(user &&  user.id) ? <AddWebPage /> : <Navigate replace to="/" />}
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
