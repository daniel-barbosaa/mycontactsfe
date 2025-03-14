import { useState, useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
// Parei no minuto 15:00...
export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = event => {
      const { type, text } = event.detail;

      setMessages(prevState => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    };

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, [messages]);

  return (
    <Container>
      {messages.map(message => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
