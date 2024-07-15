import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
const IncomePage = React.lazy(() => import('./Pages/Income/Income'))
const SavingsPage = React.lazy(() => import('./Pages/Saving/Savings'))
const ExpensePage = React.lazy(() => import('./Pages/Expense/Expense'))
const LoginPage = React.lazy(() => import('./Pages/User/Login/Login'))
const ProfilePage = React.lazy(() => import('./Pages/User/Profile/Profile'))
const RegistrationPage = React.lazy(() => import('./Pages/User/Registration/Registration'))
const Loan_CalculatorPage = React.lazy(() => import('./Pages/Loan_Calculator/Loan_Calculator'))

function App() {

  return (
    <div className='flex gap-3 m-auto w-full'>
      <section>
        <SideBar />
      </section>
        <Routes>
          <Route path='/Income' element={ <React.Suspense><IncomePage /></React.Suspense> }/>
          <Route path='/Expense' element={ <React.Suspense><ExpensePage /></React.Suspense> }/>
          <Route path='/Savings' element={ <React.Suspense><SavingsPage /></React.Suspense> }/>
          <Route path='/Loan_Calculator' element={<React.Suspense><Loan_CalculatorPage /></React.Suspense>} />
          <Route path='/Profile' element={<React.Suspense><ProfilePage /></React.Suspense>} />
          <Route path='/Registration' element={ <React.Suspense><RegistrationPage /></React.Suspense> }/>
          <Route path='/Login' element={ <React.Suspense><LoginPage /></React.Suspense> } />
        </Routes>
    </div>
  )
}

export default App
