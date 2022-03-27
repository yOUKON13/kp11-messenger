import React from 'react';
import Input from '../../../Common/Inputs/Input';
import InputType from '../../../../types/Input';

const EmailField: React.FC<InputType> = function ({ formik }) {
  return (
    <Input
      name="email"
      error={formik.errors.email}
      touched={formik.touched.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
      placeholder="Почта"
      inputType="email"
    >
      <i className="fa-solid fa-envelope" />
    </Input>
  );
};

export default EmailField;
