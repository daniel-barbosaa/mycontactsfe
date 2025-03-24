import Spinner from '../Spinner';
import { StylesButton } from './styles';
import PropTypes from 'prop-types';

export default function Button({
  type,
  isLoading,
  disabled,
  children,
  danger,
  onClick = undefined,
}) {
  return (
    <StylesButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
    >
      {!isLoading ? children : <Spinner size={16} />}
    </StylesButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};
