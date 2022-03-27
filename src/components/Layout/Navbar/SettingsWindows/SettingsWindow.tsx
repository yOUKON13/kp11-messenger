import MessageWindow from '../../../Common/MessageWindow/MessageWindow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../../store/reducers/Auth/AuthSelector';
import '../../../../styles/common/settings.scss';
import { Link } from 'react-router-dom';
import Checkbox from '../../../Common/Inputs/Checkbox';
import {
  GetBackground,
  GetLanguage,
  GetSounds,
  GetTheme,
} from '../../../../store/reducers/Settings/SettingsSelector';
import {
  SaveSettings,
  SettingsActions,
} from '../../../../store/reducers/Settings/SettingsReducer';
import DroppingList from '../../../Common/DroppingList/DroppingList';
import RadioButton from '../../../Common/Inputs/RadioButton/RadioButton';
import { server } from '../../../../API/base';

type PropType = {
  isOpened?: boolean;
  toggleOpen: (state: boolean) => void;
};

const SettingsWindow: React.FC<PropType> = function ({ isOpened, toggleOpen }) {
  const dispatch = useDispatch();

  const [isLanguagesListShowing, setLanguagesListShowing] = useState(false);
  const user = useSelector(GetUser);
  const theme = useSelector(GetTheme);
  const sounds = useSelector(GetSounds);
  const language = useSelector(GetLanguage);
  const background = useSelector(GetBackground);

  useEffect(() => {
    dispatch(SaveSettings());
  }, [theme, sounds, language, background]);

  function setTheme() {
    dispatch(SettingsActions.setTheme(!theme));
  }

  function setSounds() {
    dispatch(SettingsActions.setSounds(!sounds));
  }

  function showLanguages() {
    setLanguagesListShowing(!isLanguagesListShowing);
  }

  function handleLanguageChange(event) {
    dispatch(SettingsActions.setLanguage(event.target.value));
  }

  return (
    <MessageWindow toggleOpen={toggleOpen} isOpened={isOpened}>
      <div className="settings flex-container">
        <div className="flex-container settings__avatar">
          <img
            className="roundy-image"
            src={
              user?.avatar ? `${server}${user?.avatar}` : 'assets/avatar.png'
            }
            alt=""
          />
        </div>
        <div className="flex-container settings__user-data">
          <p>{user?.name + ' ' + user?.surname}</p>
          <Link to="/profile" className="invisible-link animated-button">
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </Link>
        </div>
        <div className="settings__block flex-container">
          <i className="fa-solid fa-moon settings__block-left" />
          <p>Темная тема</p>
          <div className="settings__block-right">
            <Checkbox
              isChecked={theme}
              setChecked={setTheme}
              className="sliding-checkbox"
            />
          </div>
        </div>
        <div className="settings__block flex-container">
          <i className="fa-solid fa-volume settings__block-left" />
          <p>Звук</p>
          <div className="settings__block-right">
            <Checkbox
              isChecked={sounds}
              setChecked={setSounds}
              className="sliding-checkbox"
            />
          </div>
        </div>
        <div className="settings__block flex-container">
          <i className="fa-regular fa-globe settings__block-left" />
          <p>Язык</p>
          <button
            onClick={showLanguages}
            className="invisible-button animated-button settings__block-right"
          >
            <i className="fa-regular fa-angle-right" />
          </button>
          <DroppingList isShowing={isLanguagesListShowing}>
            <div className="settings__language flex-container">
              <p>Русский</p>
              <RadioButton
                name="language"
                onChange={handleLanguageChange}
                value="russian"
                currentValue={language}
              />
            </div>
            <div className="settings__language flex-container">
              <p>English</p>
              <RadioButton
                name="language"
                onChange={handleLanguageChange}
                value="english"
                currentValue={language}
              />
            </div>
          </DroppingList>
        </div>
        <div className="settings__block flex-container">
          <i className="fa-regular fa-image settings__block-left" />
          <p>Задний фон</p>
          <button className="invisible-button animated-button settings__block-right">
            <i className="fa-regular fa-paperclip" />
          </button>
        </div>

        <p className="settings__bottom">KP №11 Messenger</p>
      </div>
    </MessageWindow>
  );
};

export default SettingsWindow;
