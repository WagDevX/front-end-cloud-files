import { useState } from "react";
import { apiInstance, filesRequest } from "../../core/api/instance";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "react-toastify";
import { FileItem } from "../foldersTable";

type Props = {
  parentFolder: number;
  updateUI: (fileItem: FileItem) => void;
};

export const UploadFileModal = ({
  parentFolder,
  updateUI,
}: Props): JSX.Element => {
  const user = useAuthUser<any>();
  const [file, setFile] = useState<FileList>();
  const submitFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setFile(ev.target?.files!);
  };

  const createFile = async () => {
    try {
      const { url, data } = filesRequest.createFile(
        file![0]!.name,
        "",
        user!.id,
        user!.username,
        file![0]!.type,
        file![0]!.size,
        parentFolder
      );
      const res = await apiInstance.post(url, data);
      const newFile: FileItem = {
        id: res.data.result.id,
        owner: res.data.result.owner,
        fileName: res.data.result.fileName,
        ownerName: res.data.result.ownerName,
        extension: res.data.result.extension,
        size: res.data.result.size,
        parentFolder: res.data.result.parentFolder,
        children: [],
      };
      updateUI(newFile);
      toast.success("Arquivo enviado com sucesso!");
      (document.getElementById(
        "create_file_modal"
      ) as HTMLFormElement)!.close();
    } catch (error) {
      toast.error("Erro ao enviar arquivo =(");
      console.log(error);
    }
  };
  return (
    <>
      <dialog id="create_file_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Novo Arquivo</h3>
          <div className="modal-action">
            <div className="grid w-full gap-4">
              <input
                className="p-2"
                type="file"
                placeholder="Arquivo"
                autoFocus
                required
                onChange={(ev) => submitFile(ev)}
              />
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() =>
                    (document.getElementById(
                      "create_file_modal"
                    ) as HTMLFormElement)!.close()
                  }
                  className="btn-default"
                >
                  Cancelar
                </button>
                <button onClick={() => createFile()} className="btn-default">
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
