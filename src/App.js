import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';
import Empty from './View/Empty/index';
import Home from './View/Home/index';
import Login from './View/Login/index';
import { AuthLogin } from './utils/Auth.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => {
          return <Redirect to="/home"></Redirect>
        }}></Route>
        <Route path="/home" render={(props) => {
          // 登入校验
          if (!AuthLogin()) {
            return <Redirect to="/login"></Redirect>
          }
          return <Home {...props}></Home>
        }}></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={Empty}></Route>
      </Switch>
    </Router>
  );
}

export default App;
