import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <h2>
        Bienvenido a <span>Nodepop</span>!
      </h2>
      <form className={styles.loginForm}>
        <Input
          inputType="email"
          inputName="email"
          placeholderText="Introduce tu e-mail"
        />
        <Input
          inputType="password"
          inputName="password"
          placeholderText="Contraseña"
        />
        <div className={styles.checkbox_container}>
          <input
            type="checkbox"
            name="rememberPassword"
            id="rememberPassword"
          ></input>
          <label htmlFor="rememberPassword">Recordar contraseña</label>
        </div>
        <Button buttonType="submit">Acceder a Nodepop</Button>
      </form>
    </div>
  );
}
