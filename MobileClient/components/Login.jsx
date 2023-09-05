import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Text, Button} from 'react-native';

const Login = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <Text>Nombre: </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder='Nombre...'
      />
      <Text>Email: </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder='Email...'
      />
      <Button title="Log In"></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 180,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;