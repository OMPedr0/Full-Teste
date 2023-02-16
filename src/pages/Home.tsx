import { Nav } from '../components';
import image1 from "../assets/carro.png";
import image2 from "../assets/industria.png";
export function Home()  {


  return (
      <div>
        <div>
        <div>
          <Nav />
        </div>
        <div className="flex flex-row">
        <div className="flex-1 bg-gray-100 p-8">
          <img src={image1} alt="Imagem do card 1" />
          <h2 className="text-xl font-bold mt-4">Título do card 1</h2>
          <p className="mt-2">
            Descrição do card 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex-1 bg-gray-200 p-8">
          <img src={image2} alt="Imagem do card 2" />
          <h2 className="text-xl font-bold mt-4">Título do card 2</h2>
          <p className="mt-2">
            Descrição do card 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
        </div>
      </div>

    );
} 

