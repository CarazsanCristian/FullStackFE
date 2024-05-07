import StorageService from "../services/storage.service";

export const Home = () => {
  const userdata = StorageService.getUserData();
  const greet = userdata
    ? `Welcome back ${userdata.username}`
    : "Welcome to the home page";
  return <div>{greet}</div>;
};
