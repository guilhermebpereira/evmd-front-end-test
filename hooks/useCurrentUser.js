import { useSelector } from 'react-redux';

export default function useCurrentUser() {
    return useSelector((state) => state.user.currentUser);
}
