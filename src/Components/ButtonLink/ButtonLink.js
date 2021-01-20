import Button from '../../UI/Button';

export default ({ to, style, children }) => (
  <Button href={to} style={style}>
    {children}
  </Button>
);
