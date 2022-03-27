import Input from '../../../Common/Inputs/Input';
import React from 'react';
import InputType from '../../../../types/Input';

const LoginField: React.FC<InputType> = function ({ formik }) {
  return (
    <Input
      name="login"
      error={formik.errors.login}
      touched={formik.touched.login}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.login}
      placeholder="Логин"
    >
      <i className="fa-solid fa-user" />
    </Input>
  );
};

export default LoginField;
