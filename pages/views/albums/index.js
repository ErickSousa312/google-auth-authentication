import { useRouter } from 'next/router';
import { useContext } from "react";


export async function getServerSideProps(context) {

  const dados = "teste";

  console.log(dados)

  return {
    props: {
      dados2: dados ,
    },
  };
}

export default function PrivateArea({ dados2 }) {

  function deslogar() {
    console.log(dados2);
  }

  return (
    <div>
      <button onClick={deslogar}>oi{dados2}oi</button>
    </div>
  );
}
