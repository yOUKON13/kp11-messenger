import Navbar from '../../Layout/Navbar/Navbar';
import '../../../styles/pages/profile.scss';

import Input from '../../Common/Inputs/Input';
import SetAvatar from '../../Common/Inputs/SetAvatar';
import NameField from '../set-profile/NameField/NameField';
import SurnameField from '../set-profile/SurnameField/SurnameField';
import EmailField from '../register/EmailField/EmailField';
import PhoneField from '../set-profile/PhoneField/PhoneField';
import GroupField from '../set-profile/GroupField/GroupField';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetUser } from '../../../store/reducers/Auth/AuthSelector';
import { useEffect, useState } from 'react';
import { User } from '../../../types/User';
import useProfileForm from './useProfileForm';
import Loader from '../../Common/Loader/Loader';

function Profile() {
  const user = useSelector(GetUser);
  const [file, setFile] = useState<File>();

  const formik = useProfileForm(file!);

  useEffect(() => {
    if (user) {
      Object.keys(formik.values).forEach(key => {
        if (user[key as keyof User]) {
          formik.setFieldValue(key, user[key as keyof User]);
        }
      });
    }
  }, [user]);

  return (
    <div className="main profile flex-container">
      <Navbar />
      <div className="profile__container flex-container">
        {user ? (
          <form onSubmit={formik.handleSubmit}>
            <h1>Ваш профиль</h1>
            <div className="profile__top-block flex-container">
              <SetAvatar file={file!} setFile={setFile} link={user.avatar} />
              <div>
                <NameField formik={formik} />
                <SurnameField formik={formik} />
              </div>
            </div>
            <div className="profile__bottom-block">
              <EmailField formik={formik} />
              <div className="profile__bottom-block-flex flex-container">
                <PhoneField formik={formik} />
                <GroupField formik={formik} />
              </div>
            </div>

            <div className="profile__change-password">
              <p>Изменить пароль:</p>
              <div className="profile__change-password-inputs flex-container">
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                  error={formik.errors.currentPassword}
                  touched={formik.touched.currentPassword}
                  name="currentPassword"
                  placeholder="Текущий пароль"
                >
                  <i className="fa-solid fa-key" />
                </Input>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  error={formik.errors.newPassword}
                  touched={formik.touched.newPassword}
                  name="newPassword"
                  placeholder="Новый пароль"
                >
                  <i className="fa-solid fa-key" />
                </Input>
              </div>
            </div>

            <div className="profile__buttons flex-container">
              <button type="submit">Сохранить</button>
              <Link to="/main" className="button gray-button invisible-link">
                К сообщениям
              </Link>
            </div>
          </form>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Profile;
