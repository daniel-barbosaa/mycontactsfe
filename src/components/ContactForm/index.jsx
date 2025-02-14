import Formgroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <Formgroup>
        <Input placeholder="Nome" />
      </Formgroup>
      <Formgroup error="O formato do email é invalido">
        <Input placeholder="E-mail" error />
      </Formgroup>
      <Formgroup>
        <Input placeholder="Telefone" />
      </Formgroup>

      <Formgroup>
        <Select>
          <option value="instagram">instagram</option>
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
