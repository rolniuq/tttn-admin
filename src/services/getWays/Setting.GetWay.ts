import Axios from "axios";
import { getTokenLocal, setTokenLocal } from "../../utils/Common";

const HttpService = Axios.create({
  baseURL: "http://localhost:2000",
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + getTokenLocal(),
  },
});
export const SetToken = (token: string) => {
  HttpService.defaults.headers.common["Authorization"] = "Bearer " + token;
  setTokenLocal(token);
};
export default HttpService;
