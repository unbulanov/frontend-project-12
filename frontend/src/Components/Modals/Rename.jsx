import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  Modal, Button, Form, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useChatApi from '../../hooks/useChatApi';
import { getCurrentChannel, getChannelsNames } from '../../store/selectors';

const Rename = ({ onHide }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const api = useChatApi();
  const inputRef = useRef(null);
  const channelsName = useSelector(getChannelsNames);
  const currentChannel = useSelector(getCurrentChannel);
  const { id, name } = currentChannel;
  const notify = () => toast.success(t('notify.renameChannel'));

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  const handleSucces = () => {
    handleClose();
    notify();
  };
  const validationSchema = yup.object().shape({
    name: yup.string()
      .required(t('modal.required'))
      .min(3, t('modal.minMax'))
      .max(20, t('modal.minMax'))
      .notOneOf(channelsName, t('modal.uniq')),
  });
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      setTimeout(() => {
        api.updateNameChannel({ id, name }, handleSucces);
        setSubmitting(false);
      }, 500);
    },
  });
  const {
    touched, handleSubmit, handleChange, isSubmitting, values, errors,
  } = formik;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="mb-2"
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            disabled={isSubmitting}
            ref={inputRef}
            isInvalid={touched.name && !!errors.name}
          />
          <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
          <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handleClose}>{t('modal.cancel')}</Button>
            <Button disabled={isSubmitting} type="submit" variant="primary">{t('modal.add')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;