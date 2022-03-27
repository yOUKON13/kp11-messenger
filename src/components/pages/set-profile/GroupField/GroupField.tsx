import React from 'react';
import Input from '../../../Common/Inputs/Input';
import InputType from '../../../../types/Input';

const GroupField: React.FC<InputType> = function ({ formik, isRequired }) {
  return (
    <Input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.group}
      error={formik.errors.group}
      touched={formik.touched.group}
      name="group"
      placeholder={`Группа${isRequired ? '*' : ''}`}
    >
      <i className="fa-regular fa-user-group" />
    </Input>
  );
};

export default GroupField;
