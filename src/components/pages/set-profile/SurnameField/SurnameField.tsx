import React from 'react';
import Input from '../../../Common/Inputs/Input';
import InputType from '../../../../types/Input';

const SurnameField: React.FC<InputType> = function ({ formik, isRequired }) {
  return (
    <Input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.surname}
      error={formik.errors.surname}
      touched={formik.touched.surname}
      name="surname"
      placeholder={`Фамилия${isRequired ? '*' : ''}`}
    />
  );
};

export default SurnameField;
