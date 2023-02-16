import { NavDashboard } from '../components';
import { useState } from 'react';



import Horario from '../assets/horarios/1Ano/1pi.png'




export function MeusHorarios() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  interface props {
    title: string,
    subTitle: string
  }



  return (


    <div>
      <div>
        <NavDashboard />
        <h1>Meus Horarios</h1>
      </div>
      <div className="card w-64 max-w-sm overflow-hidden shadow-lg" style={{ maxWidth: 350 }}>
        <img className="w-full h-64" src={Horario} alt="Horaio" onClick={handleOpen} />
        <div className="p-5">
          <h5 className="font-bold text-lg">Title</h5>
          <p className="text-gray-700">Teste</p>
        </div>
        <div className={`${open ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black bg-opacity-75`} onClick={handleClose}>
          <img src={Horario} alt="Ampliada" className="m-auto" />
        </div>
      </div>
    </div>
  );
}




