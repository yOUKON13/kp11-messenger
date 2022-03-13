import React, { useState } from 'react';

type PropTypes = {
  search: string;
  setSearch: (search: string) => void;
};

const ChatSearch: React.FC<PropTypes> = function ({ search, setSearch }) {
  const [ownSearch, setOwnSearch] = useState(search);

  function onChange(event: any) {
    setOwnSearch(event.target.value);
  }

  let typingTimer: any;
  const doneTypingInterval = 500;

  function onKeyUp() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  }

  function onKeyDown() {
    clearTimeout(typingTimer);
  }

  function doneTyping() {
    setSearch(ownSearch);
  }

  return (
    <div className="chats__chat-search flex-container">
      <span className="material-icons-outlined">search</span>
      <input
        value={ownSearch}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onChange={onChange}
        className="invisible-input"
        type="text"
        placeholder="Поиск"
      />
    </div>
  );
};

export default ChatSearch;
