import Button from '../../../../components/Button';
import { Container } from './styles';
import sad from '../../../../assets/images/sad.svg';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button onClick={onTryAgain} type="button">
          {' '}
          Tentar Novamente
        </Button>
      </div>
    </Container>
  );
}
