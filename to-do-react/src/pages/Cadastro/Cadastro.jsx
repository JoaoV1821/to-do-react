import React, { useState, useEffect } from 'react'
import Style from "./Cadastro.module.css"
import { postUser } from '../../services/API';

const Cadastro = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const handleSetSenha = (value) => {
    setSenha(value.target.value)
  }

  const handleSetEmail = (value) => {
    setEmail(value.target.value)
 }

 const handlePostUser = async () => {  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    setError('');
    setSuccess('');
  
    try {
        if (email === '' || email === null) {
          throw new Error('Preencha o campo de e-mail!');

        } else if (nome === '' || nome === null) {
          throw new Error('Preencha o campo de Nome!');

        } else if (senha === '' || senha === null ) {
          throw new Error('Preencha o campo de Senha!');

        } else if (!emailRegex.test(email)) {
          throw new Error("Email inválido!");

        } else {
          
          const object = {
            "nome": nome,
            "email": email,
            "senha": senha
        }
          await postUser(object).then(() => {
              setError('')
              setSuccess("Usuário cadastrado com sucesso!");
          })
         
        }
   
    } catch (error) {
        console.log(error)
        setSuccess('')
        setError(error.message)
        
    }


 }

 const handleSetNome = (value) => {
   setNome(value.target.value)
 }


 useEffect(() => {
  setEmail('')
}, [])

  return (
    <div className={Style.container}>
       
       <fieldset className={Style.fieldset}>
          <div className={Style.form}>
            <h1>Cadastro</h1>
            
            <div className={Style.field}>
            {error ? <p className={Style.error}>{error}</p> : null}
            {success ? <p className={Style.succsess}>{success}</p> : null}

            <div className={Style.field}>
              <label>Email: </label>
              <input type="email" name="email" id="email" required  onChange={(value) => handleSetEmail(value)} />

            </div>
              <label>Nome: </label>
              <input type="text" name="nome" id="nome" required  onChange={(value) => handleSetNome(value)} />
            </div>

              
              <div className={Style.field}>
                <label>Senha: </label>
                <input type="password" onChange={(value) => handleSetSenha(value)} required/>
              </div>

              <button onClick={() => handlePostUser()}>Cadastrar</button>
              <p>Já possui uma conta? <a href='/'>Clique aqui</a></p>
  
          </div>
       </fieldset>
    </div>
  )
}

export default Cadastro 