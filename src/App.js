import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import RegistrationForm from './components/registration/registration';
import LoginForm from './components/login/login';
import Navigation from './components/navigation/navigation';
import CreateCategoryPage from './pages/createCategoryPage/createCategoryPage';
import Target from './components/target/target';
import CreateCheckingAccount from './components/CheckingAccountForm/CheckingAccountForm';
import TransactionPage from './pages/transactionPage/transactionPage'
import TransactionsList from './components/TrasnsactionsList/TransactionsList';
import AccountsList from './components/accountsList/AcountsList';
import DemoPage from './pages/demoPage/demoPage';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

export default function App() {

  const loggedUser = useSelector(state => state.activeUser)

  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<>
        <DemoPage/>
        <Link to="/login">You already have an account, click here!</Link><br></br>
        <Link to="/register">You don't have an account, click here!</Link>
        </>} />

        <Route path="/register" element={<>
        <RegistrationForm></RegistrationForm>
        </>} />

        <Route path="/login" element={<>
        <LoginForm/>
        </>} />
        <Route path="/home" element={<>
        
          <Navigation/>
        <Target/>
        <AccountsList/>
        </>} />

        <Route path="/transactions/:id" element={<>
          <Navigation/>
          <TransactionsList/>
        </>} />

        <Route path="/add-account" element={<>
          <Navigation/>
          <CreateCheckingAccount/>
        </>} />

        <Route path="/add-transaction" element={<>
            <Navigation/>
            <TransactionPage></TransactionPage>
        </>} />

        <Route path="/create-category" element={<>
          <Navigation/> 
          <CreateCategoryPage/>
        </>} />

        <Route path="/create-account" element={<>
          <Navigation/>
        <CreateCheckingAccount/>
        </>} />
        
        <Route path="*" element={<>
        <h1>ooooopppppsss 404!</h1>
        </>} />
      </Routes>
    </div>
  

  );
}
