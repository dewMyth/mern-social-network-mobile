import React from 'react';
import {View, StyleSheet, Button, StatusBar} from 'react-native';

import {BottomNavigation, Text, Appbar} from 'react-native-paper';
import GlobalState from '../../GlobalState';

import Feed from '../routes/Feed';

const Home = ({route, navigation}) => {
  const user = GlobalState.user;

  const feedRoute = () => <Feed user={user} />;

  const FriendsRoute = () => <Text>Friends</Text>;

  const ProfileRoute = () => <Text>Profile</Text>;

  const NotificationsRoute = () => <Text>Notifications</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'feed',
      title: 'Feed',
      focusedIcon: 'post',
      unfocusedIcon: 'post-outline',
      color: '#2962ff',
      badge: true,
    },
    {
      key: 'friends',
      title: 'Friends',
      focusedIcon: 'account-supervisor',
      unfocusedIcon: 'account-supervisor-outline',
    },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
      badge: true,
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: feedRoute,
    friends: FriendsRoute,
    notifications: NotificationsRoute,
    profile: ProfileRoute,
  });

  return (
    <>
      <StatusBar barStyle="default" backgroundColor="#171717" />
      <Appbar.Header elevated={true} style={styles.appBar}>
        <Appbar.Content color="#da0037" title="The Social App" />
        <Appbar.Action color="#da0037" icon="magnify" onPress={() => {}} />
        <Appbar.Action
          color="#da0037"
          icon="android-messages"
          onPress={() => navigation.navigate('Messenger')}
        />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        sceneAnimationEnabled={true}
        barStyle={{backgroundColor: '#171717'}}
        inactiveColor="#da0037"
        activeColor="#da0037"
        labeled={false}
      />
    </>

    // <View style={styles.container}>
    //   <Text>
    //     Welcome, {user.firstName} {user.lastName} (@{user.username})
    //   </Text>
    //   <Button
    //     title="Register"
    //     onPress={() => navigation.navigate('Register')}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBar: {
    backgroundColor: '#171717',
    textColor: '#ffffff',
  },
});

export default Home;
