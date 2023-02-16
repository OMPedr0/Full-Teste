import { useState } from 'react';
import Logo from '../../assets/logo.png'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { SiGmail } from "react-icons/si";

export function Nav() {
    const [navbar, setNavbar] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const user = auth.currentUser;

    const ALLOWED_DOMAIN = "@epfundao.edu.pt";

    const checkEmailDomain = (email: string) => {
        return email.endsWith(ALLOWED_DOMAIN);
    };

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                const user = response.user;
                if (!user.email) {
                    alert("Não foi possível obter o endereço de e-mail do usuário");
                    setAuthing(false);
                    return;
                }
                const email = user.email;
                if (checkEmailDomain(email)) {
                    console.log(response.user.uid);
                    navigate('/dashboard');
                } else {
                    alert("Endereço de e-mail não é do domínio permitido");
                    setAuthing(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };


    return (
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href='/' >
                            <img
                                src={Logo}
                                alt="epf logo"
                                className="rounded-2xl mx-auto w-20 "
                            />
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-gray-600 hover:text-blue-600">
                                <a href="/">Home</a>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <a href="/ementas">Ementas</a>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <a href="/horarios">Horarios</a>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <a href="/contact">Contact</a>
                            </li>
                            <button
                                type="button"
                                className="flex items-center justify-center w-full p-2 border border-gray-600 hover:bg-gray-400 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                                onClick={() => signInWithGoogle()} disabled={authing}
                            >
                                <SiGmail /> <span className='ml-2'>Gmail</span>
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

