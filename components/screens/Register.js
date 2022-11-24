import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

import GLOBAL_STATE from '../../GlobalState.js';

const Register = ({navigation}) => {
  const [user, setUser] = useState(null || GLOBAL_STATE.user);

  return (
    <View>
      <Text>Register</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}>
        Register
      </Button>
      {user ? <Text>{user.firstName}</Text> : <Text>Not logged in</Text>}
    </View>
  );
};

export default Register;
