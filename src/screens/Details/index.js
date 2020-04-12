import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import useCurrentUser from './../../../hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import {
    FETCH_USER_DETAILS,
    TOGGLE_CURRENT_USER_FAV,
} from './../../../store/user/UserTypes';

function renderFavText(isFav = false) {
    let text = 'Favoritar';

    if (isFav === true) {
        text = 'Desfavoritar';
    }

    return <Text>{text}</Text>;
}

const Details = () => {
    const dispatch = useDispatch();
    const user = useCurrentUser();

    useEffect(() => {
        dispatch({
            type: FETCH_USER_DETAILS,
            payload: user._id,
        });
    }, []);

    const { name, email, age, balance, picture, latitude, longitude, isFav } =
        user || {};

    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: picture }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text>Nome: {name}</Text>
                <Text>E-mail: {email}</Text>
                <Text>Idade: {age}</Text>
                <Text>Salário: {age}</Text>
                <Text>Latitude: {latitude}</Text>
                <Text>Longitude: {longitude}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => dispatch({ type: TOGGLE_CURRENT_USER_FAV })}
            >
                {renderFavText(isFav)}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f3f3f3',
    },
    detailsContainer: {
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
        backgroundColor: '#e5e5e5',
    },
    image: {
        width: 200,
        height: 200,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#b1b1b1',
        backgroundColor: '#e5e5e5',
    },
});

export default Details;
