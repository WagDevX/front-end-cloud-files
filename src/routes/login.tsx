import { useState } from "react"

export const Login = () : JSX.Element => {
    const [formData,setFormData] = useState({
        userName: String,
        password: String
    })

    const handleInputChange = (ev : {target: HTMLInputElement;}) => {
        const { name , value  } = ev.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(formData)
    }

    return (
        <>
        <div className="grid justify-center items-center content-center h-[100vh] bg-gradient-to-r from-slate-400 to-blue-200">
            <div className="grid gap-8 justify-center items-center content-center border-[1px] border-black/30 rounded-lg p-10 bg-white shadow-md">
            <h1 className="font-bold text-7xl">Cloud Files</h1>
            <form action="" className="grid gap-8">
                <input onChange={handleInputChange} className="p-2 border-[1px] border-black/30 rounded-lg" type="text" name="username"  placeholder="Nome de usuário" required={true}/>
                <input onChange={handleInputChange} className="p-2 border-[1px] border-black/30 rounded-lg" type="password" name="password" placeholder="Senha" required={true}/>
                <button type="submit" className="btn-default">Logar</button>
                <label htmlFor="signup" className="text-center text-sm text-slate-600 mt-10">Não tem conta?</label>
            </form>
            <a href="/sign-up">
                <button className="btn-default w-full" name="signup">Criar conta</button>
                </a>
            </div>
            

        </div>
        </>
    )
}