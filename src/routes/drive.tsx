import { useEffect, useState } from "react";

import { FileItem, FoldersTable } from "../components/foldersTable";
import { apiInstance, foldersRequest } from "../core/api/instance";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const DrivePage = (): JSX.Element => {
  const auth = useAuthHeader();
  const user: any = useAuthUser();
  const [folders, setFolders] = useState<FileItem[]>([]);
  const [folderName, setFolderName] = useState<string>("Pasta sem nome");
  const [loading, setLoading] = useState(false);
  const [actualFolder, setActualFolder] = useState<FileItem>();

  const setCurrentFolder = (folder: FileItem) => {
    setActualFolder(folder);
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
    console.log(folders);
  };
  const findFolderById = (
    id: number,
    folders: FileItem[]
  ): FileItem | undefined => {
    for (const folder of folders) {
      if (folder.id === id) {
        return folder;
      }
      if (folder.children) {
        const foundChild = findFolderById(id, folder.children);
        if (foundChild) {
          return foundChild;
        }
      }
    }
    return undefined;
  };

  const createFolder = async () => {
    const { url, data } = foldersRequest.create(
      user.id,
      user.username,
      folderName,
      actualFolder!.id
    );
    try {
      await apiInstance.post(url, data);
      await folderss();
      (document.getElementById(
        "create_folder_modal"
      ) as HTMLFormElement)!.close();
      setActualFolder((prev) => findFolderById(prev?.id!, folders));
      console.log(actualFolder);
    } catch (err) {
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
              <button className="btn-default">Upload de Arquivo</button>
              <input
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
            setCurrentFolder={setCurrentFolder}
            currentFolder={actualFolder!}
          />
        </div>
      </div>
    </>
  );
};
