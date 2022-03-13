import { Link, useHistory } from 'react-router-dom';
import '../../../styles/pages/home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Auth } from '../../../store/reducers/Auth/AuthReducer';
import Loader from '../../Common/Loader/Loader';
import useAuth from '../../../hooks/useAuth';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';

function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector(GetLoadingStatus);

  useAuth();

  useEffect(() => {
    dispatch(Auth());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home flex-container">
      <div
        className="home__bg"
        style={{ backgroundImage: 'url(./assets/phone.png)' }}
      ></div>
      <div className="home__text">
        <h1>Добро пожаловать!</h1>
        <p className="home__main-text">
          Это месседжер, созданный для связи между учителями и студентами
          <span className="gradient-text">
            {' '}
            Колледжа Предпринимательства №11{' '}
          </span>
          Сделан для проекта по исследовательской и проектной деятельности.
        </p>
        <p>Разработчики:</p>
        <ul>
          <li>Кукунов Олег</li>
          <li>Годунов Антон</li>
          <li>Атаев Магамар</li>
        </ul>
        <div className="flex-container home__links">
          <Link className="button gray-button" to="/login">
            Вход
          </Link>
          <Link className="button" to="/register">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
