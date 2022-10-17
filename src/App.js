import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import RegistrationForm from './components/registration/registration';
import LoginForm from './components/login/login';
import Navigation from './components/navigation/navigation';


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
        <RegistrationForm></RegistrationForm>
        </>} />

        <Route path="/login" element={<>
        <LoginForm/>
        </>} />
        <Route path="/homePage" element={<>
          <Navigation/>
        <h1>Welcome to Home Page</h1>
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
        <h1>Add a transaction</h1>
        </>} />

        <Route path="/createNewCategory" element={<>
          <Navigation/>
        <h1>Here you can create a new transaction category</h1>
        </>} />

        <Route path="*" element={<>
        <h1>ooooopppppsss 404!</h1>
        </>} />
      </Routes>
    </div>
  );
}

export default App;
