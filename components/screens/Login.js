import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  TextInput,
  Button,
  useTheme,
  MD3LightTheme as DefaultTheme,
  Text,
} from 'react-native-paper';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async e => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(
        'https://vast-hollows-04909.herokuapp.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        },
      );

      // Convert the response to JSON
      const user = await response.json();

      if (user) {
        navigation.navigate('Home', {user: user});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      loginBtnColor: '#da0037',
      registerBtnColor: '#3a0ca3',
      white: '#ffffff',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Avatar.Image
          size={200}
          style={{backgroundColor: 'transparent'}}
          source={require('../../assets/logo.png')}
        />
      </View>

      {/* Login Section */}
      <View style={styles.loginSection}>
        <View style={styles.input}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={password => setPassword(password)}
            right={<TextInput.Icon icon="eye-outline" />}
          />
        </View>
        <View>
          <Button
            icon="login"
            textColor={theme.colors.white}
            buttonColor={theme.colors.loginBtnColor}
            onPress={e => onLogin(e)}>
            Login
          </Button>
        </View>
      </View>

      {/* Login Section */}

      {/* Register Section */}
      <View style={styles.registerSection}>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={styles.smallText}>
          <Text variant="labelSmall">Don't have an account? </Text>
        </View>

        <View>
          <Button
            icon="login"
            textColor={theme.colors.white}
            buttonColor={theme.colors.registerBtnColor}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginSection: {
    flex: 1,
  },

  registerSection: {
    flex: 1,
    marginTop: 40,
  },

  input: {
    marginBottom: 10,
  },

  smallText: {
    margin: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default Login;
