/* eslint-disable functional/no-expression-statement */
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginPage = () => {
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    // username: Yup.string().required('Обязательное поле'),
    // password: Yup.string().required('Обязательное поле'),
  });

  // const data = useSelector((state) => state.auth);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    axios.post('/api/v1/login', { username: values.username, password: values.password })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log(response);
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('username', response.data.username);
          window.location.replace('/');
        }
      })
      .catch((error) => {
        setSubmitting(false);
        if (error.response.status === 401) {
          setFieldError('password', t('loginPage.form.errors.wrongData'));
        } else {
          console.error('Ошибка авторизации:', error);
        }
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
              <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('loginPage.form.title')}</h1>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="username"
                    className={`form-control ${formik.touched.username && formik.errors.password ? 'is-invalid' : ''}`}
                    placeholder={t('loginPage.form.fieldsLabels.username')}
                    id="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    required
                  />
                  <label htmlFor="username">{t('loginPage.form.fieldsLabels.username')}</label>
                  {formik.touched.username && formik.errors.username ? (
                    <div className="invalid-tooltip">{formik.errors.username}</div>
                  ) : null}
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    placeholder={t('loginPage.form.fieldsLabels.password')}
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                  />
                  <label htmlFor="password">{t('loginPage.form.fieldsLabels.password')}</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-tooltip">{formik.errors.password}</div>
                  ) : null}
                </div>

                <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={formik.isSubmitting}>
                  {t('loginPage.form.submitButton')}
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.form.footer.notAUser')}</span>
                {' '}
                <a href="/signup">{t('loginPage.form.footer.signUp')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
