import { createValidator, required, email, minLength, integer } from 'utils/validation';

const partnersValidation = createValidator({
  name: [required, minLength(3)],
  email: [required, email],
  companyName: [required, minLength(3)],
  companyTelephone: [required, integer, minLength(8)],
  companyCity: [required],
  category: [required],
  companyAddress: [required, minLength(10)]
});

export default partnersValidation;
