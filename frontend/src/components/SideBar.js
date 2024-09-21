import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../assets/css/sidebar.css';
//import '../assets/css/custom-styles.css';

const Sidebar = ({ token, setToken }) => {
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/signin';
  };

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
        <symbol id="bootstrap" viewBox="0 0 118 94">
          <title>WeSync</title>
          </symbol>
        <symbol id="home" viewBox="0 0 16 16">
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
        </symbol>
        <symbol id="feed" viewBox="0 0 16 16">
          <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"/>
          <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"/>
        </symbol>
        <symbol id="newpost" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </symbol>

      </svg>

      <main className="d-flex flex-nowrap">
        <h1 className="visually-hidden">Sidebars examples</h1>

        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: '4.5rem' }}>
          <a href="/" className="d-block p-3 link-body-emphasis text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
            <svg className="bi pe-none" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
            <span className="visually-hidden">Icon-only</span>
          </a>
          <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li className="nav-item">
              <Link to="/" className="nav-link active py-3 border-bottom rounded-0" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Home"><use xlinkHref="#home" /></svg>
              </Link>
            </li>
            <li>
              <Link to="/feed" className="nav-link py-3 border-bottom rounded-0" title="Feed" data-bs-toggle="tooltip" data-bs-placement="right">
                <svg width="24" height="24" fill="currentColor" className="bi bi-newspaper"><use xlinkHref="#feed" /></svg>
              </Link>
            </li>
            <li>
              <Link to="/newpost" className="nav-link py-3 border-bottom rounded-0" title="Feed" data-bs-toggle="tooltip" data-bs-placement="right">
                <svg width="24" height="24" fill="currentColor" className="bi bi-pencil-square"><use xlinkHref="#newpost" /></svg>
              </Link>
            </li>
          </ul>
  
          <div className="dropdown border-top">
            
          </div>
          <div className="dropdown">
          <a href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://avatars.githubusercontent.com/u/113725438?v=4" alt="mdo" width="24" height="24" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu dropdown-menu-light text-small shadow">
              <li>
                <Link to="/profile" className="dropdown-item" title="Profile" data-bs-toggle="tooltip" data-bs-placement="right">
                  Profile
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" title="Sign Out" data-bs-toggle="tooltip" data-bs-placement="right" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>

  
      </main>
    </>
  );
};

export default Sidebar;