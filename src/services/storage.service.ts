// import secureLocalStorage from "react-secure-storage";
import { User } from "../types/userType";

class StorageService {
  setToken(value: string) {
    localStorage.setItem("authToken", value);
  }

  getToken(): string | null {
    return localStorage.getItem("authToken") as string;
  }

  setUserData(data: User) {
    localStorage.setItem("userData", JSON.stringify(data));
  }

  getUserData(): User | null {
    return JSON.parse(localStorage.getItem("userData") as string) as User;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }
}

export default new StorageService();
