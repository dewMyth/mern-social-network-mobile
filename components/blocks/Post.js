import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';

import GLOBAL_STATE from '../../GlobalState';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Avatar,
  Card,
  Paragraph,
  ToggleButton,
  Button,
  Text,
} from 'react-native-paper';

import storage from '@react-native-firebase/storage';
import {timeAgo} from '../../helpers/timeAgo';

const Post = ({post}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(post.likes.length);

  const [imagePathFromFS, setImagePathFromFS] = useState(null);

  const [poster, setPoster] = useState({});

  useEffect(() => {
    setIsLiked(post.likes.includes(GLOBAL_STATE.user._id));
    console.log(post.likes.includes(GLOBAL_STATE.user._id));
  }, [GLOBAL_STATE, post.likes]);

  const onLikeToggle = async () => {
    const newLikedUser = {
      userId: GLOBAL_STATE.user._id,
    };

    await fetch(
      'https://vast-hollows-04909.herokuapp.com/api/post/' + post._id + '/like',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLikedUser),
      },
    )
      .then(response => {
        console.log(response);
        setIsLiked(!isLiked);
        setLike(isLiked ? like - 1 : like + 1);
      })
      .catch(error => {
        console.log(error);
      });
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
        {/* Avatar and Title */}
        <View style={styles.upperContainer}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={40}
              source={{uri: 'https://i.imgur.com/AZr24sM.jpg'}}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text variant="titleMedium">
              {poster.firstName + ' ' + poster.lastName}
            </Text>
            <Text variant="labelMedium" style={{color: 'gray'}}>
              {timeAgo(new Date(post.createdAt))}
            </Text>
          </View>
        </View>
        {/* Avatar and Title */}

        {/* Description & Image  */}
        <View style={styles.content}>
          <Card.Content style={{marginBottom: 3, marginTop: 5}}>
            <Paragraph>{post.desc}</Paragraph>
          </Card.Content>
          <Image
            source={{uri: imagePathFromFS}}
            style={{width: 400, height: 400, resizeMode: 'cover'}}
          />
        </View>

        {/* Description & Image  */}

        {/* No. of Likes & Comments */}

        <View style={styles.detailContainer}>
          <MaterialCommunityIcons size={15} color="#da0037" name="heart" />
          <Text variant="labelSmall" style={{marginLeft: 5, color: 'gray'}}>
            {like} likes
          </Text>
          <Text variant="labelSmall" style={{marginLeft: 25, color: 'gray'}}>
            45 Comments
          </Text>
        </View>
        {/* No. of Likes & Comments */}

        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
        />

        {/* Like & Comment Buttons */}
        <View style={styles.actionContainer}>
          <View>
            <MaterialCommunityIcons
              size={25}
              color={isLiked ? '#da0037' : 'gray'}
              name={isLiked ? 'heart' : 'heart-outline'}
              onPress={() => onLikeToggle()}
            />
          </View>
          <View>
            <MaterialCommunityIcons size={25} name="comment-outline" />
          </View>
        </View>
        {/* Like & Comment Buttons */}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
  },

  avatarContainer: {
    flex: 1,
  },

  titleContainer: {
    flex: 5,
  },

  loader: {
    flex: 1,
    backgroundColor: 'red',
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
  },

  toggleButton: {
    position: 'absolute',
    top: 35,
    right: 12,
  },

  bottomContainer: {
    margin: 10,
  },

  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    margin: 10,
  },

  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});

export default Post;
