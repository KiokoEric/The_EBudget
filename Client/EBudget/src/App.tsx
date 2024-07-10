import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
const IncomePage = React.lazy(() => import('./Pages/Income/Income'))

function App() {

  return (
    <div className='flex gap-5 m-auto w-full'>
      <section>
        <SideBar />
      </section>
      <Routes>
        <Route path='/Income' element={ <React.Suspense><IncomePage /> </React.Suspense> }  />
      </Routes>
    </div>
  )
}

export default App
