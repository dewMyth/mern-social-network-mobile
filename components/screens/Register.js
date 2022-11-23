import React from 'react';
import {View, Text, Button} from 'react-native';

const Register = ({navigation}) => {
  console.log(navigation);
  return (
    <View>
      <Text>Register</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}>
        Register
      </Button>
    </View>
  );
};

export default Register;
