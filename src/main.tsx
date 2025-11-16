
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';


const basename = '/Argonomist_Garden';
createRoot(document.getElementById('root')!).render(

  <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<App/>} />
        </Routes>
  </BrowserRouter>
)
