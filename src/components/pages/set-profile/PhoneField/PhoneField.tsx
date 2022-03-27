import React from 'react';
import Input from '../../../Common/Inputs/Input';
import InputType from '../../../../types/Input';

const PhoneField: React.FC<InputType> = function ({ formik, isRequired }) {
  return (
    <Input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.phoneNumber}
      error={formik.errors.phoneNumber}
      touched={formik.touched.phoneNumber}
      name="phoneNumber"
      placeholder={`Телефон${isRequired ? '*' : ''}`}
      inputType="number"
    >
      <i className="fa-regular fa-phone" />
    </Input>
  );
};

export default PhoneField;
