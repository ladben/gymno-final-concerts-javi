import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import './App.scss';

const App:React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/">
              <div className="title">
                <h1>
                  Hello!
                </h1>
              </div>
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
