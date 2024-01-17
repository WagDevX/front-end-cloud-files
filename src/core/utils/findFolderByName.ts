import { FileItem } from "../../components/foldersTable";

export const findFolderByName = (
  name: string,
  folderList: FileItem[]
): FileItem | null => {
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
};
