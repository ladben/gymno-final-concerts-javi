import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import LandingPage from './components/landing-page/LandingPage';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Gate from './components/gate/Gate';
import Main from './components/main/Main';

import store from './store';

import './App.scss';

const App:React.FC = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/">
              <Gate />
            </Route>
            <Route exact path="/landing">
              <LandingPage />
            </Route>
            <Route exact path="/welcome">
              <Main />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route>
              <h1>Not implemented.</h1>
              <Link to="/">Return to the landing page</Link>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
