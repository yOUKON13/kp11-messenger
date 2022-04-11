import { server } from '../../../../API/base';
import { getTimeString } from '../../../../utils/time';

type PropType = {
  senderName: string;
  senderSurname?: string;
  senderAvatar?: string;
  content: string;
  time: Date;
};

const FoundMessage: React.FC<PropType> = function ({ senderName, senderSurname, senderAvatar, content, time }) {
  return (
    <div className="flex-container found-message">
      <div className="found-message__avatar roundy-image">
        <img className="roundy-image" src={senderAvatar ? `${server}${senderAvatar}` : 'assets/avatar.png'} alt="" />
      </div>
      <div className="found-message__info">
        <p className="text-overflow found-message__sender">{senderName + ' ' + senderSurname}</p>
        <p className="text-overflow found-message__content">{content}</p>
      </div>

      <time>{getTimeString(time)}</time>
    </div>
  );
};

export default FoundMessage;
