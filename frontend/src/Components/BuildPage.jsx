const BuildPage = ({ PageComponent }) => (
  <div className="min-vh-100 bg-light">
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Hexlet Chat
              </a>
            </div>
          </nav>
          <PageComponent />
        </div>
        <div className="Toastify" />
      </div>
    </div>
  </div>
);

export default BuildPage;
