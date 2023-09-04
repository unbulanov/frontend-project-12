import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button, Form, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../hooks/useChatApi';
import { getChannelsNames } from '../../store/selectors';

const Add = ({ onHide }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const api = useChatApi();
  const inputRef = useRef(null);
  const channelsName = useSelector(getChannelsNames);
  const notify = () => toast.success(t('notify.addChannel'));
  const handleClose = () => {
    setShow(false);
    onHide();
  };
  const handleSucces = () => {
    handleClose();
    notify();
  };
  useEffect(() => {
    inputRef.current.focus();
  });
  const validationSchema = yup.object().shape({
    name: yup.string()
      .required(t('modal.required'))
      .min(3, t('modal.minMax'))
      .max(20, t('modal.minMax'))
      .notOneOf(channelsName, t('modal.uniq')),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: ({ name }) => {
      api.newChannel(name, handleSucces);
    },
  });
  const {
    touched, handleSubmit, handleChange, values, errors,
  } = formik;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
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
            ref={inputRef}
            isInvalid={touched.name && !!errors.name}
          />
          <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
          <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handleClose}>{t('modal.cancel')}</Button>
            <Button type="submit" variant="primary">{t('modal.add')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;