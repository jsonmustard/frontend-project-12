import React, { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { addChannel, toggleAddChannelModal } from '../slices/channelsSlice';

const { token } = window.localStorage;
const socket = io();

const ModalAddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);

  const onSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
    const newChannel = {
      name: values.name,
    };

    axios
      .post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();
        dispatch(toggleAddChannelModal());
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
        .min(3, t('modals.addChannel.fields.name.errors.minLength'))
        .max(20, t('modals.addChannel.fields.name.errors.maxLength'))
        .notOneOf(channels.map((channel) => channel.name), t('modals.addChannel.fields.name.errors.exist'))
        .required(t('modals.addChannel.fields.name.errors.required')),
    }),
    onSubmit,
  });

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(addChannel({ channels: payload }));
    });
  }, [dispatch]);

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.addChannel.title')}</div>
              <button type="button" aria-label="Close" className="btn btn-close" onClick={() => dispatch(toggleAddChannelModal())} />
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
                  <label htmlFor="name" className="visually-hidden">{t('modals.addChannel.fields.name.name')}</label>
                  <div className="invalid-feedback">
                    {formik.touched.name && formik.errors.name ? formik.errors.name : null}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={() => dispatch(toggleAddChannelModal())}>
                      {t('modals.addChannel.buttons.cancel')}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>{t('modals.addChannel.buttons.submit')}</button>
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

export default ModalAddChannel;
