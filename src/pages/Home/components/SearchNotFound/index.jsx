import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier question" />
      <span>
        Nenhum resultado foi encontrado para <strong>{searchTerm}</strong> .
      </span>
    </Container>
  );
}
