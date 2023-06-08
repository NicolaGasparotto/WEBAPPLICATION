import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNotFound, Login, BackOffice, DefaultLayout, MainLayout, WebPage, AddWebPage, EditWebPage } from './components';

function App() {
  
  return <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          
          <Route index element={<MainLayout />}/>
          <Route path='/pages/:pageId' element={<WebPage />}/>
          <Route path='/pages/:pageId/edit' element={<EditWebPage />}/>
          <Route path='/newPage' element={<AddWebPage />}/>
          
          <Route path='/backOffice' element={<BackOffice />}/>
          
          <Route path='/login' element={<Login />}/>
          
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  ;

}

export default App 
