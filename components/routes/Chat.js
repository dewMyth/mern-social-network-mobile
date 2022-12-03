import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import {TextInput, Button} from 'react-native-paper';
import Message from '../blocks/Message';

import {useHeaderHeight} from '@react-navigation/elements';

import GlobalState from '../../GlobalState';

const Chat = ({route}) => {
  const {conversation, friend} = route.params;

  console.log('converse => ', conversation);

  const user = GlobalState.user;
  const socket = GlobalState.socket;

  const [messages, setMessages] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [msg, setMsg] = useState('');

  const height = useHeaderHeight();

  const scrollViewRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      try {
        fetch(baseUrl + '/message/get-messages/' + conversation?._id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }).then(response => {
          response.json().then(data => {
            setMessages(data);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [conversation]);

  useEffect(() => {
    socket.emit('addUser', user._id);
  }, [user]);

  // Receive message from socket server
  useEffect(() => {
    socket.on('getMessage', message => {
      console.log(message);
      setArrivalMessage({
        senderId: message.senderId,
        text: message.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      conversation?.members.includes(arrivalMessage.senderId) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  const handleSendMsg = async e => {
    e.preventDefault();

    if (msg.length > 0) {
      const newMsg = {
        conversationId: conversation._id,
        senderId: user._id,
        text: msg,
      };

      socket.emit('sendMessage', {
        senderId: user._id,
        receiverId: friend._id,
        text: msg,
      });

      await fetch(baseUrl + '/message/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMsg),
      }).then(response => {
        response
          .json()
          .then(data => {
            setMessages([...messages, data]);
            setMsg('');
          })
          .catch(err => console.log(err));
      });
    } else {
      alert('Please enter a message');
    }
  };

  return (
    <>
      <View style={styles.chatBoxContainer}>
        <ScrollView
          style={styles.chatBox}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {messages?.map(message => {
            return (
              <Message
                key={message._id}
                own={message.senderId === user._id ? true : false}
                message={message}
              />
            );
          })}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
        behavior="position"
        keyboardVerticalOffset={height - 300}>
        <View style={styles.chatBottom}>
          <View style={styles.textInput}>
            <TextInput
              label="Your Message"
              value={msg}
              mode="outlined"
              onChangeText={msg => setMsg(msg)}
            />
          </View>
          <View style={styles.sendBtn}>
            <Button
              icon="send"
              mode="contained"
              buttonColor="#da0037"
              onPress={e => handleSendMsg(e)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  chatBoxContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 55,
  },
  chatBottom: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 10,
  },
  textInput: {
    flex: 6,
    marginHorizontal: 10,
  },
  sendBtn: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default Chat;
