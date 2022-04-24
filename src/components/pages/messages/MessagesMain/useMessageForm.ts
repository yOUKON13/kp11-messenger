import { useFormik } from 'formik';
import { maxLength, removeEmptyValidators, required, trimAll, validate } from '../../../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentChat } from '../../../../store/reducers/Chat/ChatSelector';
import { SendMessage } from '../../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';
import { GetAttachments } from '../../../../store/reducers/Chat/ChatMessage/ChatMessageSelector';

function useMessageForm() {
  const dispatch = useDispatch();
  const currentChat = useSelector(GetCurrentChat);
  const attachments = useSelector(GetAttachments);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: values => {
      if (values.content || attachments.length) {
        dispatch(SendMessage(values.content, currentChat?._id || ''));
        formik.resetForm();
      }
    },

    validate: values => {
      trimAll(values);
      const error: any = {};

      error.message = validate(values.content, [maxLength(2048)]);
      removeEmptyValidators(error);

      return error;
    },
  });

  return formik;
}

export default useMessageForm;
