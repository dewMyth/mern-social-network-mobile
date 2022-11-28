import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Avatar, Image, Text} from 'react-native-paper';

import GlobalState from '../../GlobalState';

import {timeAgo} from '../../helpers/timeAgo';

const Conversation = ({conversation}) => {
  console.log(conversation);
  const user = GlobalState.user;
  const [friend, setFriend] = useState(null);
  const [lastMsg, setLastMsg] = useState(null);

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
            setFriend(data);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [conversation, user]);

  useEffect(() => {
    const getLastMessage = async () => {
      try {
        await fetch(baseUrl + '/message/get-messages/' + conversation._id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }).then(response => {
          response.json().then(data => {
            // console.log('msgs from =>', data[data.length - 1].text);
            setLastMsg(data[data.length - 1].text);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getLastMessage();
  }, [conversation]);

  return (
    <>
      <TouchableOpacity style={styles.conversationContainer}>
        {friend && (
          <>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={40}
                source={
                  friend.profilePicture
                    ? {uri: friend.profilePicture}
                    : {uri: 'https://i.imgur.com/AZr24sM.jpg'}
                }
              />
            </View>
            <View style={styles.titleContainer}>
              <Text variant="titleMedium">
                {friend.firstName + ' ' + friend.lastName}
              </Text>
              <Text variant="labelMedium" style={{color: 'gray'}}>
                {lastMsg ? lastMsg : 'No messages yet...'}
                {/* {timeAgo(new Date(conversation.updatedAt))} */}
              </Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  conversationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    flex: 1,
  },

  titleContainer: {
    flex: 5,
  },
});

export default Conversation;
