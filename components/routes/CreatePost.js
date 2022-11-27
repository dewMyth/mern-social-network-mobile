import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextInput, Button, ProgressBar} from 'react-native-paper';

import {launchImageLibrary} from 'react-native-image-picker';

import GlobalState from '../../GlobalState';

import baseUrl from '../../baseUrl';

const CreatePost = ({}) => {
  const user = GlobalState.user;

  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [height, setHeight] = useState(0);
  const [imgThumbnailPath, setImgThumbnailPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Image Data
  const [uri, setUri] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const handleImageUpload = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      setImgThumbnailPath(response.assets[0].uri);
      setUri(response.assets[0].uri);
      setType(response.assets[0].type);
      setName(response.assets[0].fileName);
    });
  };

  const onSubmit = () => {
    if (imgThumbnailPath) {
      const data = new FormData();
      data.append('postImg', {
        uri: uri,
        type: type,
        name: name,
      });

      // Image upload
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      };

      fetch(baseUrl + '/upload', config).then(response => {
        return response.json().then(data => {
          const newPost = {
            description: description,
            img: data.imgPath,
            user: user._id,
          };
          console.log(newPost);
        });
      });
    } else {
      const newPost = {
        description: description,
        img: '',
        user: user._id,
      };
      console.log(newPost);
    }
  };

  return (
    <View style={styles.createPostContainer}>
      <View style={styles.textContainer}>
        <TextInput
          label={`Hi, ${user.firstName}?`}
          forceTextInputFocus={true}
          placeholder="What's on your mind?"
          value={description}
          mode="outlined"
          onChangeText={desc => setDescription(desc)}
          theme={{roundness: 15}}
          multiline={true}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
          style={{
            fontSize: 12,
            height: 150,
          }}
        />
      </View>
      <View style={styles.imageContainer}>
        <Button
          mode="contained"
          buttonColor="#da0037"
          onPress={handleImageUpload}>
          Add a image
        </Button>
        <Button mode="contained" buttonColor="#da0037" onPress={onSubmit}>
          Share Post
        </Button>
        <Image
          source={imgThumbnailPath ? {uri: imgThumbnailPath} : null}
          style={{width: 400, height: 400, resizeMode: 'cover'}}
        />
      </View>
    </View>
  );
};

const styles = {
  createPostContainer: {
    margin: 20,
    display: 'flex',
    flex: 1,
  },
  textContainer: {
    marginBottom: 10,
  },
  imageContainer: {
    marginTop: 20,
  },
};

export default CreatePost;
