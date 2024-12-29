/* eslint-disable functional/no-expression-statement */
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import { logout } from '../slices/authSlice';
import ModalAddChannel from './ModalAddChannel';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalEditChannel from './ModalEditChannel';

const Header = () => {
  const { t } = useTranslation();
  filter.loadDictionary('en');
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.setItem('token', '');
    window.location.replace('login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container d-flex justify-content-between">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {isSignedIn && (
        <button type="button" className="btn btn-primary" onClick={handleLogout}>
          {t('buildPage.buttons.logout')}
        </button>
        )}
      </div>
    </nav>
  );
};

const BuildPage = ({ PageComponent }) => {
  const {
    isActiveAddChannelModal,
    isActiveRemoveChannelModal,
    isActiveEditChannelModal,
  } = useSelector((state) => state.channels);
  return (
    <>
      <div className={`h-100 bg-light ${isActiveAddChannelModal ? 'modal-open' : ''}`} style={{ 'overscroll-behavior-x': 'none', overflow: 'hidden' }}>
        <div className="h-100">
          <div className="h-100" id="chat">
            <div className="d-flex flex-column h-100">
              <Header />
              <PageComponent />
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
      {isActiveAddChannelModal ? <ModalAddChannel /> : ''}
      {isActiveRemoveChannelModal ? <ModalRemoveChannel /> : ''}
      {isActiveEditChannelModal ? <ModalEditChannel /> : ''}
    </>
  );
};

export default BuildPage;