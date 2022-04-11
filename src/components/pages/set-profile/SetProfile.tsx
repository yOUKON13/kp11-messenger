import '../../../styles/pages/set-profile.scss';
import { AuthActions } from '../../../store/reducers/Auth/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth/useAuth';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';
import Loader from '../../Common/Loader/Loader';
import { useHistory } from 'react-router-dom';
import SetAvatar from '../../Common/Inputs/SetAvatar';
import NameField from './NameField/NameField';
import SurnameField from './SurnameField/SurnameField';
import PhoneField from './PhoneField/PhoneField';
import GroupField from './GroupField/GroupField';
import useSetProfileForm from './useSetProfileForm';
import { useState } from 'react';

function SetProfile() {
  const dispatch = useDispatch();
  const isLoading = useSelector(GetLoadingStatus);
  const history = useHistory();
  const [file, setFile] = useState({});

  const formik = useSetProfileForm(file);

  useAuth();

  function goBack() {
    dispatch(AuthActions.setUser(null));
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <div className="page-container set-profile">
      <h1>Ваш профиль</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="set-profile__top-block flex-container">
          <SetAvatar file={file} setFile={setFile} />
          <div>
            <NameField formik={formik} isRequired />
            <SurnameField formik={formik} />
          </div>
        </div>
        <div className="set-profile__bottom-block flex-container">
          <PhoneField formik={formik} />
          <GroupField formik={formik} isRequired />
        </div>

        <div className="set-profile__buttons flex-container">
          <button tabIndex={-1} onClick={goBack} className="gray-button">
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
