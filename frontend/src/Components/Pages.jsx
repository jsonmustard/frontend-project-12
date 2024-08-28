import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return(
    <div className="text-center h-100">
    <img
      alt="Страница не найдена"
      className="img-fluid h-25 w-25"
      src="/404.svg"
    />
    <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
    <p className="text-muted">
      {t('notFoundPage.toMainText')} <a href="/">{t('notFoundPage.toMainLink')}</a>
    </p>
  </div>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission with values here
    setTimeout(() => {
      // Simulate a delay for demonstration
      alert(JSON.stringify(values, null, 2)); // Show submitted values in an alert
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center min-vh-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src="login.jpeg" 
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('loginPage.form.title')}</h1>

                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder={t('loginPage.form.fieldsLabels.username')}
                        id="username"
                      />
                      <label htmlFor="username">{t('loginPage.form.fieldsLabels.username')}</label>
                      <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder={t('loginPage.form.fieldsLabels.password')}
                        id="password"
                      />
                      <label htmlFor="password">{t('loginPage.form.fieldsLabels.password')}</label>
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>

                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>
                    {t('loginPage.form.submitButton')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.form.footer.notAUser')}</span>{' '}
                <a href="/signup">{t('loginPage.form.footer.signUp')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return(
    <Login />
  );
};

const MainPage = () => {
  return;
};

const BuildPage = ({ PageComponent }) => {
  return(
    <div className="min-vh-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">
                  Hexlet Chat
                </a>
              </div>
            </nav>
            <PageComponent />
          </div>
        <div className="Toastify" />
      </div>
    </div>
  </div>
  );
};

export { BuildPage, NotFoundPage, LoginPage, MainPage };
