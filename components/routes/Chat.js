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
            if (data.length > 0) {
              setMessages(data);
            }
          });
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [conversation]);

  const handleSendMsg = async () => {
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
        setMessages([...messages, data]);
      });
    });
  };

  return (
    console.log(messages),
    (
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
                onPress={handleSendMsg}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    )
  );
};

const styles = StyleSheet.create({
  chatBoxContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
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
