import React, { useState } from 'react';

type PropType = {
  onChange: any;
  onBlur: any;
  value: any;
  error?: string;
  touched?: boolean;
};

const Password: React.FC<PropType> = function ({
  children,
  onChange,
  onBlur,
  error,
  value,
  touched,
}) {
  const [currentVis, setVis] = useState(false);
  const [showError, setShowingError] = useState(true);

  function onFocus(value: any) {
    setShowingError(false);
  }

  function blur(value: any) {
    setShowingError(true);
    onBlur(value);
  }

  function setVisibility() {
    setVis(!currentVis);
  }

  const errorShow = touched && error && showError;

  return (
    <div className="input-container">
      <div className={`${errorShow ? 'error ' : ''}input-outer flex-container`}>
        <div className="left">{children}</div>
        <div className="input-with-error">
          {errorShow && <p>{error}</p>}
          <button
            tabIndex={-1}
            type="button"
            onClick={setVisibility}
            className="invisible-button right"
          >
            <span className="material-icons-outlined">
              {currentVis ? (
                <i className="fa-solid fa-eye-slash" />
              ) : (
                <i className="fa-solid fa-eye" />
              )}
            </span>
          </button>
          <input
            onFocus={onFocus}
            onBlur={blur}
            name="password"
            value={!errorShow ? value : ''}
            onChange={onChange}
            type={currentVis ? 'text' : 'password'}
            className="input"
            placeholder={!errorShow ? 'Пароль' : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default Password;
