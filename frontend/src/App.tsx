import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import LandingPage from './components/landing-page/LandingPage';
import Register from './components/register/Register';

import store from './store';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App:React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/register">
              <Register />
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
