import AxiosInstances from "./axios.service";

class ShoppingListService {
  async getShoppingList() {
    const response = await AxiosInstances.loggedInInstance.get(
      "/shopping-list"
    );
    return response;
  }
}

export default new ShoppingListService();
