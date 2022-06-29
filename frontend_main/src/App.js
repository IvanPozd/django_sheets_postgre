import React, {useState, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Table from 'rc-table';
import Login from './components/login';
import Singup from './components/singup';
// import DataList from './components/data-list';
import DataSolo from './components/data-solo';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';
import DataService from './services/datas';
import Table from './components/Table';


function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  // console.log(`from App ${user}`) //
  // console.log(localStorage.getItem('user'))
  // console.log(localStorage.getItem('token'))
  // console.log(user)
  
  useEffect(() => {
      setToken(localStorage.getItem('token'));
      setUser(localStorage.getItem('user'));
    });

  async function login(user = null) {
    DataService.login(user).then(response => {
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user.username);
      setError("");
    })
    .catch(e => {
      console.log('login', e);
      setError(e.toString());
    });
  }

  async function logout() {
    setToken('');
    setUser('');
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }

  async function singup(user = null) {
    DataService.singup(user).then(response => {
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user.username);
      setError("");
    })
    .catch(e => {
      console.log('login', e);
      setError(e.toString());
    });
  }
    
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/datas/"  align="center">Таблица</Navbar.Brand>
          <Nav className="me-auto">
          { user ? 
            (<Nav.Link onClick={logout}>Logout({user})</Nav.Link>)
                :(<>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/singup">Sing Up</Nav.Link>
                  </>)
          }
          </Nav>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <Switch>
          <Route exact path={["/", "/datas"]} render={(props) => 
            <Table {...props} token={token} />
            }>
          </Route>

          <Route path="/datas/:id" render={(props) => 
            <DataSolo {...props} token={token} />
            }>
          </Route>

          <Route path="/login" render={(props) => 
            <Login {...props} login={login} />
            }>
          </Route>

          <Route path="/singup" render={(props) => 
            <Singup {...props} singup={singup} />
            }>
          </Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
