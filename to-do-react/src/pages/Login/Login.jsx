import React, {useState, useEffect} from 'react'
import Style from './Login.module.css'
import { login } from '../../services/API';

const Login = () => {

  const [error, setError] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const handleSetSenha = (value) => {
        setSenha(value.target.value)
        console.log(senha)
  }

  const handleSetEmail = (value) => {
    setEmail(value.target.value)
    console.log(email)
}

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    try {

      setError("");
      
      if (email === '' || email === null) {
          throw new Error("Preencha o campo de email!");

      } else if (senha === '' || senha === null) {
        throw new Error("Preencha o campo de senha!");

      } else if (!emailRegex.test(email)) {
          throw new Error("Email inválido!");

      } else {

        const object = {
          "email": email,
          "senha": senha
        }

        await login(object).then(() => {
              localStorage.setItem('email', email);
              window.location.href = '/todo'

        }).catch(() => {
          throw new Error("Usuário ou senha inválidos!");
        })

      }
        
    } catch (error) {
        setError(`${error.message}`);
    }  
   }

   useEffect(() => {
      setEmail('')
   }, [])
   
 
  return ( 
    <div className={Style.container}>
       
       <fieldset className={Style.fieldset}>
          <div className={Style.form}>
            <h1>Login</h1>
            {error ? <p className={Style.error}>{error}</p> : null}
            <div className={Style.field}>
              <label>Email: </label>
              <input type="email" name="email" id="email" required onChange={(value) => handleSetEmail(value)}/>
            </div>
              
              <div className={Style.field}>
                <label>Senha: </label>
                <input type="password" onChange={(value) => handleSetSenha(value)}/>
              </div>    

              <button onClick={() => handleLogin()}>Entrar</button>
              <p>Não possui uma conta? <a href='/cadastro'>Clique aqui</a></p>
  
          </div>
       </fieldset>
      
    </div>
  )
}

export default Login