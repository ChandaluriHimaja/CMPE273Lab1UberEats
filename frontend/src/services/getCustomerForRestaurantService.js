import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customer";

export async function getCustomerDetailsByID(id) {
  return await http.get(apiEndpoint + "/custId/" + id);
}
