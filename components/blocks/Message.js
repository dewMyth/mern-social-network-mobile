import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {timeAgo} from '../../helpers/timeAgo';

const Message = ({own, message}) => {
  return (
    <View style={own ? styles.messageOwn : styles.message}>
      <View style={own ? styles.messageOwnText : styles.messageText}>
        <Text style={own ? styles.msgOwnBody : styles.msgBody}>
          {message.text}
        </Text>
        <Text style={own ? styles.msgOwnTime : styles.msgTime}>
          {timeAgo(new Date(message.createdAt))}
        </Text>
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
});

export default Message;
