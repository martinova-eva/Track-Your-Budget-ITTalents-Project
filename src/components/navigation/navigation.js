import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation.css'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {logout, logoutUser} from '../../store/activeUserSlice';
import { logoutFromStorage } from '../../server/users';

export default function Navigation() {
  const sessionId = useSelector(state => state.sessionId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = ()=> {
    logoutFromStorage();
    dispatch(logoutUser(sessionId));
    dispatch(logout());
    logoutFromStorage();//ще приема юзер когато вече трябва да знае на кой данните да върне в общия масиви и ще стане първо
    navigate('/login');
  }
    return (
        <Navbar key="lg" bg="light" expand="lg" className="mb-3">
        <Container fluid>
        <Link to="/home" className="nav-link active text-dark">
          <Navbar.Brand ><img width={50} className='navLogo' src='../assets/10491-logo-wallet.png'></img></Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"lg"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
              <img src='../assets/10491-logo-wallet.png' width={40} alt='logo.png'></img>
                   Budget tracker
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
               <Link to="/home" className="nav-link active text-dark">Home page</Link>
               <Link to="/transactions" className="nav-link active text-dark">Accounts</Link>
               <Link to="/add-account" className="nav-link active text-dark">Add new account</Link>
                <NavDropdown
                  title="Transactions"
                  className="text-dark"
                  id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                >
                  <NavDropdown.Item as={Link} to="/add-transaction">Add a transaction 
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/create-category">Create new category
                </NavDropdown.Item>
              </NavDropdown>
              </Nav>
                <Button onClick={handleLogout} className="exit" variant="outline-dark">EXIT</Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }