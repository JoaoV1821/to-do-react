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

export const postTodo = async (object) => {
    const response = await instance.post('/todo/post', 
        {
            "email": object.email,
            "descricao": object.descricao,
            "status" : object.status

        }    
    )

    console.log(response)
}

export const getTasks = async (email) => {
    const response = await instance.get(`todo/${email}`);

    console.log(response.data);
    return response.data;
}


export const deleteTask = async (id) => {
    const response = await instance.delete(`todo/${id}`)
    console.log(response)
}


export const updateStatus = async (object) => {
    const response = await instance.put(`todo/${object.id}`,{
        "email": object.email,
        "status": object.status
    })

    console.log(response);
}