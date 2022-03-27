import './styles/style.scss';
import Login from './components/pages/login/Login';
import { HashRouter, Switch, Route, useHistory } from 'react-router-dom';
import Register from './components/pages/register/Register';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { socket } from './store/store';
import Index from './components/pages/home/Home';
import Toolbar from './components/Layout/Toolbar/Toolbar';
import Main from './components/pages/main/Main';
import SetProfile from './components/pages/set-profile/SetProfile';
import Messages from './components/pages/messages/Messages';
import Profile from './components/pages/profile/Profile';
import StatusMessage from './components/Layout/StatusMessage/StatusMessage';
import { GetTheme } from './store/reducers/Settings/SettingsSelector';
import useWebSocket from './hooks/useWebSocket/useWebSocket';
import UserWindow from './components/Layout/UserWindow/UserWindow';

function AppRouter() {
  useWebSocket();

  return (
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
      <Route path="/messages/:id">
        <Messages />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/">
        <Index />
      </Route>
    </Switch>
  );
}

function AppInner() {
  const theme = useSelector(GetTheme);

  return (
    <div className="app-container" data-theme={theme ? 'dark' : 'light'}>
      <Toolbar />
      <div className="app">
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </div>
      <StatusMessage />
      <UserWindow />
    </div>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
