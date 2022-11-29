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

  const user = GlobalState.user;

  const [messages, setMessages] = useState([]);

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

  const handleSendMsg = async e => {
    e.preventDefault();

    if (msg.length > 0) {
      const newMsg = {
        conversationId: conversation._id,
        senderId: user._id,
        text: msg,
      };
      await fetch(baseUrl + '/message/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMsg),
      }).then(response => {
        response.json().then(data => {
          console.log('response after successful msg -> ', data);
          console.log([...messages, data]);
          setMessages([...messages, data]);
          setMsg('');
        });
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
            console.log(message);
            return (
              <Message
                own={message.senderId === user._id ? true : false}
                message={message}
                key={message._id}
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
