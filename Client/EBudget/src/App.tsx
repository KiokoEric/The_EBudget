import './App.css';
import React from 'react';
import Login from './Pages/User/Login/Login';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
import Dashboard from './Pages/Dashboard/Dashboard';
import { useGetUserID } from './Components/Hooks/useGetUserID';
import ErrorBoundary from './Pages/ErrorBoundary/ErrorBoundary';
const IncomePage = React.lazy(() => import('./Pages/Income/Income'))
const SavingsPage = React.lazy(() => import('./Pages/Saving/Savings'))
const ExpensePage = React.lazy(() => import('./Pages/Expense/Expense'))
const ProfilePage = React.lazy(() => import('./Pages/User/Profile/Profile'))
const EditProfilePage = React.lazy(() => import('./Pages/User/EditProfile/EditProfile'))
const RegistrationPage = React.lazy(() => import('./Pages/User/Registration/Registration'))
const DeleteProfilePage = React.lazy(() => import('./Pages/User/DeleteProfile/DeleteProfile'))
const Loan_CalculatorPage = React.lazy(() => import('./Pages/Loan_Calculator/Loan_Calculator'))
const IncomeTransactionPage = React.lazy(() => import('./Pages/IncomeTransaction/IncomeTransaction'))
const SavingsTransactionPage = React.lazy(() => import('./Pages/SavingsTransaction/SavingsTransaction'))
const ExpenseTransactionPage = React.lazy(() => import('./Pages/ExpenseTransaction/ExpenseTransaction'))
function App() {

  const ID = useGetUserID()

  return (
    <div className='flex flex-col gap-3 m-auto w-full xl:flex-row'>
      <section>
        <SideBar />
      </section>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/Registration' element={<React.Suspense><RegistrationPage /></React.Suspense> }/>
          <Route path='/Income/:_id' element={<React.Suspense><IncomeTransactionPage /></React.Suspense>}/>
          <Route path='/Savings/:_id' element={<React.Suspense><SavingsTransactionPage /></React.Suspense>}/>
          <Route path='/Expense/:_id' element={<React.Suspense><ExpenseTransactionPage /></React.Suspense>}/>
          <Route path='/Income' element={ID ? <React.Suspense><IncomePage /></React.Suspense> : <ErrorBoundary />}/>
          <Route path='/:userID' element={ID ? <React.Suspense><ProfilePage /></React.Suspense> : <ErrorBoundary />}/>
          <Route path='/Expense' element={ID ? <React.Suspense><ExpensePage /></React.Suspense> : <ErrorBoundary />}/>
          <Route path='/Dashboard' element={ID ? <React.Suspense><Dashboard /></React.Suspense> : <ErrorBoundary />}/>
          <Route path='/Savings' element={ID ? <React.Suspense><SavingsPage /></React.Suspense> : <ErrorBoundary />}/>
          <Route path='/DeleteProfile' element={ID ? <React.Suspense><DeleteProfilePage /></React.Suspense> : <ErrorBoundary />}/>
          <Route path='/EditProfile/:userID' element={ID ? <React.Suspense><EditProfilePage /></React.Suspense> : <ErrorBoundary />}/>
          <Route path='/Loan_Calculator' element={ID ? <React.Suspense><Loan_CalculatorPage /></React.Suspense> : <ErrorBoundary />}/>
        </Routes>
    </div>
  )
}

export default App
