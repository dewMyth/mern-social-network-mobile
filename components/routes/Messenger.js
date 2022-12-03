import React, {useState, useEffect, useRef} from 'react';

import io from 'socket.io-client';

import {View, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import {
  TextInput,
  Avatar,
  Image,
  Text,
  FAB,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';
import baseUrl from '../../baseUrl';

import GlobalState from '../../GlobalState';

import Conversation from '../blocks/Conversation';
import CreateConversationModal from '../blocks/CreateConversationModal';

const Messenger = () => {
  const user = GlobalState.user;

  const [visible, setVisible] = useState(false);
  const [friends, setFriends] = useState([]);

  const [conversations, setConversations] = useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    // ws://vast-hollows-04909.herokuapp.com
    const socket = io('ws://192.168.1.5:5000');
    GlobalState.socket = socket;
  }, []);

  useEffect(() => {
    const getAllConversations = async () => {
      await fetch(baseUrl + '/conversation/get-conversations/' + user._id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        response.json().then(data => {
          console.log('conversations => ', data.length);
          if (data.length > 0) {
            setConversations(data);
          }
        });
      });
    };
    getAllConversations();
  }, [user]);

  useEffect(() => {
    const getAllFriends = async () => {
      await fetch(baseUrl + '/user/followings/' + user._id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        return response.json().then(data => {
          setFriends(data);
        });
      });
    };
    getAllFriends();
  }, [user]);

  return (
    <>
      <Provider>
        {/* Create Conversation Modal */}
        {visible && (
          <CreateConversationModal
            visible={visible}
            hideModal={hideModal}
            friends={friends}
          />
        )}

        {/* End Create Conversation Modal */}

        <View style={styles.container}>
          <View>
            <TextInput
              mode="outlined"
              label="Search a Message"
              placeholder="Search a Message"
              theme={{roundness: 30}}
            />
          </View>
          <View style={styles.conversationContainer}>
            {conversations.length > 0 &&
              conversations.map(conversation => {
                return (
                  <Conversation
                    key={conversation._id}
                    conversation={conversation}
                  />
                );
              })}
          </View>
        </View>

        <FAB icon="plus" color="white" style={styles.fab} onPress={showModal} />
      </Provider>
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

  friend: {
    display: 'flex',
    margin: 10,
  },
});

export default Messenger;
