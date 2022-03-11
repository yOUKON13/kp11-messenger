import { useState } from 'react';

type PropType = {
  onChange: any;
  value: any;
  error?: string;
};

const Password: React.FC<PropType> = function ({
  children,
  onChange,
  error,
  value,
}) {
  const [currentVis, setVis] = useState(false);

  function setVisibility() {
    setVis(!currentVis);
  }

  return (
    <div className="input-container">
      <div className={`${error ? 'error ' : ''}input-outer flex-container`}>
        <div>{children}</div>
        <input
          type={currentVis ? 'text' : 'password'}
          className="input"
          placeholder="Пароль"
          value={value}
          onChange={onChange}
          name="password"
        />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Password;
