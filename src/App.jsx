import { useEffect, useRef, useState } from 'react';
import FCWoodTable from './FunComps/FCWoodTable';
import FCLabSection from './FunComps/FCLab';
import FCHeader from './FunComps/FCHeader';
import FCHero from './FunComps/FCHero';
function App() {





  return (
    <>
      <FCHeader />
      <FCHero/>
      <FCWoodTable/>
      <FCLabSection/>
    </>
  )
}

export default App
