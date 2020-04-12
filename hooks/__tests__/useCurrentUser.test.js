import useCurrentUser from '../useCurrentUser';
import { USER_INITIAL_STATE } from './../../store/user/UserReducers';
jest.mock('react-redux');
import { useSelector } from 'react-redux';

it('useCurrentUser hook', () => {
    const mockedInitialState = {
        user: { ...USER_INITIAL_STATE, currentUser: { _id: 'FAKE-ID' } },
    };
    useSelector.mockImplementationOnce((callback) => callback(mockedInitialState));
    const user = useCurrentUser();

    expect(user).toEqual(mockedInitialState.user.currentUser);
});
