const init = {
  users: [],
  userSelect: null,
  count: 0,
};


export default function (state = init, action) {
  let users;
  let userSelect;
  if (action.type === 'TOGGLE_FAVORITE') {
    users = state.users.map((user) => {
      if (user._id === state.userSelect._id) {
        user.favorite = state.userSelect.favorite === 0 ? 1 : 0;
        userSelect = user;
        return user;
      }
      return user;
    });
  }
  switch (action.type) {
    case 'GET_USER':
      return { ...state, users: [...state.users, ...action.usuarios], count: state.count + 1 };
    case 'SELECT_USER':
      return { ...state, userSelect: action.user };
    case 'TOGGLE_FAVORITE':
      return { ...state, userSelect, users };
    default:
      return state;
  }
}
