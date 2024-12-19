import React, { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { editChannel, toggleEditChannelModal } from '../slices/channelsSlice';

const { token } = window.localStorage;
const socket = io();

const ModalEditChannel = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => ({
    ...state.channels,
    ...state.channelToEditId,
  }));

  const {
    channels, channelToEditId,
  } = data;

  const onSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
    const editedChannel = {
      name: values.name,
    };

    axios
      .patch(`/api/v1/channels/${channelToEditId}`, editedChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();
        dispatch(toggleEditChannelModal());
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Имя должно быть не менее 3 символов')
        .max(20, 'Имя не должно превышать 20 символов')
        .notOneOf(channels.map((channel) => channel.name), 'Канал с таким именем уже существует')
        .required('Обязательное поле'),
    }),
    onSubmit,
  });

  useEffect(() => {
    socket.on('renameChannel', (payload) => {
      dispatch(editChannel({ channels: payload }));
    });
  }, [dispatch]);

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Переименовать канал</div>
              <button type="button" aria-label="Close" className="btn btn-close" onClick={() => dispatch(toggleEditChannelModal())} />
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    name="name"
                    id="name"
                    className={`mb-2 form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <label htmlFor="name" className="visually-hidden">Имя канала</label>
                  <div className="invalid-feedback">
                    {formik.touched.name && formik.errors.name ? formik.errors.name : null}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={() => dispatch(toggleEditChannelModal())}>
                      Отменить
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Отправить</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditChannel;
