import axios from 'axios';

export default ({
  getAllRoles: () => {
    return new Promise((resolve) => {
      axios.get('/roles')
        .then((res) => {
          resolve(res.data);
        })
        .catch(
          error => console.log(error.message)
        );
    });
  }
});
