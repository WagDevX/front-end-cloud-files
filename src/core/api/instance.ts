import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export const loginInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export const foldersRequest = {
  fetchAll: `/folder/getall`,
  create: (
    owner: number,
    ownerName: string,
    name: string,
    parentFolder: number | undefined
  ) => {
    return {
      url: "/folder",
      data: parentFolder
        ? {
            name: name,
            owner: owner,
            ownerName: ownerName,
            parentFolder: parentFolder,
          }
        : {
            owner: owner,
            ownerName: ownerName,
            name: name,
          },
    };
  },
  findOne: (id: number) => {
    return `/folder/${id}`;
  },
  delete: (id: number) => {
    return `/folder/${id}`;
  },
};

export const usersRequest = {
  fetchAll: `/auth/getall`,
};

export const loginRequest = {
  fetch: (username: string, password: string) => {
    return {
      url: "/auth/login",
      data: { username: username, password: password },
    };
  },
};

export const filesInstance = {
  fetchAll: `/files/getall`,
};
