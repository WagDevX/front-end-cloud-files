import { useState } from "react";

export const UploadFileModal = (): JSX.Element => {
  const [file, setFile] = useState<FileList>();
  const submitFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setFile(ev.target?.files!);
  };

  const createFile = async () => {};
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
