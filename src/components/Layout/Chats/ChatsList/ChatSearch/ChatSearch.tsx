import React, { useState } from 'react';
import useSearch from '../../../../../hooks/useSearch/useSearch';

type PropType = {
  search: string;
  setSearch: (search: string) => void;
  placeholder?: string;
};

const ChatSearch: React.FC<PropType> = function ({ search, setSearch, placeholder }) {
  const [ownSearch, setOwnSearch] = useState(search);

  const [onKeyUp, onKeyDown] = useSearch(() => {
    setSearch(ownSearch);
  });

  function onChange(event: any) {
    setOwnSearch(event.target.value);
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
        placeholder={placeholder || `Поиск`}
      />
    </div>
  );
};

export default ChatSearch;
