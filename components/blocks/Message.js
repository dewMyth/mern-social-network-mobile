import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const Message = ({own}) => {
  return (
    <View style={own ? styles.messageOwn : styles.message}>
      <View style={own ? styles.messageOwnText : styles.messageText}>
        <Text style={own ? styles.msgOwnBody : styles.msgBody}>Helloooo</Text>
        <Text style={own ? styles.msgOwnTime : styles.msgTime}>9:08 PM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },

  messageOwn: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },

  messageText: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#da0037',
  },

  messageOwnText: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
  },

  msgBody: {
    color: 'white',
  },

  msgOwnBody: {
    color: 'black',
  },

  msgOwnTime: {
    fontSize: 8,
    color: 'gray',
    textAlign: 'right',
  },

  msgTime: {
    fontSize: 8,
    color: 'white',
    textAlign: 'right',
  },

  // messageWwn .messageText {
  //     background-color: rgb(245, 241, 241);
  //     color: black;
  // }
});

export default Message;
