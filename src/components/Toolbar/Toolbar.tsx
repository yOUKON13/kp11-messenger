import '../../styles/toolbar.scss';
import { useState } from 'react';

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

  return (
    <div className="toolbar flex-container">
      <h2>KP-11 Messenger</h2>
      <div className="toolbar__actions flex-container">
        <button onClick={minimize} className="invisible-button flex-container">
          <span className="material-icons">remove</span>
        </button>
        <button onClick={maximize} className="invisible-button flex-container">
          <span className="material-icons">
            {isMaximized ? 'fullscreen_exit' : 'fullscreen'}
          </span>
        </button>
        <button
          onClick={close}
          className="invisible-button close-btn flex-container"
        >
          <span className="material-icons">close</span>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
