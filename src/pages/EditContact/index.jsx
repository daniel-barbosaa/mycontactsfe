import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction.JS';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const contactsFormRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contacts = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactsFormRef.current.setFieldsValues(contacts);
          setIsLoading(false);
          setPlayerName(contacts.name);
        });
      } catch {
        safeAsyncAction(() => {
          navigate('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }
    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
        duration: 3000,
      });
      setPlayerName(contactData.name);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${playerName}`}
      />
      <ContactForm
        buttonLabel={'Salvar alterações'}
        onSubmit={handleSubmit}
        ref={contactsFormRef}
      />
    </>
  );
}
