import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import Loader from '../../components/Loader';

import useEditContact from './useEditContact';

export default function EditContact() {
  const { isLoading, handleSubmit, contactsFormRef, playerName } =
    useEditContact();

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
