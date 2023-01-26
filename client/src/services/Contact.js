import { axios } from "services";
import { endpoints } from "./config";

export const getContacts = (params) => {
  return axios({ method: "get", url: endpoints.contact.getContact, params });
};

export const createContact = (data) => {
  return axios({ method: "post", url: endpoints.contact.createContact, data });
};

export const deleteContact = (contactId) => {
  return axios({
    method: "delete",
    url: `${endpoints.contact.deleteContact}/${contactId}`,
  });
};
