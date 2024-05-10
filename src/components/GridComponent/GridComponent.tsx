import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const GridComponent = ({ rowsData }: any) => {
  if (!rowsData) return null;
  const colDefs = Object.keys(rowsData[0])
    .map((key) => {
      if (key === "itemId") return null;
      return { field: key };
    })
    .filter((n) => n !== null);
  console.log(colDefs);
  return (
    <div
      className="ag-theme-quartz"
      style={{ maxHeight: "500px", width: "100%", maxWidth: "800px" }}
    >
      <AgGridReact
        rowData={rowsData}
        columnDefs={colDefs as any}
        defaultColDef={{ flex: 1 }}
        domLayout="autoHeight"
      />
    </div>
  );
};
