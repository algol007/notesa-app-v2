import { auth, firestore } from 'firebase';

export const signup = (user) => {
  return async (dispatch) => {
    const db = firestore();

    dispatch({ type: `${auth.Constants.USER_LOGIN}_REQUEST` });

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
          createdAt: new Date()
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
            type: `${auth.Constants.USER_LOGIN}_SUCCESS`,
            payload: { user: loggedInUser }
          })
        })
        .catch(error => {
          console.log(error);
          dispatch({ 
            type: `${auth.Constants.USER_LOGIN}_FAILURE`,
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