import { Link } from 'react-router-dom';

type PropType = {
  id: string;
  imgUrl?: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: Date;
};

const Chat: React.FC<PropType> = function ({
  id,
  imgUrl,
  name,
  lastMessage,
  lastMessageTime,
}) {
  function onClick(event: Event) {
    console.log(228);
    event.stopPropagation();
  }

  return (
    <div className="chats__chat">
      <Link to={`/messages/${id}`} className="invisible-button  flex-container">
        <img src={imgUrl || 'assets/avatar.png'} alt="" />
        <div className="chat__info">
          <p className="chat__name">{name}</p>
          {lastMessage && <p className="chat__last-message">{lastMessage}</p>}
        </div>
        <div className="chat__right flex-container">
          {lastMessageTime && (
            <time>{lastMessageTime!.toLocaleTimeString().substr(0, 5)}</time>
          )}
          <button onClick={onClick} className="invisible-button">
            <i className="fa-regular fa-xmark" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Chat;
