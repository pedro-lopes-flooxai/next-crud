
import Layout from "../components/Layout"; 
import Tabela from "../components/Tabela"; 
import Cliente from "../core/Cliente"; 

export default function Home() { 

const clientes = [ 
    new Cliente('Ana', 34, '1')
]

return ( 
    <div className={`
        flex justify-center items-center h-screen 
        bg-gradient-to-rfrom-blue-500to-purple-500 
        text-white 
    `}> 
    <Layout titulo="Cadastro Simples"> 
        <Tabela clientes></Tabela> 
    </Layout> 
    </div> 
    )
}