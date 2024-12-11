import jwt from 'jsonwebtoken'

let users = []

const SECRET = process.env.JWT_SECRET

function createTotken(user) {
    //jwt.sign: JWT Biblioteca JS, sign para criar o Token
    return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
    try {
        //Verifica se o token é valido e foi criado utilizando a chave secreta
        return jwt.verify(token, SECRET)
    } catch (err) {
        throw new Error('Token inválido!')
    }
}

export function verifica(token){
    return readToken(token) 
}  

export function cadastro(body) {
    //Find para buscar itens em arrays
    const user = users.find(({ email }) => email === body.email)
    if (user) throw new Error('Usuário já cadastrado!')

    users.push(body)

    const token = createTotken(body)
    return token
}

export function login(body) {
    const user = users.find(({ email }) => email === body.email)
    if (!user) throw new Error('Usuário não encontrado!')
    if (user.password !== body.password) throw new Error('Senha incorreta')

        const token = createTotken(user)
        return token
}