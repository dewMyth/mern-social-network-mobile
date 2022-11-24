import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  TextInput,
  Button,
  useTheme,
  MD3LightTheme as DefaultTheme,
  Text,
  HelperText,
  Snackbar,
} from 'react-native-paper';

import GLOBAL_STATE from '../../GlobalState.js';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hasErrors = () => {
    if (email.length === 0) {
      return false;
    } else {
      return !email.includes('@');
    }
  };

  const onDismissSnackBar = () => setError(false);

  const onLogin = async e => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    try {
      setIsLoading(true);
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
      setIsLoading(false);
      // Convert the response to JSON and set to User
      const json = await response.json();
      console.log(json);
      if (json.message == null && isLoading === false) {
        GLOBAL_STATE.user = json;
        navigation.navigate('Home', {user: json});
      } else {
        setError(true);
        setErrorMsg(json.message);
      }
    } catch (error) {
      console.log(error);
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
        <View style={styles.email}>
          <TextInput
            label="Email"
            value={email}
            mode="outlined"
            onChangeText={email => setEmail(email)}
          />
          <HelperText type="error" visible={hasErrors()}>
            Email address is invalid!
          </HelperText>
        </View>
        <View style={styles.password}>
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            value={password}
            onChangeText={password => setPassword(password)}
            right={<TextInput.Icon icon="eye-outline" />}
          />
        </View>
        <View>
          <Button
            mode="elevated"
            textColor={theme.colors.white}
            buttonColor={theme.colors.loginBtnColor}
            loading={isLoading}
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
            textColor={theme.colors.white}
            buttonColor={theme.colors.registerBtnColor}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Button>
        </View>
      </View>
      <View>
        <Snackbar
          visible={error}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Got it',
            onPress: () => {
              onDismissSnackBar();
            },
          }}>
          {errorMsg}
        </Snackbar>
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

  email: {
    marginBottom: -10,
  },
  password: {
    marginBottom: 25,
  },

  smallText: {
    margin: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default Login;
