import { Container } from './styles';

import Loader from '../../components/Loader';
import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';

import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';
import useAnimatedList from '../../hooks/useAnimatedList';

export default function Home() {
  const { handleRemoveItems } = useAnimatedList();
  const {
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
  } = useHome(handleRemoveItems);

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && !hasError && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}
      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {isListEmpty && <EmptyList />}

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            isLoading={isLoadingDelete}
            danger
            title={`Tem certeza que deseja remover contato "${contactBeingDeleted?.name}"?`}
            cancelLabel="Cancelar"
            confirmLabel="Deletar"
            onCancel={handleClodeDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            visible={isDeleteModalVisible}
          >
            <p>Essa operação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
