import React from 'react';
import Input from '../../../Common/Inputs/Input';
import InputType from '../../../../types/Input';

const PasswordConfirmField: React.FC<InputType> = function ({ formik }) {
  return (
    <Input
      name="passwordConfirm"
      error={formik.errors.passwordConfirm}
      touched={formik.touched.passwordConfirm}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.passwordConfirm}
      placeholder="Подтверждение пароля"
      inputType="password"
    >
      <i className="fa-solid fa-key" />
    </Input>
  );
};

export default PasswordConfirmField;
