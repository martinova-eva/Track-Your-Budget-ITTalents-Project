import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<>
        <h1>Welcome to OUR Demo Page!</h1>
        <Link to="/login">You already have an account, click here!</Link><br></br>
        <Link to="/register">You don't have an account, click here!</Link>
        </>} />

        <Route path="/register" element={<>
        <h1>Welcome to Register</h1>
        <Link to="/login">You already have an account, click here!</Link><br></br>
        <Link to="/">Go to Demo Page!</Link>
        </>} />

        <Route path="/login" element={<>
        <h1>Welcome to Log In</h1>
        <Link to="/">Go to Demo Page!</Link><br></br>
        <Link to="/homePage">Go To Home Page!</Link><br></br>
        <Link to="/register">You don't have an account, click here!</Link>
        </>} />

        <Route path="/homePage" element={<>
        <h1>Welcome to Home Page</h1>
        <Link to="/accountPage">Go To Account Page!</Link><br></br>
        <Link to="/accountSavings">Go To Savings account Page and create your Savings account!</Link><br></br>
        <Link to="/addTransaction">Click here and add transaction!</Link><br></br>
        <Link to="/createNewCategory">Create a new transaction category!</Link>
        </>} />

        <Route path="/accountPage" element={<>
        <h1>Personal Account Page</h1>
        <Link to="/homePage">Go To Home Page!</Link><br></br>
        <Link to="/accountSavings">Go To Savings account Page and create your Savings account, add your target!</Link><br></br>
        <Link to="/createNewCategory">Create a new transaction category!</Link><br></br>
        </>} />

        <Route path="/accountSavings" element={<>
        <h1>Create a savings account here, add target, and set percentage, which will come here</h1>
        <Link to="/homePage">Go To Home Page!</Link><br></br>
        <Link to="/addTransaction">Click here and add transaction!</Link><br></br>
        <Link to="/createNewCategory">Create a new transaction category!</Link><br></br>
        </>} />

        <Route path="/addTransaction" element={<>
        <h1>Add a transaction</h1>
        <Link to="/homePage">Go To Home Page!</Link><br></br>   
        <Link to="/accountPage">Go To Account Page!</Link> <br></br>
        <Link to="/createNewCategory">Create a new transaction category!</Link><br></br>
        </>} />

        <Route path="/createNewCategory" element={<>
        <h1>Here you can create a new transaction category</h1>
        <Link to="/homePage">Go To Home Page!</Link><br></br> 
        <Link to="/accountPage">Go To Account Page!</Link><br></br> 
        <Link to="/accountSavings">Go To Savings account Page and create your Savings account!</Link><br></br> 
        <Link to="/addTransaction">Click here and add transaction!</Link>
        </>} />

        <Route path="*" element={<>
        <h1>ooooopppppsss 404!</h1>
        </>} />
      </Routes>
    </div>
  );
}

export default App;
