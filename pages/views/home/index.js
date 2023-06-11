import { useReducer, useState, useEffect } from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '@/styles/views/home.module.css'
import Button from '@/components/Button/button'
import Navbar from '@/components/Navbar'
import Button2 from '@/components/Button/button2'
import { MdHistory, MdArrowForwardIos, MdArticle,MdOutlinePeople } from 'react-icons/md';
import { FcGoogle } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";
import { HiOutlineMail, HiLockClosed, HiHome, } from "react-icons/hi";
import { BsPeople} from "react-icons/bs";
import { CgProfile,CgReadme} from "react-icons/cg";
import Btn from '@/components/Button/login-btn'
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';

export async function verifyAuth(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    }
  }
  return null
}

function reducer(dados, action) {
  switch (action.type) {
    case 'setDados':
      console.log(dadosLogin)
      return { ...dadosLogin, email: action.payload };
    default:
      throw new Error('Tipo de ação desconhecido.');
  }
}

export default function PrivateArea() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dadosEleicao, dispath] = useReducer(reducer, {});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://jsonplaceholder.typicode.com/albums');
        if (response.ok) {
          const data = await response.json();
          setDados(data);
          console.log(data)
          setErro(null);
        } else {
          const error = await response.json();
          setDados(null);
          setErro(error.message);
        }
      } catch (error) {
        setDados(null);
        setErro('Ocorreu um erro ao processar sua solicitação.');
      }
    }
    fetchData();
  }, []);
 
  
  async function deslogar(todo){
    router.push(`/views/albums/${todo}`)
    console.log(todo)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.barNavitaion} >
          <Button2
           LinkTO = {"/views/home"}
          fontSize={"19px"}
            padding={"12px 19px"}
            
            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}>
            <CgProfile className={styles.iconGoogle} size={20}></CgProfile>
            teste
          </Button2>
          
          <Button2
           LinkTO = {"/views/votar"}
            fontSize={"19px"}
            margin={"4px 0px"}
            padding={"10px 14px"}
            margintop={"1rem"}
            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}>
              <CgReadme className={styles.iconGoogle} size={22}></CgReadme>
            teste
          </Button2>
          <Button2
                        LinkTO = {"/views/eleicao"}
                        fontSize={"19px"}
                        margin={"4px 0px"}
                        padding={"10px 14px"}
                        margintop={"1rem"}
                        backgroundColor={'white'}
                        border={'none'}
                        cor={"black"}
                        width={"89%"}
                        >
                        <CgReadme className={styles.iconGoogle} size={22}></CgReadme>
                        teste
                    </Button2>
          <button className={styles.buttonLogOut} onClick={() => deslogar()}>Sair</button>
        </div>
        <div className={styles.areaData}> 
        <div className={styles.grid}>
            {dados?.map((todo) => (
              <button key={todo.id} className={styles.item} onClick={()=>deslogar(todo.userId)}>
                {todo.userId}<br/>
                {todo.title}

              </button>
            ))}
        </div>
        {session ? 
        <div>{session.user.name}<br/>{session.user.email}</div> : <div>Usuário não logado</div>}
        </div>
      </div>
    </div>

  )
}

