import React from 'react';
import Input from '../../../Common/Inputs/Input';
import InputType from '../../../../types/Input';

const NameField: React.FC<InputType> = function ({ formik, isRequired }) {
  return (
    <Input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.name}
      error={formik.errors.name}
      touched={formik.touched.name}
      name="name"
      placeholder={`Имя${isRequired ? '*' : ''}`}
    />
  );
};

export default NameField;
