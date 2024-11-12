import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Images from './components/Images';
import Uploadingimage from './components/Uploadimage';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Images/>}/>
      <Route path='/create' element={<Uploadingimage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
