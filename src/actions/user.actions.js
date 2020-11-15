import { userConstants } from './constants';
import { firestore } from 'firebase';

export const getRealtimeUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: `${userConstants.GET_REALTIME_USERS}_REQUEST`
    });

    const db = firestore();
    db.collection('users')
    .onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach(function(doc) {
        users.push(doc.data());
      });
      // console.log(users);

      dispatch({
        type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
        payload: { users }
      })
    });

  }
}