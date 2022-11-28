import React from 'react';
import {View, Text} from 'react-native';

const Chat = ({route}) => {
  const {conversation} = route.params;
  return (
    <View>
      <Text>{JSON.stringify(conversation)}</Text>
    </View>
  );
};

export default Chat;
