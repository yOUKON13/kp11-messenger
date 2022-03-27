import MessageField from './MessageField/MessageField';
import useMessageForm from './useMessageForm';
import MessageHeader from './MessageHeader/MessageHeader';
import MessagesContent from './MessagesContent/MessagesContent';

function MessagesMain() {
  const formik = useMessageForm();

  return (
    <div className="messages__main flex-container">
      <div className="messages__message-area flex-container">
        <MessageHeader />
        <MessagesContent />
      </div>
      <div className="messages__actions">
        <form onSubmit={formik.handleSubmit} className="flex-container">
          <button
            className="invisible-button animated-button"
            type="button"
            tabIndex={-1}
          >
            <i className="fa-solid fa-paperclip" />
          </button>
          <MessageField formik={formik} />
          <button type="submit" className="invisible-button animated-button">
            <i className="fa-regular fa-paper-plane-top" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessagesMain;
