import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Home = ({route, navigation}) => {
  const user = route.params.user;

  return (
    <View style={styles.container}>
      <Text>
        Welcome, {user.firstName} {user.lastName} (@{user.username})
      </Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
