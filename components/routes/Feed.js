import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';

import Post from '../blocks/Post';

import Share from '../blocks/Share';

const Feed = ({user}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://vast-hollows-04909.herokuapp.com/api/post/timeline/${user._id}`,
      );
      const data = await response.json();
      setPosts(data);
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
      <ScrollView style={styles.container}>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator animating={true} color="#da0037" />
          </View>
        ) : (
          posts.map(post => <Post post={post} key={post._id} />)
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 20,
  },

  loader: {
    flex: 1,
  },
});

export default Feed;
