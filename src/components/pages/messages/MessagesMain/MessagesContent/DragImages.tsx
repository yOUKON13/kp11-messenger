import { useDispatch, useSelector } from 'react-redux';
import { GetAttachments } from '../../../../../store/reducers/Chat/ChatMessage/ChatMessageSelector';
import { SetAttachments } from '../../../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';
import React, { useState } from 'react';

const DragImages: React.FC = function ({ children }) {
  const dispatch = useDispatch();
  const attachments = useSelector(GetAttachments);
  const [isDragging, setDragging] = useState(false);

  function OnDragStart(e: React.DragEvent<HTMLDivElement>) {
    setDragging(true);
    e.preventDefault();
  }

  function OnDragEnd(e: React.DragEvent<HTMLDivElement>) {
    setDragging(false);
    e.preventDefault();
  }

  return (
    <div
      onDrop={e => {
        OnDragEnd(e);
        dispatch(SetAttachments([...attachments, ...Array.from(e.dataTransfer.files)]));
      }}
      onDragEnter={OnDragStart}
      onDragOver={OnDragStart}
      onDragLeave={OnDragEnd}
      className={`${isDragging ? 'dragging ' : ''}flex-container drag-images`}
    >
      {children}
    </div>
  );
};

export default DragImages;
