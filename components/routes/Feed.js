import React from 'react';
import {View, Text} from 'react-native';

const Feed = ({user}) => {
  return (
    <View>
      <Text>{user.username}</Text>
    </View>
  );
};

export default Feed;
