import { Component } from 'react';
import styles from './ErrorBoundary.module.scss';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      info: null
    };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;

    if (error) {
      return (
        <section className={styles.container}>
          <h1>Ha sucedido un error!!</h1>
          <div>
            <code className={styles.error}>{error.message}</code>
          </div>
          <div>
            <code className={styles.info}>{JSON.stringify(info)}</code>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
};

export default ErrorBoundary;
