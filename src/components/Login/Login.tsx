import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import { SiGmail } from "react-icons/si";

export  function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const user = auth.currentUser;

 const  signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen ">
            <div className="w-full p-6 m-auto bg-gray-100 rounded-lg shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-black uppercase">
                    Login
                </h1>
                <form className="mt-6">
                    <div className="mt-6">
                    </div>
                </form>
                <img
                    src={Logo}
                    alt="epf logo"
                    className="rounded-2xl mx-auto  "
                />
                <div className="flex mt-4 gap-x-2 p-4 ">
                    <button
                        type="button"
                        className="flex items-center justify-center w-full p-2 border border-gray-600 hover:bg-gray-400 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                        onClick={() => signInWithGoogle()} disabled={authing}
                    >
                        <SiGmail /> <span className='ml-2'>Gmail</span>
                    </button>
                </div>
            </div>
        </div>
    );

} export default Login;