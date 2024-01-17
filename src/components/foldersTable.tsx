import React, { useEffect } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FowardIcon } from "./icons/foward";
import { Link, useNavigate } from "react-router-dom";
import { Folder } from "./icons/folder";
import { Fileicon } from "./icons/fileIcon";
import { toast } from "react-toastify";
import { byteConverter } from "../core/utils/byteConverter";

export type FileItem = {
  id: number;
  name?: string;
  owner: string;
  extension?: string;
  ownerName?: string;
  fileName?: string;
  downloadUrl?: string;
  parentFolder: number;
  size?: number;
  children?: Array<FileItem>;
};

export type FoldersFilesProps = {
  array: FileItem[];
  // other properties...
};
export type SetCurrentFolderProps = {
  setCurrentFolder: (folder: FileItem | null) => void;
  currentFolder: FileItem;
  deleteFolder: (id: number, root: boolean) => void;
  deleteFile: (id: number, root: boolean) => void;
};

export const FoldersTable: React.FC<
  FoldersFilesProps & SetCurrentFolderProps
> = ({ array, setCurrentFolder, currentFolder, deleteFolder, deleteFile }) => {
  const [receivedFolders, setReceivedFolders] = useState<FileItem[]>(array);
  const [selected, setSelected] = useState<FileItem>();
  const [path, setPath] = useState<string[]>([]);
  const navigate = useNavigate();

  function findFolderByName(
    name: string,
    folderList: FileItem[]
  ): FileItem | null {
    for (const folder of folderList) {
      if (folder.name === name) {
        return folder;
      }

      const childResult = findFolderByName(name, folder.children!);
      if (childResult) {
        return childResult;
      }
    }

    return null;
  }

  useEffect(() => {
    setReceivedFolders(array);
  }, [array]);

  useEffect(() => {
    setReceivedFolders(array);
  }, [array]);

  const handleOpenFolder = async (folder: FileItem) => {
    if (folder.extension === undefined) {
      setPath((prev) => [...prev, folder.name!]);
      setCurrentFolder(folder);
      navigate("/" + folder.id);
    } else if (folder.extension !== undefined) {
      toast.success("Simulação: Baixando arquivo");
    }
  };

  function popUntil(list: string[], until: string): string[] {
    let oldlist: string[] = list;
    for (let i = oldlist.length - 1; i >= 0; i--) {
      if (oldlist[i] !== until) {
        oldlist.pop();
      } else {
        break;
      }
    }
    return oldlist;
  }

  const handleSelect = (item: FileItem) => {
    const empty: FileItem = {
      id: 0,
      name: "",
      owner: "",
      parentFolder: 0,
    };
    if (item === selected) {
      setSelected((prev) => {
        return empty;
      });
      return;
    }
    setSelected(item);
  };
  return (
    <>
      <div className="flex gap-2 font-semibold mt-4">
        <Link to={"/"}>
          <button
            onClick={() => {
              setCurrentFolder(null);
              setPath([]);
            }}
          >
            Drive
          </button>{" "}
        </Link>
        {path.map((name, index) => (
          <>
            <FowardIcon />{" "}
            <button
              key={`name="${name}_${index}`}
              disabled={currentFolder.name === name}
              onClick={() => {
                handleOpenFolder(findFolderByName(name, receivedFolders)!);
                setPath(popUntil(path, name));
              }}
            >
              {name}
            </button>
          </>
        ))}
      </div>
      <table className="basic">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Proprietário</th>
            <th>Tamanho</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentFolder
            ? currentFolder.children?.map((folder, index) => (
                <tr
                  key={`current_${index + folder.id + folder.parentFolder}`}
                  onClick={() => handleSelect(folder)}
                  onDoubleClick={() => handleOpenFolder(folder)}
                  className={twMerge(
                    `${selected === folder ? "bg-blue-100" : ""}`
                  )}
                >
                  <td>
                    <div className="flex gap-2 items-center">
                      {folder.extension === undefined && <Folder />}
                      {folder.extension !== undefined && <Fileicon />}
                      {folder.name ?? folder.fileName}
                    </div>
                  </td>
                  <td>{folder.extension ?? "Pasta"}</td>
                  <td>{folder.ownerName}</td>
                  <td>
                    {folder.size
                      ? byteConverter(folder.size!, 2, "MB")
                      : "Desconhecido"}
                  </td>
                  <td className="">
                    <button
                      onClick={() => {
                        if (folder.extension) {
                          deleteFile(
                            folder.id,
                            folder.parentFolder === null ? true : false
                          );
                        } else {
                          deleteFolder(
                            folder.id,
                            folder.parentFolder === null ? true : false
                          );
                        }
                      }}
                      className={`${selected === folder ? "" : "hidden"}`}
                    >
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            : receivedFolders.length > 0 &&
              receivedFolders.map((folder, index) => (
                <tr
                  key={`received_${index + folder.id}`}
                  onClick={() => handleSelect(folder)}
                  onDoubleClick={() => handleOpenFolder(folder)}
                  className={twMerge(
                    `${selected === folder ? "bg-blue-100" : ""}`
                  )}
                >
                  <td>
                    <div className="flex gap-2 items-center">
                      {folder.extension === undefined && <Folder />}
                      {folder.extension !== undefined && <Fileicon />}
                      {folder.name ?? folder.fileName}
                    </div>
                  </td>
                  <td>{folder.extension ?? "Pasta"}</td>
                  <td>{folder.ownerName}</td>
                  <td>
                    {folder.size
                      ? byteConverter(folder.size!, 2, "MB")
                      : "Desconhecido"}
                  </td>
                  <td className="">
                    <button
                      onClick={() =>
                        deleteFolder(
                          folder.id,
                          folder.parentFolder === null ? true : false
                        )
                      }
                      className={`${selected === folder ? "" : "hidden"}`}
                    >
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};
