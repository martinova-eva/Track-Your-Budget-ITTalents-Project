import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import RegistrationForm from './components/registration/registration';
import LoginForm from './components/login/login';
import Navigation from './components/navigation/navigation';
import TransactionPage from './pages/transactionPage/transactionPage';
import CreateCategoryPage from './pages/createCategoryPage/createCategoryPage';
import Target from './components/target/target';
import CreateCheckingAccount from './components/CheckingAccountForm/CheckingAccountForm';
import TransactionPage from './pages/transactionPage/transactionPage'
import TransactionsList from './components/TrasnsactionsList/TransactionsList';
import AccountsList from './components/accountsList/AcountsList';

import DemoPage from './pages/demoPage/demoPage';

function App() {
 
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
        <Route path="/homePage" element={<>
          <Navigation/>
        <Target/>
        <AccountsList/>
       
        
        </>} />

        <Route path="/accountPage" element={<>
          <Navigation/>
        <h1>Personal Account Page</h1>
        </>} />

        <Route path="/accountSavings" element={<>
          <Navigation/>
        <h1>Create a savings account here, add target, and set percentage, which will come here</h1>

        </>} />

        <Route path="/addTransaction" element={<>
            <Navigation/>
            <TransactionPage></TransactionPage>
        </>} />

        <Route path="/createNewCategory" element={<>
          <Navigation/> 
          <CreateCategoryPage/>
        </>} />

        <Route path="/createCheckingsAccount" element={<>
          <Navigation/>
        <CreateCheckingAccount/>
        </>} />
        <Route path="/allTransactions" element={<>
          <Navigation/>
          
          <TransactionsList/>
        
        </>} />
        
        <Route path="*" element={<>
        <h1>ooooopppppsss 404!</h1>
        </>} />
      </Routes>
    </div>
  

  );
}

export default App;
