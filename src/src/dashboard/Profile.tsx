//React
import { useState, useEffect } from 'react';
//NavBar
import { NavDashboard } from '../components';
//Firebase
import { db } from '../provider/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
//LogoUser
import logouser from "../assets/logouser.png";

interface Props {
  src: string;
  alt: string;
}

export function Profile() {
  const auth = getAuth(); // Recuperar a instância do objeto auth.

  const [email, setEmail] = useState<string>(''); //Guardar email
  const [nome, setNome] = useState<string>(''); //Guardar nome
  const [processo, setProcesso] = useState<string>(''); //Guardar processo
  const [curso, setCurso] = useState<string>(''); //Guardar curso
  const [turma, setTurma] = useState<string>(''); //Guardar turma

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const colRef = collection(db, 'alunos');
        const snapshots = await getDocs(colRef);

        snapshots.docs.forEach((doc) => {
          const data = doc.data();

          if (data?.email === user.email) {
            setEmail(data.email);
            setNome(data.nome);
            setProcesso(data.id);
            setCurso(data.curso);
            setTurma(data.turma);
          }
        });
      } else {
        setEmail('');
        setNome('');
        setProcesso('');
        setCurso('');
        setTurma('');
      }
    });
    return () => unsubscribe();
  }, [auth]);


  return (
    <div>
      <NavDashboard />
      <div className='p-10'>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
            <img src={logouser} alt="Image description" className=' w-20 p-5'  />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Informações do aluno</div>
              <p className="mt-2 text-gray-500">Email: {email}</p>
              <p className="mt-2 text-gray-500">Nome: {nome}</p>
              <p className="mt-2 text-gray-500">Processo: {processo}</p>
              <p className="mt-2 text-gray-500">Curso: {curso}</p>
              <p className="mt-2 text-gray-500">Turma: {turma}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

