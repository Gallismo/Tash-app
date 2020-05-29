import React from 'react';

function MainPage() {
    return (
        <div className="container page-comp text-center">
          <div className="row">
            <div className="col-4" />
            <div className="col-4">
              <h1 className='text-primary'>Колхоз-авито</h1>
              <a href="/auth" className='nav-link text-light btn btn-primary auth'>Войти</a>
            </div>
            <div className="col-4" />
          </div>
        </div>
    );
  }

export default MainPage;