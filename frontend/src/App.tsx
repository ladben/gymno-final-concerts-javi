import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import LandingPage from './components/landing-page/LandingPage';

import store from './store';

import './App.scss';

const App:React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/login">
              <div className="title">
                <h1>
                  Login page
                </h1>
              </div>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
