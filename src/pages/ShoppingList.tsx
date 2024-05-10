import { useEffect, useState } from "react";
import ShoppingListService from "../services/shoppingList.service";
import { GridComponent } from "../components/GridComponent/GridComponent";

export const ShoppingList = () => {
  const [gridData, setGridData] = useState(null);
  useEffect(() => {
    ShoppingListService.getShoppingList()
      .then((res) => {
        if (!(res && res.data && res.data.length > 0)) return;
        setGridData(res.data);
      })
      .catch((err: any) => console.log(err));
  }, []);

  return (
    <div>
      <GridComponent rowsData={gridData} />
    </div>
  );
};
