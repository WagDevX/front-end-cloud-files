import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Folder } from "./icons/folder";
twMerge("bg-red");

export type FileItem = {
  id: number;
  name: string;
  owner: string;
  extension?: string;
  ownerName: string;
  parentFolder: number;
  size?: number;
};

export type FoldersFilesProps = {
  array: FileItem[];
  // other properties...
};

export const FolderTable: React.FC<FoldersFilesProps> = ({ array }) => {
  const [receivedFolders, setReceivedFolders] = useState<FileItem[]>(array);
  const [selected, setSelected] = useState<FileItem>();
  const navigate = useNavigate();

  const handleOpenFolder = (id: number) => {
    navigate(`/folder/` + id);
  };

  useEffect(() => {
    setReceivedFolders(array);
  }, [array]);

  const handleSelect = (item: FileItem) => {
    const empty: FileItem = {
      id: 0,
      name: "",
      owner: "",
      ownerName: "",
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
      <table className="basic">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Proprietário</th>
          </tr>
        </thead>
        <tbody>
          {receivedFolders.length > 0 &&
            receivedFolders.map((folder, index) => (
              <>
                <tr
                  key={`fol_${index}`}
                  onClick={() => handleSelect(folder)}
                  onDoubleClick={() => handleOpenFolder(folder.id)}
                  className={twMerge(
                    `${selected === folder ? "bg-blue-100" : ""}`
                  )}
                >
                  <td>
                    {folder.extension === undefined && <Folder />}
                    {folder.name}
                  </td>
                  <td>{folder.extension ?? "Pasta"}</td>
                  <td>{folder.ownerName}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};
