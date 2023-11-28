import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {'content-type': 'application/x-www-form-urlencoded'}
})

export const postUser = async (object) => {
    await instance.post('/cadastro', 
    {
        "email" : object.email,
        "nome": object.nome,
        "senha": object.senha

    }).then((response) => {
        return response.status
        
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

export const login = async (object) => {

    const response = await instance.post('/login', 
    
    {
        "email" : object.email,
        "senha": object.senha

    })

    console.log(response.data);

}