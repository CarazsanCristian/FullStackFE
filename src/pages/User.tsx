import { UploadFile } from "../components/UploadFile/UploadFile";
import StorageService from "../services/storage.service";

export const User = () => {
  const userdata = StorageService.getUserData();
  const secretData = userdata
    ? `Ultra secret page for user: ${userdata.username}`
    : "error You should not be here";
  return (
    <div>
      {secretData}
      <div>
        <UploadFile />
      </div>
    </div>
  );
};
