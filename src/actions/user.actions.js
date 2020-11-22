import { userConstants } from './constants';
import { firestore } from 'firebase';
import { connectAdvanced } from 'react-redux';

export const getRealtimeUsers = (uid) => {
  return async dispatch => {
    dispatch({
      type: `${userConstants.GET_REALTIME_USERS}_REQUEST`
    });

    const db = firestore();
    const unsubscribe = db.collection('users')
    // .where("uid", "!=", uid)
    .onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach(function(doc) {
        if(doc.data().uid != uid) {
          users.push(doc.data());
        }
      });
      // console.log(users);

      dispatch({
        type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
        payload: { users }
      })
    });

    return unsubscribe;

  }
}

export const updateMessage = (msgObj) => {
  return async dispatch => {

    const db = firestore();
    db.collection('conversations')
    .add({
      ...msgObj,
      isView: false,
      createdAt: new Date()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })

  }
}

export const getRealtimeConversations = (user) => {
  return async dispatch => {
    
    const db = firestore();
    db.collection('conversations')
    //user_uid_1 = 'my_id' and user_uid_2 = 'your_id' OR user_uid_1 = 'your_id' and user_uid_2 = 'my_id'
    .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
    .orderBy('createdAt', 'asc') 
    .onSnapshot((querySnapshot) => {
    
      const conversations = [];

      querySnapshot.forEach(doc => {

        if(
          (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
          ||
          (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
        ) {      
          conversations.push(doc.data())
        } 

        if(conversations.length > 0) {
          dispatch({
            type: userConstants.GET_REALTIME_MESSAGES,
            payload: { conversations }
          })
        } else {
          dispatch({
            type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
            payload: { conversations }
          })
        }

      })

      console.log(conversations);
    })
  }
}