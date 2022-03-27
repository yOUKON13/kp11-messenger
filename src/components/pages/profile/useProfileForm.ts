import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  length,
  maxLength,
  minLength,
  removeEmptyValidators,
  trimAll,
  validate,
} from '../../../utils/validation';
import { UpdateProfileF } from '../../../store/reducers/Auth/AuthReducer';
import { GetUser } from '../../../store/reducers/Auth/AuthSelector';
import { makeFormData } from '../../../utils/formData';

function useProfileForm(file: File) {
  const dispatch = useDispatch();
  const user = useSelector(GetUser);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      group: '',
      currentPassword: '',
      newPassword: '',
    },
    validate: (values: any) => {
      trimAll(values);
      const error: any = {};

      error.surname = validate(values.surname, [maxLength(128)]);
      error.phoneNumber = validate(values.phoneNumber.toString(), [length(11)]);
      error.name = validate(values.name, [maxLength(64)]);
      error.group = validate(values.group, [maxLength(32)]);
      error.currentPassword = validate(values.currentPassword, [minLength(6)]);
      error.newPassword = validate(values.newPassword, [minLength(6)]);

      removeEmptyValidators(error);
      return error;
    },
    onSubmit: values => {
      const isFilled =
        file ||
        !Object.keys(values).every(key => {
          return (
            values[key] === formik.initialValues[key] ||
            values[key] === user[key]
          );
        });

      if (isFilled) {
        const formData = makeFormData(values);

        if (file && file.name) {
          formData.append('avatar', file, file.name);
        }

        dispatch(UpdateProfileF(formData));
      }
    },
  });

  return formik;
}

export default useProfileForm;
