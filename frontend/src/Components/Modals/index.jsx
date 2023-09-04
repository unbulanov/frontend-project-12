import React from 'react';
import { useSelector } from 'react-redux';
import Add from './Add';
import { getModalType } from '../../store/slices/modalsSlice';
import Rename from './Rename';
import Remove from './Remove';

const ModalComponent = (props) => {
  const { type } = props;
  const modals = {
    adding: Add,
    renaming: Rename,
    removing: Remove,
  };
  const Component = modals[type];
  return (
    <Component {...props} />
  );
};

const Modal = (props) => {
  const type = useSelector(getModalType);
  return (
    <>
      {type && <ModalComponent type={type} {...props} />}
    </>
  );
};

export default Modal;