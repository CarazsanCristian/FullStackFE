import StorageService from "./storage.service";
import AxiosInstances from "./axios.service";
import { User, RegisterUserData } from "../types/userType";

interface Auth {
  accessToken: string;
}
class AuthService {
  async login(data: User) {
    const response = await AxiosInstances.notLoggedInInstance.post<Auth>(
      "/auth/login",
      data
    );

    if (response.data.accessToken) {
      StorageService.setToken(response.data.accessToken);
      const userData = await this.whoAmI();
      StorageService.setUserData(userData.data);
    }
    return response;
  }

  whoAmI() {
    return AxiosInstances.loggedInInstance.get<User>("/auth/who-am-i");
  }

  logout() {
    return AxiosInstances.loggedInInstance("/auth/logout").then(() => {
      StorageService.clearStorage();
    });
  }

  async register(data: RegisterUserData) {
    const response =
      await AxiosInstances.notLoggedInInstance.post<RegisterUserData>(
        "/users",
        data
      );
    return response;
  }
}

export default new AuthService();
