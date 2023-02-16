
import { NavDashboard } from '../components';

import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

import logo from "../assets/logo.png";

export function ContactDashboard() {
  const address = "Rua Cidade de Salamanca, nº 1\nFundão CB 6230-370\nPortugal";
  const phone1 = "+(351) 275 779 050";
  const phone2 = "+(351) 275 779 059";
  const email = "info@epfundao.edu.pt";



  return (
    <div>
      <div>
        <NavDashboard />
      </div>
      <div className='p-10'>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img src={logo} alt="Logo da escola" className='w-20 p-5'/>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Informações de contato</div>
              <div className='flex items-center mb-4'>
              <FiMail size={20} className="text-gray-600 mr-2" />
              <p  className="mt-2 text-gray-500">{address}</p>
              </div>
     
              <div className='flex items-center mb-4'>
              <FiPhone size={20} className="text-gray-600 mr-2" />
              <p className="mt-2 text-gray-500">{phone1} <br /> {phone2} </p>
              </div>
              
              <div className='flex items-center mb-4'>
              <FiMail size={20} className="text-gray-600 mr-2" />
              <p className="mt-2 text-gray-500">{email}</p>
              </div>
             
      
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

