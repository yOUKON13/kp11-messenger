import '../../../styles/common/toolbar.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from '../../../store/reducers/Auth/AuthReducer';

function Toolbar() {
  const [isMaximized, setMaximized] = useState(false);

  function close() {
    window.Main.sendMessage('close');
  }

  function minimize() {
    window.Main.sendMessage('minimize');
  }

  function maximize() {
    window.Main.sendMessage('maximize');
    setMaximized(!isMaximized);
  }

  window.Main.on('resize', (value: boolean) => {
    setMaximized(value);
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Auth());
  }, []);

  return (
    <div className="toolbar flex-container">
      <h2>KP №11 Messenger</h2>
      <div className="toolbar__actions flex-container">
        <button onClick={minimize} className="invisible-button flex-container">
          <i className="fa-solid fa-minus" />
        </button>
        <button onClick={maximize} className="invisible-button flex-container">
          {isMaximized ? (
            <i className="fa-solid fa-compress" />
          ) : (
            <i className="fa-solid fa-expand" />
          )}
        </button>
        <button
          onClick={close}
          className="invisible-button close-btn flex-container"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
