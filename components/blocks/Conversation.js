import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Avatar, Image} from 'react-native-paper';

import GlobalState from '../../GlobalState';

const Conversation = ({conversation}) => {
  const user = GlobalState.user;
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(friend => friend !== user._id);
    const getFriend = async () => {
      try {
        await fetch(baseUrl + '/user?userId=' + friendId, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }).then(response => {
          return response.json().then(data => {
            console.log(data);
            setFriend(data);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [conversation, user]);

  return (
    <>
      <TouchableOpacity>
        <Text>Conversation List Render Here</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    margin: 20,
  },

  conversationList: {
    display: 'flex',
    marginVertical: 20,
    flex: 1,
  },

  conversationContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },

  avatarContainer: {
    flex: 1,
  },

  titleContainer: {
    flex: 5,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#da0037',
  },

  modal: {
    display: 'flex',
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
  },

  friend: {
    display: 'flex',
    margin: 10,
  },
});

export default Conversation;
