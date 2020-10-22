import { axiosWithAuth } from '../utils/axiosWithAuth'
export const axiosWithAuth = () => {
axiosWithAuth()
  .post("/login", user)
  .then(res => {
      localStorage.setItem("token", res.data.payload);
      props.history.push("https://tt-41-use-my-tech.herokuapp.com/");
  })
  .catch(err => {
      localStorage.removeItem("token");
      console.log("Invalid login: ", err);
  });
}