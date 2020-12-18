import { Link, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';
import './App.css';

export default () =>
  <div>
    {/* <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/game'>Game</Link>
      </li>
    </ul> */}

    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/game'>
        <GamePage />
      </Route>
      <Redirect path='*' to='/' />
    </Switch>
  </div>;
