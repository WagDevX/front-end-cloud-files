import { useEffect, useState } from "react";
import { apiInstance, foldersRequest } from "../core/api/instance";
import { useParams } from "react-router-dom";
import { FileItem, FolderTable } from "../components/folderTable";

export const FolderPage = () => {
  const [folders, setFolders] = useState<FileItem[]>([]);
  const { folderId } = useParams();

  useEffect(() => {
    console.log(folderId);
    let folders = async () => {
      try {
        let res = await apiInstance.get(
          foldersRequest.findOne(Number(folderId))
        );
        setFolders(() => {
          return res.data;
        });
      } catch (error: any) {
        console.log(error?.message);
      }
    };
    if (!folders.length) {
      folders();
    }
  }, []);
  return (
    <>
      <FolderTable array={folders} />
    </>
  );
};
