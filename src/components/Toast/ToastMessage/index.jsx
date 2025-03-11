import { Container } from './styles';
import PropTypes from 'prop-types';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import xCheckIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, type = 'default' }) {
  return (
    <Container type={type}>
      {type === 'danger' && <img src={xCircleIcon} alt="x"></img>}
      {type === 'success' && <img src={xCheckIcon} alt="check"></img>}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};
