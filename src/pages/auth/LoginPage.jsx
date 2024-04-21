import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './LoginPage.module.scss';
import { login } from './service';
import storage from '../../utils/storage';

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [checkValue, setCheckValue] = useState(false);

  const { email, password } = formValues;
  const disButton = !email || !password;

  const handleChangeCredentials = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleChangeCheckValue = () => {
    setCheckValue(() => !checkValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accessToken = await login(formValues);
      if (checkValue) storage.set('auth', accessToken);
    } catch (error) {
      alert(error);
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
      </form>
    </div>
  );
}
