import Formgroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
import { use, useEffect, useState } from 'react';
import isValidEmail from '../../utils/IsValidEmail';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErros';
import CategoriesService from '../../services/CategoriesService';
export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const isFormInvalid = name && errors.length === 0;
  const { errors, setError, removeError, getErroMessageByFieldName } =
    useErrors();

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

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, phone, categoryId, email });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Formgroup error={getErroMessageByFieldName('name')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErroMessageByFieldName('name')}
        />
      </Formgroup>
      <Formgroup error={getErroMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErroMessageByFieldName('email')}
        />
      </Formgroup>
      <Formgroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </Formgroup>

      <Formgroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          disabled={isLoadingCategories}
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
        <Button type="submit" disabled={!isFormInvalid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
