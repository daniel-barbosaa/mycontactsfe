import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';

export default function EditContact() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const contactsFormRef = useRef(null);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    async function loadContact() {
      try {
        const contacts = await ContactsService.getContactById(id);
        contactsFormRef.current.setFieldsValues(contacts);
        setIsLoading(false);
      } catch {
        navigate('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    }
    loadContact();
  }, [id]);

  function handleSubmit() {}
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={'Editar Daniel barbosa'} />
      <ContactForm
        buttonLabel={'Salvar alterações'}
        onSubmit={handleSubmit}
        ref={contactsFormRef}
      />
    </>
  );
}
