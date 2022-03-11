type PropType = {
  placeholder?: string;
  inputType?: string;
  onChange: any;
  value: any;
  name: string;
  error?: string;
};

const Input: React.FC<PropType> = function ({
  placeholder,
  inputType,
  children,
  value,
  onChange,
  name,
  error,
}) {
  return (
    <div className="input-container">
      <div className={`${error ? 'error ' : ''}input-outer flex-container`}>
        <div>{children}</div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={inputType || 'text'}
          className="input"
          placeholder={placeholder}
        />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
