import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center h-100">
      <img
        alt={t('notFoundPage.title')}
        className="img-fluid h-25 w-25"
        src="/404.svg"
      />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.toMainText')}
        {' '}
        <a href="/">{t('notFoundPage.toMainLink')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
