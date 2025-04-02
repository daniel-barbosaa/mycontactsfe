import Formgroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleSubmit,
    getErroMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    categories,
    setCategoryId,
    isFormInvalid,
    email,
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Formgroup error={getErroMessageByFieldName('name')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErroMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </Formgroup>
      <Formgroup error={getErroMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErroMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </Formgroup>
      <Formgroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </Formgroup>

      <Formgroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categorias</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Formgroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormInvalid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
