const MainPage = () => {
  if (!window.localStorage.token) {
    window.location.replace('login');
  }
};

export default MainPage;
