import memoize from 'lru-memoize';
import { createValidator, required, minLength, maxLength, email } from 'utils/validation';

const registerValidation = createValidator({
  name: [
    required, minLength(3)
  ],
  email: [
    required, email
  ],
  password: [required, minLength(4)],
  // password_confirmation: [required, match('password')]
  handphone: [
    required, minLength(7), maxLength(12)
  ],
  birthday: required,
  birthmonth: required,
  birthyear: required
});

export default memoize(10)(registerValidation);
