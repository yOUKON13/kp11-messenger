import { useFormik } from 'formik';
import Input from '../../Common/Inputs/Input';
import '../../../styles/pages/set-profile.scss';
import {
  length,
  maxLength,
  removeEmptyValidators,
  required,
  validate,
} from '../../../utils/validation';
import {
  AuthActions,
  CreateProfile,
} from '../../../store/reducers/Auth/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';
import Loader from '../../Common/Loader/Loader';
import { useHistory } from 'react-router-dom';

function SetProfile() {
  const dispatch = useDispatch();
  const isLoading = useSelector(GetLoadingStatus);
  const history = useHistory();
  useAuth();

  function goBack() {
    dispatch(AuthActions.setUser(null));
    history.push('/');
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      group: '',
    },
    validate: values => {
      const error: any = {};

      error.name = validate(values.name, [required(), maxLength(64)]);
      error.surname = validate(values.surname, [maxLength(128)]);
      error.phoneNumber = validate(values.phoneNumber.toString(), [length(11)]);
      error.group = validate(values.group, [required(), maxLength(32)]);
      removeEmptyValidators(error);
      return error;
    },
    onSubmit: values => {
      dispatch(CreateProfile(values));
      formik.resetForm();
    },
  });

  return (
    <div className="page-container set-profile">
      <h1>Ваш профиль</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="set-profile__top-block flex-container">
          <div className="set-profile__avatar">
            <img src="./assets/avatar.png" alt="" />
            <button>
              <i className="fa-light fa-pencil"></i>
            </button>
          </div>
          <div>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.errors.name}
              touched={formik.touched.name}
              name="name"
              placeholder="Имя*"
            />
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              error={formik.errors.surname}
              touched={formik.touched.surname}
              name="surname"
              placeholder="Фамилия"
            />
          </div>
        </div>
        <div className="set-profile__bottom-block flex-container">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            error={formik.errors.phoneNumber}
            touched={formik.touched.phoneNumber}
            name="phoneNumber"
            placeholder="Телефон"
            inputType="number"
          >
            <i className="fa-regular fa-phone" />
          </Input>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.group}
            error={formik.errors.group}
            touched={formik.touched.group}
            name="group"
            placeholder="Группа*"
          >
            <i className="fa-regular fa-user-group" />
          </Input>
        </div>

        <div className="set-profile__buttons flex-container">
          <button onClick={goBack} className="gray-button">
            Назад
          </button>
          <button type="submit">Далее</button>
        </div>
      </form>
      {isLoading && <Loader />}
    </div>
  );
}

export default SetProfile;
