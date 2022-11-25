import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import {Card, Avatar, TextInput, Button} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Share = ({user}) => {
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.profilePic}>
        <Avatar.Image
          size={40}
          source={{uri: 'https://i.imgur.com/AZr24sM.jpg'}}
        />
      </View>
      <View style={styles.descInput}>
        <TextInput
          label={`Hi, ${user.firstName}?`}
          placeholder="What's on your mind?"
          value={description}
          mode="outlined"
          onChangeText={desc => setDescription(desc)}
          theme={{roundness: 15}}
          style={{height: 40, fontSize: 12}}
        />
      </View>
      <View
        style={styles.uploadPhotoBtn}
        onPress={() => console.log('Upload Photo')}>
        <Image
          style={{width: 40, height: 40, marginLeft: 7}}
          source={{uri: 'https://i.imgur.com/LzCIALx.png'}}
        />
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    height: 60,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    flex: 1,
  },
  descInput: {
    flex: 4,
  },
  uploadPhotoBtn: {
    paddingLeft: 10,
    flex: 1,
  },
});

export default Share;
