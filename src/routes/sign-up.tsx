import logo from "../assets/images/logo.png";

export const SignUp = (): JSX.Element => {
  return (
    <>
      <div className="grid justify-center items-center content-center h-[100vh] bg-gradient-to-r from-slate-400 to-blue-200">
        <div className="grid gap-8 justify-center items-center content-center border-[1px] border-black/30 rounded-lg p-10 bg-white">
          <img src={logo} alt="cloud files logo" height={400} width={400} />
          <form action="" className="grid gap-8">
            <input
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="text"
              name="username"
              placeholder="Nome de usuário"
              required={true}
            />
            <input
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="password"
              name="password"
              placeholder="Senha"
              required={true}
            />
            <input
              className="p-2 border-[1px] border-black/30 rounded-lg"
              type="password"
              name="password"
              placeholder="Confirme sua senha"
              required={true}
            />
            <button className="btn-default" name="signup">
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
