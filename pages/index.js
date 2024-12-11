
import { getCookie } from "cookies-next"
import { useEffect } from "react"
import { verifica } from '../services/user'
import { redirect } from "next/dist/server/api-utils"

export default function Home() {
  return (
    <div>
      Página segura - Perfil do usuário
    </div>
  )
}
//{} indicam um objeto
export const getServerSideProps = async ({ req, res }) => {
  try {
    const token = getCookie('authorization', { req, res })
    if (!token) throw new Error('Token inválido!')

    verifica(token)
    return {
      props: {}
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }

}