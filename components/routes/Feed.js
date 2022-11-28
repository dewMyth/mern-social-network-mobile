import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';
import baseUrl from '../../baseUrl';

import Post from '../blocks/Post';

import Share from '../blocks/Share';

const Feed = ({user}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/post/timeline/${user._id}`);
      const data = await response.json();
      setPosts(
        data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }),
      );
      setIsLoading(false);
    };
    getUserPosts();
  }, [user]);

  return (
    <>
      <Share user={user} />
      <View
        style={{
          marginTop: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: 2,
        }}
      />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating={true} color="#da0037" size="large" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {posts.map(post => (
            <Post post={post} key={post._id} />
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 20,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default Feed;
