import styled from 'styled-components';

const LinkButton = styled.a`
    display: inline-block;
    font-size: 2rem;
    padding: 0.3em;
    width: fit-content;
    border-radius: 20px;
    background-color: #D3D3D3;
    color: black;
    text-decoration: none;

    &:hover {
        background-color: rebeccapurple;
    }
`;

export default ({ to, children }) => (
  <LinkButton href={to}>
    {children}
  </LinkButton>
);
