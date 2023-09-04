import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCurrentChannel } from '../../store/slices/channelsSlice';
import { getMessagesForCurrentChannel } from '../../store/selectors';

const Header = () => {
  const { t } = useTranslation();
  const currentChannelName = useSelector(getCurrentChannel);
  const count = useSelector(getMessagesForCurrentChannel);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {currentChannelName?.name}
        </b>
      </p>
      <span className="text-muted">
        {' '}
        {count.length}
        {' '}
        {t('message.messages')}
      </span>
    </div>
  );
};

export default Header;