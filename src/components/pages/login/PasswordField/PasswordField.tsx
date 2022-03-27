import React from 'react';
import Password from '../../../Common/Inputs/Password';
import InputType from '../../../../types/Input';

const PasswordField: React.FC<InputType> = function ({ formik }) {
  return (
    <Password
      error={formik.errors.password}
      touched={formik.touched.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
    >
      <i className="fa-solid fa-key" />
    </Password>
  );
};

export default PasswordField;
