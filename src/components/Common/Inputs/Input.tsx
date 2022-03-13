import { useState } from 'react';

type PropType = {
  placeholder?: string;
  inputType?: string;
  onChange: any;
  onBlur: any;
  value: any;
  name: string;
  error?: string;
  touched?: boolean;
};

const Input: React.FC<PropType> = function ({
  placeholder,
  inputType,
  children,
  value,
  onChange,
  onBlur,
  name,
  error,
  touched,
}) {
  const [showError, setShowingError] = useState(true);

  function onFocus(value: FocusEvent<HTMLInputElement>) {
    setShowingError(false);
  }

  function blur(value: any) {
    setShowingError(true);
    onBlur(value);
  }

  const errorShow = touched && error && showError;

  return (
    <div className="input-container">
      <div className={`${errorShow ? 'error ' : ''}input-outer flex-container`}>
        <div className="left">{children}</div>
        <div className="input-with-error">
          {errorShow && <p>{error}</p>}
          <input
            onFocus={onFocus}
            onBlur={blur}
            name={name}
            value={!errorShow ? value : ''}
            onChange={onChange}
            type={inputType || 'text'}
            className="input"
            placeholder={!errorShow ? placeholder : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
