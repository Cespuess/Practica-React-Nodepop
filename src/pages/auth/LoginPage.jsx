import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formValues;
  const disButton = !email || !password;

  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className={styles.loginPage}>
      <h2>
        Bienvenido a <span>Nodepop</span>!
      </h2>
      <form className={styles.loginForm}>
        <Input
          inputType="email"
          inputName="email"
          inputValue={email}
          placeholderText="Introduce tu e-mail"
          onChangeFunction={handleChange}
        />
        <Input
          inputType="password"
          inputName="password"
          inputValue={password}
          placeholderText="Contraseña"
          onChangeFunction={handleChange}
        />
        <div className={styles.checkbox_container}>
          <input
            type="checkbox"
            name="rememberPassword"
            id="rememberPassword"
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
