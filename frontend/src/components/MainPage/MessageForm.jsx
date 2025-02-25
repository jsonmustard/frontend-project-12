import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MessageForm = () => {
  const { t } = useTranslation();
  const { token, username } = window.localStorage;
  const inputRef = useRef(null);

  const { currentChannelId } = useSelector((state) => ({
    currentChannelId: state.channels.currentChannelId,
  }));

  const initialValues = {
    body: '',
  };

  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .trim()
      .required(t('errors.required')),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const newMessage = {
      body: values.body,
      channelId: currentChannelId,
      username,
    };

    axios
      .post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 10);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      })
      .finally(() => {
        setSubmitting(false);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 10);
      });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && formik.values.body.trim()) {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  const isSubmitDisabled = formik.isSubmitting || !formik.values.body.trim();

  return (
    <div className="mt-auto px-5 py-3">
      <form
        onSubmit={formik.handleSubmit}
        noValidate=""
        className="py-1 border rounded-2"
      >
        <div className="input-group has-validation">
          <input
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            placeholder={t('mainPage.messageInputPlaceholder')}
            aria-label={t('mainPage.newMessage')}
            className="border-0 p-0 ps-2 form-control"
            disabled={formik.isSubmitting}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="btn btn-group-vertical"
            disabled={isSubmitDisabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
            <span className="visually-hidden">
              {t('mainPage.sendButton')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
