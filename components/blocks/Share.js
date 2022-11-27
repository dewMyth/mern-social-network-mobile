import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Avatar, TextInput} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';

const Share = ({user}) => {
  const navigation = useNavigation();

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
          mode="outlined"
          onChangeText={desc => setDescription(desc)}
          theme={{roundness: 15}}
          style={{height: 40, fontSize: 12}}
          forceTextInputFocus={true}
        />
      </View>
      <View style={styles.uploadPhotoBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <Image
            style={{width: 40, height: 40, marginLeft: 7}}
            source={{uri: 'https://i.imgur.com/LzCIALx.png'}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreatePost', {
              user: user,
            })
          }>
          <MaterialCommunityIcons
            name="share-circle"
            color="#da0037"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 10,
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
    flex: 1,
  },
  submitBtn: {
    flex: 1,
  },
});

export default Share;
