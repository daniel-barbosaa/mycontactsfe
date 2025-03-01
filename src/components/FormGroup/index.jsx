import { Container } from './styles';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import Spinner from '../Spinner';

export default function Formgroup({ children, error, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}
        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}

Formgroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

Formgroup.defaultProps = {
  error: null,
  isLoading: false,
};
