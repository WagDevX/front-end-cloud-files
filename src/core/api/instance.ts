import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://18.230.150.26:8080",
});

export const loginInstance = axios.create({
  baseURL: "http://18.230.150.26:8080",
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
  signUp: (username: string, password: string) => {
    return {
      url: "/auth/register",
      data: { username: username, password: password },
    };
  },
};

export const filesRequest = {
  fetchAll: `/files/getall`,
  deleteFolder: (id: number) => {
    return `/files/${id}`;
  },
  getFileByFolder: (folder: number | string, owner: number) => {
    return `files/${folder}?owner=${owner}`;
  },
  createFile: (
    fileName: string,
    downloadUrl: string,
    owner: number,
    ownerName: string,
    extension: string,
    size: number,
    parentFolder: number
  ) => {
    return {
      url: "/files",
      data: {
        fileName: fileName,
        downloadUrl: downloadUrl,
        owner: owner,
        ownerName: ownerName,
        extension: extension,
        size: size,
        parentFolder: parentFolder,
      },
    };
  },
};
