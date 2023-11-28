class User:
    def __init__(self, nome, email, senha):
        self.__nome = nome,
        self.__email = email,
        self.__senha = senha
    
    @property
    def nome(self):
        return self.__nome
    
    @property
    def email(self):
        return self.__email
    
    @property
    def senha(self):
        return self.__senha


class Task:
    def __init__(self, user_email, descricao,  status):
        self.__descricao = descricao
        self.__user_email = user_email
        self.__status = status
    
    @property
    def descricao(self):
        return self.__descricao
    
    @property
    def user_email(self):
        return self.__user_email
    
    @property
    def status(self):
        return self.__status
