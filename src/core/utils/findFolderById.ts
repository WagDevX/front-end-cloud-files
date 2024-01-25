import { FileItem } from "../../components/foldersTable";

export const findFolderById = (
  fold: FileItem,
  folderList: FileItem[]
): FileItem | null => {
  for (const folder of folderList) {
    if (folder.id === fold.id) {
      return folder;
    }

    const childResult = findFolderById(fold, folder.children!);
    if (childResult) {
      return childResult;
    }
  }

  return null;
};
