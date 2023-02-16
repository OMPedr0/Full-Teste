import { NavDashboard } from '../components';
//React
import { useState, useEffect } from 'react';
//Firebase
import { db } from '../provider/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
//LogoUser
import logouser from "../assets/logouser.png";

export function Dashboard() {

  const auth = getAuth(); // Recuperar a instância do objeto auth.

  const [email, setEmail] = useState<string>(''); //Guardar email
  const [nome, setNome] = useState<string>(''); //Guardar nome


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

          }
        });
      } else {
        setEmail('');
        setNome('');
      }
    });
    return () => unsubscribe();
  }, [auth]);


  return (
    <div>
      <div>
        <NavDashboard />
      </div>
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl w-15 mr-5">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img src={logouser} alt="Image description" className=' w-20 p-5' />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Acount</div>
              <p className="mt-2 text-gray-500">Nome: {nome}</p>
              <p className="mt-2 text-gray-500">Email: {email}</p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Bem-vindo à dashboard!</h2>
      </div>

    </div>
  );
}

