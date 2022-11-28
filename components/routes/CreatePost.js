import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextInput, Button, ProgressBar} from 'react-native-paper';

import {launchImageLibrary} from 'react-native-image-picker';

import GlobalState from '../../GlobalState';

import baseUrl from '../../baseUrl';

const CreatePost = ({navigation}) => {
  const user = GlobalState.user;

  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
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

  const onSubmit = async () => {
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

      await fetch(baseUrl + '/upload', config).then(response => {
        return response.json().then(data => {
          const newPost = {
            desc: description,
            img: data.imgPath,
            userId: user._id,
          };
          console.log(newPost);

          // Post upload
          fetch(baseUrl + '/post/create', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
          }).then(response => {
            return response
              .json()
              .then(data => {
                alert('Post created successfully');
                setTimeout(() => {
                  navigation.navigate('Home');
                }, 5000);
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      });
    }

    // Post upload without image
    if (!imgThumbnailPath) {
      const newPost = {
        desc: description,
        img: '',
        userId: user._id,
      };
      console.log(newPost);

      // Post upload
      fetch(baseUrl + '/post/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      }).then(response => {
        return response
          .json()
          .then(data => {
            alert('Post created successfully');
            setTimeout(() => {
              navigation.navigate('Home');
            }, 5000);
          })
          .catch(err => {
            console.log(err);
          });
      });
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
        />
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.addImageBtn}>
          <Button
            mode="contained"
            buttonColor="#da0037"
            onPress={handleImageUpload}>
            Add an image
          </Button>
        </View>
        {imgThumbnailPath ? (
          <View style={styles.imgView}>
            <Image
              source={imgThumbnailPath ? {uri: imgThumbnailPath} : null}
              style={{
                width: 350,
                height: 350,
                resizeMode: 'cover',
                borderRadius: 10,
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              }}
            />
          </View>
        ) : null}

        <View style={styles.addShareBtn}>
          <Button mode="contained" buttonColor="#da0037" onPress={onSubmit}>
            Share Post
          </Button>
        </View>
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
    display: 'flex',
    gap: 10,
  },

  addImageBtn: {
    marginBottom: 10,
  },

  addShareBtn: {
    marginTop: 10,
  },
};

export default CreatePost;
