import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Usuarios from './components/Usuarios';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Usuarios />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
