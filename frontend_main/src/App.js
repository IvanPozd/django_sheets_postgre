import React, {useState, useDispatch, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Table from 'rc-table';
import Login from './components/login';
import Singup from './components/singup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';


function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  async function singup(user = null) {
    setUser(null);
  }
    
  return (
    <div className="App">
      <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/datas/"  align="center">Таблица</Navbar.Brand>
            <Nav className="me-auto">
            { user ? 
              (<Nav.Link>Logout({user})</Nav.Link>)
                  :(<>
                    <Nav.Link href="/login/">Login</Nav.Link>
                    <Nav.Link href="/singup/">Sing Up</Nav.Link>
                    </>)
            }
            </Nav>
            </Container>
        </Navbar>
        </>
    </div>
  );
}

export default App;
