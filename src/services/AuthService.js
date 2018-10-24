import axios from 'axios';

export default ({
  login: (username, password) => {
    return new Promise((resolve) => {
      axios.post('/auth/login', {
        username: username,
        password: password
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
