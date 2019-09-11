import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = newObject => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(getAll);
};

export default { getAll, create, deletePerson, update };
