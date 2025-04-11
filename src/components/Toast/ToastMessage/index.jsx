import { Container } from './styles';
import PropTypes from 'prop-types';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import xCheckIcon from '../../../assets/images/icons/check-circle.svg';
import { useEffect } from 'react';

export default function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
}) {
    
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }
  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      $isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="x"></img>}
      {message.type === 'success' && <img src={xCheckIcon} alt="check"></img>}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
};
