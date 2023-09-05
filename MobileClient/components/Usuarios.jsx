import React from 'react';
import { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, TextInput, Text, Button, View} from 'react-native';
import {navigation} from 'react-navigation';
import axios from 'axios'

const Usuarios = () => {
    const [lista, setLista] = useState([]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1px'
        }
    });

    useEffect(() => {
        axios.get('http://172.31.45.47:8000/api/users')
        .then(response => {
            setLista(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log('holaa' + error);
        })
    }, []);

    return(
        <View style={styles.container}>
            <Text>Lista de Usuarios</Text>
            {
                lista.map((user, i) => {
                    return(
                        <View key={i}>
                            <Text onPress={() => (navigation.navigate('UserDetails', {id: user.id}))}>{user.userName}</Text>
                            <Text >{user.age}</Text>
                            <Text >{user.email + "\n"}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default Usuarios;