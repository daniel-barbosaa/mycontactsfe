import ContactForm from '../../components/ContactForm';

import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      await ContactsService.createContacts(contact);
    } catch (error) {
      //   alert('Erro ao cadastrar contato');
      const event = new CustomEvent('addtoast', {
        detail: {
          type: 'danger',
          text: 'Ocorreu um erro ao cadastrar contato!',
        },
      });
      document.dispatchEvent(event);
    }
  }
  return (
    <>
      <PageHeader title={'Novo Contato'} />
      <ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
    </>
  );
}
