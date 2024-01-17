import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

import logo from "../assets/images/logo.png";
import { loginInstance, loginRequest } from "../core/api/instance";
import { toast } from "react-toastify";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const signIn = useSignIn();

  const handleSubmit = async (ev: FormEvent) => {
    const { username, password } = formData;
    const { url, data } = loginRequest.fetch(username, password);
    ev.preventDefault();
    try {
      const response = await loginInstance.post(url, data);
      if (response.status === 200) {
        if (
          signIn({
            auth: {
              token: response.data.accessToken,
              type: "x-access-token",
            },
            userState: {
              id: response.data.id,
              username: response.data.username,
              role: response.data.role,
            },
          })
        ) {
          navigate("/");
          toast.success("Logado com sucesso!");
        } else {
          console.log("Sign in Failed");
        }
      }
    } catch (error) {
      toast.error("Erro ao logar, verifique os dados e tente novamente!");
      console.error(error);
    }
  };

  const handleInputChange = (ev: { target: HTMLInputElement }) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="grid justify-center items-center content-center h-[100vh] bg-gradient-to-r from-slate-400 to-blue-200">
        <div className="grid gap-8 justify-center items-center content-center border-[1px] border-black/30 rounded-lg p-10 bg-white shadow-md">
          <img src={logo} alt="" height={400} width={400} />
          <form onSubmit={(ev) => handleSubmit(ev)} className="grid gap-8">
            <input
              onChange={handleInputChange}
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="text"
              name="username"
              placeholder="Nome de usuário"
              required={true}
            />
            <input
              onChange={handleInputChange}
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="password"
              name="password"
              placeholder="Senha"
              required={true}
            />
            <button type="submit" className="btn-default">
              Logar
            </button>
            <label
              htmlFor="signup"
              className="text-center text-sm text-slate-600 mt-10"
            >
              Não tem conta?
            </label>
          </form>
          <Link to="/sign-up">
            <button className="btn-default w-full" name="signup">
              Criar conta
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
