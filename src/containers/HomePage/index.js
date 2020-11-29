import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './style.css';
import { getRealtimeUsers, updateMessage, getRealtimeConversations } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const User = (props) => {
  const { user, onClick } = props;

  return (
    <div onClick={() => onClick(user)} className="displayName">
        <div className="displayPic">
            <img src="https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account.jpg" alt="user-profile-img" />
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
            <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
            <span className={user.isOnline ? "onlineStatus" : "onlineStatus off"}></span>
        </div>
    </div>
  );
}

/**
* @author
* @function HomePage
**/

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
    .then(unsubscribe => {
      return unsubscribe;
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    return () => {
      // cleanup
      unsubscribe
      .then(f => f())
      .catch(error => {
        console.log(error)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(user);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);

    console.log(user);

    dispatch(getRealtimeConversations({
      uid_1: auth.uid,
      uid_2: user.uid
    }))
  }

  const submitMessage = (e) => {
    e.preventDefault();
    const msgObj = {
      id: Date.now(),
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }

    if(message !== "") {
      dispatch(updateMessage(msgObj))
      .then(() => {
        setMessage('')
      })
    }
  }

  return(
    <Layout>
    <section class="d-flex flex-wrap" style={{margin: 0}}>
      <div class="listOfUsers">

        {
          user.users.length > 0 ?
          user.users.map(user => {
            return (
              <User
                onClick={initChat}
                key={user.uid}
                user={user}
              />
            )
          }) : null
        }
      </div>
      <div class="chatArea">
        <div className="chatHeader">{ chatStarted ? chatUser : '' }</div>
        <div className="messageSections">
          {
            chatStarted ?
            user.conversations.map(conv => 
              <div key={conv.id} style={{ textAlign: conv.user_uid_1 === auth.uid ? 'right' : 'left' }}>
                  <p className="messageStyle" >{conv.message}</p>
              </div>            
            ) : null
          }
        </div>
        {
          chatStarted ? 
          <div className="chatControls">
            <form onSubmit={submitMessage}>
              <div class="form-group" style={{margin: 0}}>
                <div class="input-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    id="inlineFormInputGroupUsername" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write Message" />
                  <div class="input-group-prepend">
                    <div class="input-group-text">Send</div>
                  </div>
                </div>
              </div>
            </form>
          </div> : null
        }
      </div>
    </section>
    </Layout>
  )

}

export default HomePage