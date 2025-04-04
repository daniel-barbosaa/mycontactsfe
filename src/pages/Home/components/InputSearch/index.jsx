import { Container } from './styles';

export default function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Pesquise pelo nome..."
      />
    </Container>
  );
}
