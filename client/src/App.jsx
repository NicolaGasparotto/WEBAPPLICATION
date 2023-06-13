import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext, PageNotFound, Login, DefaultLayout, MainLayout, WebPage, AddWebPage, EditWebPage } from './components';
import { useState} from 'react';
import { Navigate } from 'react-router-dom';

function App() {
  
  const [user, setUser] = useState({'id': 1, 'backOfficeView': false, 'name': 'Jane Smith', 'admin': true}) ;
  console.log('App.jsx user: ', user) ;

  return <UserContext.Provider value={user}>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<MainLayout setUser={setUser}/>}/>
          <Route path='/pages/:pageId' element={<WebPage />}/>
          <Route path='/pages/:pageId/edit' element={ user ? <EditWebPage /> : <Navigate replace to='/'/>}/>
          <Route path='/newPage' element={user ? <AddWebPage /> : <Navigate replace to='/'/>}/>
          
          <Route path='/login' element={<Login />}/>
          
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  ;

}

export default App 
