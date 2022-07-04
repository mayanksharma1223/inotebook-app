import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    }
    )
    setTimeout(() => {
      setAlert(null);
    }, 2000)

  }

  return (
    <>
      <div >
        <NoteState>
          <Router>
            <div >
              <Switch>
                <Route exact path="/" >
                  <div className="homescreen">
                  <Navbar />
                  <Alert alert={alert} />
                  <Home showAlert={showAlert} />
                  </div>
                </Route>
                <Route exact path="/about">
                <Navbar />
                <Alert alert={alert} />
                  <About />
                </Route>
                <Route exact path="/login">
                  <Navbar />
                  <Alert alert={alert} />
                  <Login showAlert={showAlert} />
                </Route>
                <Route exact path="/signup">
                  <Navbar />
                  <Alert alert={alert} />
                  <Signup showAlert={showAlert} />
                </Route>
              </Switch>
            </div>
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;
