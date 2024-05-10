import AxiosInstances from "./axios.service";

class UploadService {
  async uploadFile(file: File) {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await AxiosInstances.loggedInUploadInstance.post(
      "/upload",
      formData
    );
    return response;
  }
}

export default new UploadService();
