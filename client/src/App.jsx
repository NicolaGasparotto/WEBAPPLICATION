import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout, MainLayout } from './components/Layouts';
import { PageNotFound } from './components/PageNotFound';

function App() {
  
  return <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<MainLayout />}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  ;

}

export default App 
