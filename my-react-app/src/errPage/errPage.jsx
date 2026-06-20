import React from 'react';
import './errPage.css';

export default function ErrorPage () {
  return (
    <div className="error-page">
      <div className="particles" aria-hidden="true">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <main className="error-card" role="main">

        <p className="error-title">.آهنگ شما پیدا نشد</p>

        <div className="actions">
          <a href="/" className="btn btn-primary">
            <span className="icon"></span> بازگشت به خانه
          </a>
        </div>
      </main>
    </div>
  );
};