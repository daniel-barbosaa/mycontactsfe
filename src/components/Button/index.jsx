import Spinner from '../Spinner';
import { StylesButton } from './styles';
import PropTypes from 'prop-types';

export default function Button({ type, isLoading, disabled, children }) {
  return (
    <StylesButton type={type} disabled={disabled || isLoading}>
      {!isLoading ? children : <Spinner size={16} />}
    </StylesButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
