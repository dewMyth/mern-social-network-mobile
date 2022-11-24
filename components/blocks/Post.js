import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ToggleButton,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';

import {timeAgo} from '../../helpers/timeAgo';

import storage from '@react-native-firebase/storage';

const Post = ({post}) => {
  const [status, setStatus] = useState('checked');
  const [icon, setIcon] = useState('heart-outline');

  const [imagePathFromFS, setImagePathFromFS] = useState(null);

  const [poster, setPoster] = useState({});

  const onButtonToggle = value => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
    setIcon(status === 'checked' ? 'heart-outline' : 'cards-heart');
  };

  useEffect(() => {
    const getPoster = async () => {
      const response = await fetch(
        `https://vast-hollows-04909.herokuapp.com/api/user?userId=${post.userId}`,
      );
      const data = await response.json();
      setPoster(data);
    };
    getPoster();
  }, [post]);

  useEffect(() => {
    const getImageFromFSStorage = async () => {
      console.log(post.img);

      //BUG FIX
      const imagePath = post.img?.replace(/"([^"]+(?="))"/g, '$1');
      //END BUG FIX

      if (imagePath) {
        const url = await storage().ref(imagePath).getDownloadURL();
        setImagePathFromFS(url);
        console.log(url);
      } else {
        setImgPathfromFS('');
      }
    };
    getImageFromFSStorage();
  }, [post]);

  return (
    <>
      <Card style={styles.card} key={post._id}>
        <Card.Title
          title={poster.firstName + ' ' + poster.lastName}
          subtitle={timeAgo(new Date(post.createdAt))}
          left={props => <Avatar.Icon {...props} icon="account" />}
        />
        <View style={styles.content}>
          <Card.Content>
            <Paragraph>{post.desc}</Paragraph>
          </Card.Content>
          <Card.Cover source={{uri: imagePathFromFS}} />
          <ToggleButton
            icon={icon}
            value="heart"
            status={status}
            onPress={onButtonToggle}
            size={30}
            style={styles.toggleButton}
          />
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 10,
  },

  loader: {
    flex: 1,
    backgroundColor: 'red',
  },
  card: {
    margin: 10,
  },
  content: {
    padding: 10,
  },
  toggleButton: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
});

export default Post;
