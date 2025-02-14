import { Container } from './styles';
import PropTypes from 'prop-types';

export default function Formgroup({ children, error }) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

Formgroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

Formgroup.defaultProps = {
  error: null,
};
