import ButtonLink from '../Components/ButtonLink/ButtonLink';
import styled from 'styled-components';

const HomePage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default () => {
  return (
    <HomePage>
      <h1>Conway's Game of Life</h1>
      <br aria-hidden='true' />
      <ButtonLink to='/game'>Open Game</ButtonLink>
    </HomePage>
  );
};
