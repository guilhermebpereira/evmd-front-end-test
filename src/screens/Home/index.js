import React, { useEffect } from 'react';
import { View, StyleSheet, ListView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { UserCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_USERS, SELECT_USER } from '../../../store/user/UserTypes';

function navigateToUserDetailsPage(navigation, userId, dispatch) {
    dispatch({ type: SELECT_USER, payload: userId });
    navigation.navigate('Details');
}

function renderCard(navigation, user, dispatch) {
    return (
        <UserCard
            key={user._id}
            name={user.name}
            age={`${user.age}`}
            email={user.email}
            picture={user.picture}
            onPress={() =>
                navigateToUserDetailsPage(navigation, user._id, dispatch)
            }
        />
    );
}

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch({ type: FETCH_USERS });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={users || []}
                onEndReached={() => dispatch({ type: FETCH_USERS })}
                renderItem={({ item: user }) =>
                    renderCard(navigation, user, dispatch)
                }
                keyExtractor={({ _id }) => _id}
            />
        </View>
    );
};

Home.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;
