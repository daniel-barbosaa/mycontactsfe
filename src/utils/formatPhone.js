export default function formatPhone(phonenumber) {
  return phonenumber
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    .replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
}
