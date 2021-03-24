import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Empty from './containers/Empty';
import Admin from './containers/Admin';
// import Home from './containers/Home';
import Login from './containers/Login/login';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
        <Route component={Empty} />
      </Switch>
    </Router>
  );
}
