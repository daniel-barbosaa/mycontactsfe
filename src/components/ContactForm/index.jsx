import Formgroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import isValidEmail from '../../utils/IsValidEmail';
export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleChangeName(e) {
    setName(e.target.value);
    if (!e.target.value) {
      setErrors(prevState => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório' },
      ]);
    } else {
      setErrors(prevState => prevState.filter(error => error.field !== 'name'));
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isValidEmail(e.target.value)) {
      const errorEmailExists = errors.find(error => error.field === 'email');

      if (errorEmailExists) {
        return;
      }

      setErrors(prevState => [
        ...prevState,
        { field: 'email', message: 'Email é obrigatório' },
      ]);
    } else {
      setErrors(prevState =>
        prevState.filter(error => error.field !== 'email'),
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function getErroMessageByFieldName(fieldName) {
    return errors.find(error => error.field === fieldName)?.message;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Formgroup error={getErroMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
          error={getErroMessageByFieldName('name')}
        />
      </Formgroup>
      <Formgroup error={getErroMessageByFieldName('email')}>
        <Input
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
          onChange={e => setPhone(e.target.value)}
        />
      </Formgroup>

      <Formgroup>
        <Select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="instagram">instagram</option>
          <option value="whatsapp">Whatsapp</option>
        </Select>
      </Formgroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
