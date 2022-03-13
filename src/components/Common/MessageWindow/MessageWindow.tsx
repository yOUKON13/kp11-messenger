import React, { useRef, useState } from 'react';
import '../../../styles/common/messageWindow.scss';

export interface IMessageWindow {
  isOpened?: boolean;
  toggleOpen: (state: boolean) => void;
  window?: React.Ref<HTMLDivElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => any;
  isScrollable?: boolean;
}

const MessageWindow: React.FC<IMessageWindow> = function ({
  isScrollable = false,
  onKeyDown,
  window,
  children,
  isOpened,
  toggleOpen,
}) {
  const [currentTarget, setCurrentTarget] = useState<EventTarget>(null);

  const windowBackground = useRef<HTMLDivElement>();

  function toggleWindow(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) {
    if (
      e.target === currentTarget &&
      currentTarget === windowBackground.current
    ) {
      toggleOpen(!isOpened);
    }
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  return (
    <div
      onKeyDown={e => {
        keyDownHandler(e);
      }}
      ref={windowBackground}
      onMouseDown={e => setCurrentTarget(e.target)}
      onMouseUp={toggleWindow}
      className={`message-window-wrapper content-center flex-container${
        isOpened ? ' active' : ''
      }${isScrollable ? ' scrollable' : ''}`}
    >
      <div ref={window} className="message-window relative">
        <div className="message-window__content">{children}</div>
      </div>
    </div>
  );
};

export default MessageWindow;
