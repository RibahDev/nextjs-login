import { login } from "../../../services/user";


//req = Parametros de requisições | res: Parametros de Respostas
export default function handler(req, res) {
    try {
        const user = login(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err.message)
    }
}