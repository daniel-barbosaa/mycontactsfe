import { useEffect, useState, useMemo, useCallback } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVIsible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [contacts, searchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(prevState => (prevState === 'asc' ? 'desc' : 'asc'));
  }
  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setIsDeleteModalVIsible(true);
    setContactBeingDeleted(contact);
  }

  function handleClodeDeleteModal() {
    setIsDeleteModalVIsible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      handleClodeDeleteModal();
      setContacts(prevState =>
        prevState.filter(contact => contact.id !== contactBeingDeleted.id),
      );
      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao deletar contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoadingDelete,
    contactBeingDeleted,
    handleClodeDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    isLoading,
    contacts,
    hasError,
    handleTryAgain,
    filteredContacts,
    searchTerm,
    handleToggleOrderBy,
    handleDeleteContact,
    handleChangeSearchTerm,
    orderBy,
  };
}
