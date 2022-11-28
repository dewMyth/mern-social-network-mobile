import React from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

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

import {useNavigation} from '@react-navigation/native';

const CreateConversationModal = ({visible, hideModal, friends}) => {
  console.log('friends from create convs Modal => ', friends);

  const navigation = useNavigation();

  const createConversation = async friendId => {
    await fetch(baseUrl + '/conversation/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: user._id,
        receiverId: friendId,
      }),
    }).then(response => {
      return response.json().then(data => {
        navigation.navigate('Chat', {conversation: data});
      });
    });
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <Text>Select a Friend to Start a Conversation...</Text>
          {friends.map(friend => {
            return (
              <TouchableOpacity
                onPress={() => createConversation(friend._id)}
                key={friend._id}>
                <View style={styles.conversationContainer}>
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
                      {friend.firstName} {friend.lastName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          {/* Friend List */}
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
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
});

export default CreateConversationModal;
