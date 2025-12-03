import { useEffect, useMemo, useRef, useState } from 'react'
import FCTimer from './FuncComps/FCTimer'
import FCInfiniteLogos from './FuncComps/FCInfiniteLogos';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage.jsx';

function App() {



  const [langague, setLanguage] = useState('en')

  return <>
    <Routes>
      <Route path='/my-portfolio/' element={<MainPage langague={langague} setLanguage={setLanguage}/>}></Route>
    </Routes>
  </>

}

export default App
