import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { AddUsersToChat } from '../../../../../../store/reducers/Chat/ChatUser/ChatUserReducer';

function useAddUserForm(
  chatId: string,
  usersId: Array<string>,
  close: Function,
  onSubmit: Function
) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => {
      if (usersId.length) {
        dispatch(AddUsersToChat(chatId, usersId));
        onSubmit();
        formik.resetForm();
        close();
      }
    },
  });

  return formik;
}

export default useAddUserForm;
