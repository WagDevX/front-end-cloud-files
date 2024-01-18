import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { loginInstance, loginRequest } from "../core/api/instance";

export const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não coincidem!");
    }
    const { username, password } = formData;
    const { url, data } = loginRequest.signUp(username, password);
    try {
      const response = await loginInstance.post(url, data);
      if (response.status === 201) {
        toast.success("Conta criada com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Erro ao criar conta, tente novamente mais tarde!");
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
        <div className="grid gap-8 justify-center items-center content-center border-[1px] border-black/30 rounded-lg p-10 bg-white">
          <img src={logo} alt="cloud files logo" height={400} width={400} />
          <form onSubmit={(ev) => handleSubmit(ev)} className="grid gap-8">
            <input
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="text"
              name="username"
              onChange={handleInputChange}
              placeholder="Nome de usuário"
              required={true}
            />
            <input
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Senha"
              required={true}
            />
            <input
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              required={true}
            />
            <button type="submit" className="btn-default" name="signup">
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
