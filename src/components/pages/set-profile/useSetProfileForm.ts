import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { length, maxLength, removeEmptyValidators, required, trimAll, validate } from '../../../utils/validation';
import { CreateProfile } from '../../../store/reducers/Auth/AuthReducer';
import { makeFormData } from '../../../utils/formData';

function useSetProfileForm(file: File) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      group: '',
    },
    validate: (values: any) => {
      trimAll(values);
      const error: any = {};

      error.surname = validate(values.surname, [maxLength(64)]);
      error.phoneNumber = validate(values.phoneNumber.toString(), [length(11)]);
      error.name = validate(values.name, [required(), maxLength(32)]);
      error.group = validate(values.group, [required(), maxLength(32)]);
      removeEmptyValidators(error);
      return error;
    },

    onSubmit: values => {
      const formData = makeFormData(values);

      if (file && file.name) {
        formData.append('avatar', file, file.name);
      }

      dispatch(CreateProfile(formData));
      formik.resetForm();
    },
  });

  console.log(formik.values);

  return formik;
}

export default useSetProfileForm;
