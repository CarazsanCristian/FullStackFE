import React, { useState } from "react";
import UploadService from "../../services/upload.service";
import { GridComponent } from "../GridComponent/GridComponent";
export const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [gridData, setGridData] = useState(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    UploadService.uploadFile(file)
      .then((resp) => {
        if (!resp || !resp.data) return;
        setGridData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {gridData ? (
        <div>
          <p>The folowing data was loaded to the database</p>
          <GridComponent rowsData={gridData} />
        </div>
      ) : null}
    </div>
  );
};
