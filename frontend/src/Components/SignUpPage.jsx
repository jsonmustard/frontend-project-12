/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUpPage = () => {
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signUpPage.form.username.lenghtError'))
      .max(20, t('signUpPage.form.username.lenghtError'))
      .required(t('signUpPage.form.errors.fieldRequired')),
    password: Yup.string()
      .min(6, t('signUpPage.form.password.lenghtError'))
      .required(t('signUpPage.form.errors.fieldRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signUpPage.form.confirmPassword.matchError')),
  });

  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    axios.post('/api/v1/signup', { username: values.username, password: values.password })
      .then((response) => {
        if (response.status === 201) {
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('username', response.data.username);
          window.location.replace('/');
        }
      })
      .catch((error) => {
        setSubmitting(false);
        if (error.response.status === 409) {
          setFieldError('confirmPassword', t('signUpPage.form.errors.userExists'));
        } else {
          console.error('Ошибка создания пользователя:', error);
        }
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src="avatar_1-D7Cot-zE.jpg"
                  className="rounded-circle"
                  alt={t('signUpPage.form.title')}
                />
              </div>
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUpPage.form.title')}</h1>
                <div className="form-floating mb-3">
                  <input
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    className={`mb-2 form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  <label htmlFor="username">{t('signUpPage.form.username.fieldName')}</label>
                  {formik.touched.username && formik.errors.username && (
                  <div className="invalid-tooltip">{formik.errors.username}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className={`mb-2 form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <label htmlFor="password">{t('signUpPage.form.password.fieldName')}</label>
                  {formik.touched.password && formik.errors.password && (
                  <div className="invalid-tooltip">{formik.errors.password}</div>
                  )}
                </div>
                <div className="form-floating mb-4">
                  <input
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className={`mb-2 form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  <label htmlFor="confirmPassword">{t('signUpPage.form.confirmPassword.fieldName')}</label>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                  )}
                </div>
                <button aria-label="general" type="submit" className="w-100 btn btn-outline-primary" disabled={formik.isSubmitting}>
                  {t('signUpPage.form.submitButton')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
