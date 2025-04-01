import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';

import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import ContactMapper from '../../services/mappers/ContactMapper';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContacts(contact);

      contactFormRef.current.resetFields();
      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
        duration: 3000,
      });
    }
  }
  return (
    <>
      <PageHeader title={'Novo Contato'} />
      <ContactForm
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
        ref={contactFormRef}
      />
    </>
  );
}
