import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
const IncomePage = React.lazy(() => import('./Pages/Income/Income'))
const ExpensePage = React.lazy(() => import('./Pages/Expense/Expense'))

function App() {

  return (
    <div className='flex gap-3 m-auto w-full'>
      <section>
        <SideBar />
      </section>
      <section className='bg-white px-4 py-4 rounded Shadow-green'>
        <Routes>
          <Route path='/Income' element={ <React.Suspense><IncomePage /></React.Suspense> }  />
          <Route path='/Expense' element={ <React.Suspense><ExpensePage /></React.Suspense> }  />
        </Routes>
      </section>
    </div>
  )
}

export default App
