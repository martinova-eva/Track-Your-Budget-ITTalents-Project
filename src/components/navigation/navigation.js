import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation.css'

export default function Navigation() {
  return (
    <Navbar key="lg" bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Link to="/homePage" className="nav-link active text-dark">
          <Navbar.Brand ><img width={50} className='navLogo' src='../assets/10491-logo-wallet.png'></img>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"lg"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
              <img src='..\assets\10491-logo-wallet.png' width={25} alt='logo.png'></img>
              Budget tracker
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/homePage" className="nav-link active text-dark">Home page</Link>
              <Link to="/accountPage" className="nav-link active text-dark">Accounts</Link>
              <Link to="/accountSavings" className="nav-link active text-dark">Savings account</Link>
              <NavDropdown
                title="Transactions"
                className="text-dark"
                id={`offcanvasNavbarDropdown-expand-${"lg"}`}>
                <NavDropdown.Item as={Link} to="/addTransaction">Add a transaction 
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/createNewCategory">Create new category
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button className="exit" variant="outline-dark"><Link to="/" className="nav-link active ">EXIT</Link></Button>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

// export default function Navigation() {
//   return (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand>LOGO</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Link to="/homePage" className="nav-link active text-light">Home page</Link>
//             <Link to="/accountPage" className="nav-link active text-light">Accounts</Link>
//             <NavDropdown title="Add transactions" className="text-light" id="collasible-nav-dropdown">
//               <NavDropdown.Item ><Link to="/addTransaction" className="nav-link active text-dark">Add to account in lv</Link></NavDropdown.Item>
//               <NavDropdown.Item ><Link to="/addTransaction" className="nav-link active text-dark">Add to account in $</Link>
//               </NavDropdown.Item>
//               <NavDropdown.Divider/>
//               <NavDropdown.Item >
//               <Link to="/createNewCategory" className="nav-link active text-dark">Create new category</Link>
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Button variant="outline-success"><Link to="/" className="nav-link active text-light">EXIT</Link></Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }