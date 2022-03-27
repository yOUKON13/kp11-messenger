type PropType = {
  label?: string;
  isChecked?: boolean;
  setChecked?: any;
  className?: string;
};

const Checkbox: React.FC<PropType> = function ({
  label,
  isChecked,
  setChecked,
  className,
}) {
  return (
    <div className={`checkbox-container flex-container ${className}`}>
      <input
        checked={isChecked}
        onChange={setChecked}
        type="checkbox"
        id={label}
        className="input"
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;
