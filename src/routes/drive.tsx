import { useEffect, useState } from "react";

import { FileItem, FoldersTable } from "../components/foldersTable";
import {
  apiInstance,
  filesRequest,
  foldersRequest,
} from "../core/api/instance";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";
import { UploadFileModal } from "../components/uploadFileModal/uploadFileModal";
import { useParams } from "react-router-dom";
import { findFolderByName } from "../core/utils/findFolderByName";

export const DrivePage = (): JSX.Element => {
  const params = useParams();
  const auth = useAuthHeader();
  const user: any = useAuthUser();
  const [folders, setFolders] = useState<FileItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("Pasta sem nome");
  const [loading, setLoading] = useState(false);
  const [actualFolder, setActualFolder] = useState<FileItem | null>();

  const setCurrentFolder = (folder: FileItem | null) => {
    setActualFolder(folder);
  };

  const handleCreateFile = (folder: FileItem): void => {
    console.log("Creating");
    setActualFolder((prev: any) => {
      const newArray = prev.children;
      newArray?.push(folder);
      return {
        ...prev,
        children: newArray,
      };
    });
  };

  useEffect(() => {
    if (params.folderId) {
      getFilesFromFolderID(params.folderId!, user.id);
    }
  }, [params.folderId]);

  const getFilesFromFolderID = async (
    folderID: number | string,
    owner: number
  ) => {
    try {
      if (actualFolder?.children?.find((item) => item.size !== undefined)) {
        return;
      } else {
        const res = await apiInstance.get(
          filesRequest.getFileByFolder(folderID, owner)
        );
        const newChildren = res.data.map((item: FileItem) => {
          return {
            id: item.id,
            name: item.fileName,
            owner: item.owner,
            extension: item.extension,
            downloadUrl: item.downloadUrl,
            ownerName: item.ownerName,
            parentFolder: item.parentFolder,
            size: item.size,
            children: [],
          };
        });
        let updateChildren = (
          fileItem: FileItem,
          newChildren: FileItem[]
        ): FileItem => {
          return { ...fileItem, children: newChildren };
        };
        setActualFolder(
          updateChildren(
            actualFolder!,
            actualFolder!.children?.concat(newChildren)!
          )
        );
      }
    } catch (error) {}
  };

  let folderss = async () => {
    const token = auth?.split(" ")[1];
    setLoading(true);
    try {
      apiInstance.defaults.headers["x-access-token"] = token!;
      let res = await apiInstance.get(foldersRequest.fetchAll);
      setFolders(() => {
        return res.data.map((item: FileItem) => item);
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!folders.length) {
      folderss();
    }
  }, []);

  const handleSearch = () => {
    if (searchInput!.length > 0) {
      const folder = findFolderByName(searchInput!, folders);
      if (folder) {
        setActualFolder(folder);
      } else {
        toast.error("Pasta não encontrada");
      }
    }
  };

  const deleteFileById = async (id: number, root: boolean) => {
    try {
      let res = await apiInstance.delete(filesRequest.deleteFolder(id));
      await folderss();
      (document.getElementById(
        "create_folder_modal"
      ) as HTMLFormElement)!.close();
      if (res.status === 201) {
        toast.success("Arquivo deletado!");
      }
      const newChildren = actualFolder?.children?.filter(
        (folder) => folder.id !== id
      );
      if (!root) {
        let updateChildren = (
          fileItem: FileItem,
          newChildren: FileItem[]
        ): FileItem => {
          return { ...fileItem, children: newChildren };
        };
        setActualFolder(updateChildren(actualFolder!, newChildren!));
      }
    } catch (err: any) {
      if (err.response.status === 505) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Erro ao deletar arquivo, tente novamente!");
      }
    }
  };

  const deleteFolderById = async (id: number, root: boolean) => {
    try {
      let res = await apiInstance.delete(foldersRequest.delete(id));
      await folderss();
      (document.getElementById(
        "create_folder_modal"
      ) as HTMLFormElement)!.close();
      if (res.status === 201) {
        toast.success("Pasta deletada!");
      }
      const newChildren = actualFolder?.children?.filter(
        (folder) => folder.id !== id
      );
      if (!root) {
        let updateChildren = (
          fileItem: FileItem,
          newChildren: FileItem[]
        ): FileItem => {
          return { ...fileItem, children: newChildren };
        };
        setActualFolder(updateChildren(actualFolder!, newChildren!));
      }
    } catch (err: any) {
      if (err.response.status === 505) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Erro ao deletar pasta, tente novamente!");
      }
    }
  };

  const createFolder = async () => {
    try {
      const { url, data } = foldersRequest.create(
        user.id,
        user.username,
        folderName,
        actualFolder ? actualFolder.id : undefined
      );
      const response = await apiInstance.post(url, data);
      await folderss();
      (document.getElementById(
        "create_folder_modal"
      ) as HTMLFormElement)!.close();
      //setActualFolder((prev) => findFolderById(prev?.id!, folders));
      const newFolder: FileItem = {
        id: response.data.data.id,
        name: response.data.data.name,
        owner: response.data.data.owner,
        ownerName: response.data.data.ownerName,
        parentFolder: response.data.data.parentFolder,
        children: [],
      };
      actualFolder?.children?.push(newFolder);
    } catch (err) {
      toast.error("Erro ao criar pasta");
      console.log(err);
    }
  };
  return (
    <>
      <div className="grid ml-5 mt-5">
        <div className="bg-white rounded-xl p-5 h-[96vh]">
          <div>
            <h1 className="font-bold text-4xl mb-5">Drive</h1>
            <div className="flex gap-5">
              <button
                className="btn-default"
                onClick={() =>
                  (document.getElementById(
                    "create_folder_modal"
                  ) as HTMLFormElement)!.showModal()
                }
              >
                Nova Pasta
              </button>
              <dialog id="create_folder_modal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Nova Pasta</h3>
                  <div className="modal-action">
                    <div className="grid w-full gap-4">
                      <input
                        className="p-2"
                        type="text"
                        placeholder="Nome da pasta"
                        autoFocus
                        required
                        value={folderName}
                        onChange={(ev) => setFolderName(ev.target.value)}
                      />
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={() =>
                            (document.getElementById(
                              "create_folder_modal"
                            ) as HTMLFormElement)!.close()
                          }
                          className="btn-default"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => createFolder()}
                          className="btn-default"
                        >
                          Criar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
              <button
                onClick={() =>
                  (document.getElementById(
                    "create_file_modal"
                  ) as HTMLFormElement)!.showModal()
                }
                className="btn-default"
              >
                Upload de Arquivo
              </button>
              <UploadFileModal
                parentFolder={actualFolder?.id!}
                updateUI={handleCreateFile}
              />
              <input
                value={searchInput}
                onChange={(ev) => setSearchInput(ev.target.value)}
                className="border-[1px] p-2 rounded-lg w-full "
                type="text"
              />
              <button onClick={() => handleSearch()} className="btn-default">
                Procurar
              </button>
              <button className="btn-default">
                Ordernar por
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <FoldersTable
            array={folders}
            deleteFolder={deleteFolderById}
            deleteFile={deleteFileById}
            setCurrentFolder={setCurrentFolder}
            currentFolder={actualFolder!}
          />
        </div>
      </div>
    </>
  );
};
