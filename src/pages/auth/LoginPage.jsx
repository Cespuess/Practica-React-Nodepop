import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './LoginPage.module.scss';
import { login } from './service';
import storage from '../../utils/storage';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [checkValue, setCheckValue] = useState(false);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const { email, password } = formValues;
  const disButton = !email || !password || isFetching;

  const handleChangeCredentials = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleError = () => setError(null);

  const handleChangeCheckValue = () => {
    setCheckValue(() => !checkValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsFetching(true);
      const accessToken = await login(formValues);
      if (checkValue) storage.set('auth', accessToken);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h2>
        Bienvenido a <span>Nodepop</span>!
      </h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Input
          inputType="email"
          inputName="email"
          inputValue={email}
          placeholderText="Introduce tu e-mail"
          onChangeFunction={handleChangeCredentials}
        />
        <Input
          inputType="password"
          inputName="password"
          inputValue={password}
          placeholderText="Contraseña"
          onChangeFunction={handleChangeCredentials}
        />
        <div className={styles.checkbox_container}>
          <input
            type="checkbox"
            name="rememberPassword"
            id="rememberPassword"
            value={checkValue}
            onChange={handleChangeCheckValue}
          ></input>
          <label htmlFor="rememberPassword">Recordar contraseña</label>
        </div>
        <Button buttonType="submit" disabledButton={disButton}>
          Acceder a Nodepop
        </Button>
        {error && (
          <div className={styles.errorDisplay} onClick={handleError}>
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
}
