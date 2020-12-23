import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';
import styled from 'styled-components';

const App = styled.div`
  min-height: 100%;
`;

export default () =>
  <App>
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
  </App>;
