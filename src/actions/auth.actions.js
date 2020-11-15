import { auth, firestore } from 'firebase';
import { authConstants } from './constants';

export const signup = (user) => {
  return async (dispatch) => {
    const db = firestore();

    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });

    auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(data => {
      console.log(data);
      const currentUser = auth().currentUser;
      const name = `${user.firstName} ${user.lastName}`;
      currentUser.updateProfile({
        displayName: name
      })
      .then(() => {
        // if you are means it is updated successfully
        db.collection('users').add({
          firstName: user.firstName,
          lastName: user.lastName,
          uid: data.user.uid,
          createdAt: new Date(),
          isOnline: true
        })
        .then(() => {
          // successfully
          const loggedInUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            uid: data.user.uid,
            email: user.email
          }
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          console.log('User logged in successfully!');
          dispatch({
            type: `${authConstants.USER_LOGIN}_SUCCESS`,
            payload: { user: loggedInUser }
          })
        })
        .catch(error => {
          console.log(error);
          dispatch({ 
            type: `${authConstants.USER_LOGIN}_FAILURE`,
            payload: { error }
          });
        })
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const signin = (user) => {
  return async dispatch => {
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST`});

    console.log(user);
    auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      console.log(data);

      const name = data.user.displayName.split(" ");
      const firstName = name[0];
      const lastName = name[1];

      const loggedInUser = {
        firstName,
        lastName,
        uid: data.user.uid,
        email: data.user.email
      }

      localStorage.setItem('user', JSON.stringify(loggedInUser));

      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user: loggedInUser }
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { err }
      })
    });
  }
}

export const isLoggedInUser = () => {
  return async dispatch => {
    const user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if(user) {
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user }
      })
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { error: 'You are not logged in' }
      })
    }

  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: `${authConstants.USER_LOGOUT}_REQUEST`
    });

    auth().signOut()
    .then(() => {
      localStorage.clear();
      dispatch({
        type: `${authConstants.USER_LOGOUT}_SUCCESS`
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: `${authConstants.USER_LOGOUT}_FAILURE`,
        payload: { err }
      })
    })
  }
}