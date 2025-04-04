import { Link } from 'react-router-dom';
import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

import { Card, ListHeader } from './styles';

export default function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader $orderBy={orderBy}>
          <button type="button" onClick={onToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="seta" />
          </button>
        </ListHeader>
      )}
      {filteredContacts.map(contact => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button
              type="button"
              onClick={() => {
                onDeleteContact(contact);
              }}
            >
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}
