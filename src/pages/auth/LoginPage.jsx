import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './LoginPage.module.scss';
import { login } from './service';
import { storageLocal, storageSession } from '../../utils/storage';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';
import ErrorsDisplay from '../../components/ErrorsDisplay';

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
  const { onLogin } = useAuth();

  const { email, password } = formValues;
  const disButton = !email || !password || isFetching;

  const handleChangeCredentials = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleError = () => setError(null);

  function showError() {
    return (
      <ErrorsDisplay
        errorMessage={error.message}
        onClickFunction={handleError}
      />
    );
  }

  const handleChangeCheckValue = () => {
    setCheckValue(() => !checkValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsFetching(true);
      const accessToken = await login(formValues);
      storageSession.set('auth', accessToken);
      onLogin();
      if (checkValue) storageLocal.set('auth', accessToken);
      const to = location.state?.from || '/';
      navigate(to);
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
            name="rememberSession"
            id="rememberSession"
            value={checkValue}
            onChange={handleChangeCheckValue}
          ></input>
          <label htmlFor="rememberSession">Recordar Sesión</label>
        </div>
        <Button buttonType="submit" disabledButton={disButton}>
          Acceder a Nodepop
        </Button>
        {error && showError()}
      </form>
    </div>
  );
}
