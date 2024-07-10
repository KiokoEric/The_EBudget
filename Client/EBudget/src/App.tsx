import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
const IncomePage = React.lazy(() => import('./Pages/Income/Income'))
const SavingsPage = React.lazy(() => import('./Pages/Saving/Savings'))
const ExpensePage = React.lazy(() => import('./Pages/Expense/Expense'))
const RegistrationPage = React.lazy(() => import('./Pages/User/Registration/Registration'))

function App() {

  return (
    <div className='flex gap-3 m-auto w-full'>
      <section>
        <SideBar />
      </section>
        <Routes>
          <Route path='/Income' element={ <React.Suspense><IncomePage /></React.Suspense> }  />
          <Route path='/Expense' element={ <React.Suspense><ExpensePage /></React.Suspense> }  />
          <Route path='/Savings' element={ <React.Suspense><SavingsPage /></React.Suspense> }  />
          <Route path='/Registration' element={ <React.Suspense><RegistrationPage /></React.Suspense> }  />
        </Routes>
    </div>
  )
}

export default App
