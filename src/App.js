import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';
import Empty from './pages/Empty';
import Admin from './pages/Admin'
import Home from './pages/Home';
import Login from './pages/Login/login';
import { AuthLogin } from './utils/Auth.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" render={(props) => {
          // 登入校验
          if (!AuthLogin()) {
            return <Redirect to="/login"></Redirect>
          }
          return <Home {...props}></Home>
        }} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Admin} />
        <Route component={Empty} />
      </Switch>
    </Router>
  );
}

export default App;
