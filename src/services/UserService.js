import axios from 'axios';

export default ({
  getAllUsers: () => {
    return new Promise((resolve) => {
      axios.get('/users')
        .then((res) => {
          resolve(res.data);
        })
        .catch(
          error => console.log(error.message)
        );
    });
  },
  addUser: (user) => {
    return new Promise((resolve) => {
      axios.post('/users', {
        username: user.username,
        password: user.password ? user.password : '123456',
        memo: user.memo
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch(
          error => console.log(error.message)
        );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve) => {
      axios.delete('/users/' + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch(
          error => console.log(error.message)
        );
    });
  },
  updateUser: (user) => {
    return new Promise((resolve) => {
      axios.put('/users/' + user.id, {
        username: user.username,
        memo: user.memo
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch(
          error => console.log(error.message)
        );
    });
  }
});
