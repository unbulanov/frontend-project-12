import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.walkTo')}
        {' '}
        <a href="/">
          {t('notFoundPage.teleport')}
        </a>
      </p>
    </div>
  );
};

export default ErrorPage;