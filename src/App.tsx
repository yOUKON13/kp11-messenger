import './styles/style.scss';
import Login from './components/pages/login/Login';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Register from './components/pages/register/Register';
import { Provider } from 'react-redux';
import store from './store/store';
import Index from './components/pages/home/Home';
import Toolbar from './components/Layout/Toolbar/Toolbar';
import Main from './components/pages/main/Main';
import SetProfile from './components/pages/set-profile/SetProfile';
import Messages from './components/pages/messages/Messages';

export function App() {
  return (
    <Provider store={store}>
      <Toolbar />
      <div className="app">
        <HashRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/set-profile">
              <SetProfile />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/">
              <Index />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </Provider>
  );
}
