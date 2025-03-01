import { StyledSpinner } from './styles';
import PropTypes from 'prop-types';

export default function Spinner({ size = 32 }) {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};
