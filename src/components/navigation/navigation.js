import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation.css'
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {logOutUser} from '../../store/activeUserSlice';
import { userManager } from '../../server/userManager/userManager';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


export default function Navigation() {
  const activeUser = useSelector(state => state.activeUser);
  const sessionId = activeUser.sessionId;
  const dispatch = useDispatch();
const navigate = useNavigate()




  const handleLogout = ()=> {
    userManager.logoutFromStorage();
    dispatch(logOutUser(sessionId))
    navigate('/')  
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
               <Link to="/home" className="nav-link active text-dark" id="nav-home">Home page</Link>
               <Link to="/add-account" className="nav-link active text-dark" id="nav-accounts">Add new account</Link>
                <NavDropdown
                
                  title="Transactions"
                  className="text-dark"
                  id="nav-transactions"
                >
                  <NavDropdown.Item className="onclickNav" as={Link} to="/add-transaction">Add a transaction 
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="onclickNav" as={Link} to="/create-category">Create new category
                </NavDropdown.Item>
              </NavDropdown>
              </Nav>
              <Button
                  type="button"
                  variant="contained"
                  size="large"
                  id="logOutButton"
                  onClick={handleLogout}
               >Logout</Button>
                
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
  