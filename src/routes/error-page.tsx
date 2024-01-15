import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      console.error(error);
      return "Erro desconhecido";
    }
  }

  return (
    <div className="grid gap-8 text-center justify-center content-center h-[100vh]">
      <h1 className="font-bold text-4xl">Oops!</h1>
      <p className="text-2xl">Desculpe, um erro inesperado aconteceu ;-;</p>
      <p>
        <i className="text-2xl  text-slate-500 ">{errorMessage(error)}</i>
      </p>
    </div>
  );
}
