import { useDispatch, useSelector } from 'react-redux';
import { GetAttachments } from '../../../../../store/reducers/Chat/ChatMessage/ChatMessageSelector';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SetAttachments } from '../../../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';
import MessageAttachment from './MessageAttachment/MessageAttachment';

function MessageAttachments() {
  const attachments = useSelector(GetAttachments);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(SetAttachments([]));
  }, [id]);

  return (
    <div className="message-attachments flex-container">
      {attachments.map((attachment, i) => (
        <MessageAttachment key={i} index={i} attachment={attachment} />
      ))}
    </div>
  );
}

export default MessageAttachments;
