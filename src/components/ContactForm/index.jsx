import Formgroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import isValidEmail from '../../utils/IsValidEmail';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErros';
import CategoriesService from '../../services/CategoriesService';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const { errors, setError, removeError, getErroMessageByFieldName } =
    useErrors();
  const isFormInvalid = name && errors.length === 0;

  useImperativeHandle(ref, () => {
    return {
      setFieldsValues: contact => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone) ?? '');
        setCategoryId(contact.category_id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    };
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isValidEmail(e.target.value)) {
      setEmail(e.target.value);
      setError({ field: 'email', message: 'Email é obrigatório' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    await onSubmit({ name, phone, categoryId, email });
    setSubmitting(false);
  }

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
