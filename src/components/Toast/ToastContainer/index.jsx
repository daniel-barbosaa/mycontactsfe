import { useState, useEffect, useCallback, useRef } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setMessages(prevState => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    };
    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [messages]);

  const handleRemoveMessage = useCallback(id => {
    setMessages(prevState => prevState.filter(message => message.id !== id));
  }, []);

  return (
    <Container>
      {messages.map(message => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
