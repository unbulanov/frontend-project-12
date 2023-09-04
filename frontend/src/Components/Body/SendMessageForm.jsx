import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../hooks/useChatApi';
import useAuth from '../../hooks/useAuth';
import { getCurrentChannelId } from '../../store/slices/channelsSlice';

const SendMessageForm = () => {
  const { t } = useTranslation();
  const api = useChatApi();
  const auth = useAuth();
  const inputRef = useRef(null);
  const currentChannelId = useSelector(getCurrentChannelId);
  const username = auth.getUser();
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, { resetForm }) => {
      if (message !== '') {
        const filterMessage = filter.clean(message);
        const data = {
          body: filterMessage,
          channelId: currentChannelId,
          username,
        };
        api.sendMessage(data);
        resetForm();
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik]);

  const {
    values, handleSubmit, handleChange, isValid, dirty,
  } = formik;

  return (
    <div className="mt-auto px-5 py-3">
      <div>
        <Form
          className="py-1 border rounded-2"
          onSubmit={handleSubmit}
        >
          <InputGroup hasValidation>
            <Form.Control
              className="border-0 p-0 ps-2"
              placeholder="Введите ваше сообщение..."
              aria-label="Новое сообщение"
              name="message"
              onChange={handleChange}
              value={values.message}
              ref={inputRef}
            />
            <Button
              type="submit"
              variant="link"
              className="btn-group-vertical text-dark"
              disabled={(!isValid || !dirty)}
            >
              {t('message.sayHi')}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default SendMessageForm;