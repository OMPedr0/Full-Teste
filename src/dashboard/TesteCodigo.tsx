import { NavDashboard } from '../components';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { config } from '../provider/config';
import { collection, getDocs } from 'firebase/firestore';

firebase.initializeApp(config.firebaseConfig);

const firestore = firebase.firestore();

const checkmarks = firestore.collection('meals');

type Meal = {
    segunda: boolean;
    terça: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
};

export const TesteCodigo = () => {
    const [email, setEmail] = useState('');


    const auth = getAuth();

    const [meal, setMeal] = useState({
        segunda: { selected: false, mealType: "not_selected" },
        terça: { selected: false, mealType: "not_selected" },
        quarta: { selected: false, mealType: "not_selected" },
        quinta: { selected: false, mealType: "not_selected" },
        sexta: { selected: false, mealType: "not_selected" },
    });

    const [error, setError] = useState('');



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const colRef = collection(firestore, 'alunos');
                const snapshots = await getDocs(colRef);

                snapshots.docs.forEach((doc) => {
                    const data = doc.data();

                    if (data?.email === user.email) {
                        setEmail(data.email);

                    }
                });
            } else {
                setEmail('');

            }
        });
        return () => unsubscribe();
    }, [auth]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email) {
            setError('Please enter a valid email address');
            return;
        }
        firestore
            .collection('meals')
            .doc(email)
            .set(meal)
            .then(() => {
                setError('');
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
    };

    const handleChange = (day: string, selected: boolean, mealType: string) => {
        setMeal({
            ...meal,
            [day]: {
                selected: selected,
                mealType: selected ? mealType : 'not_selected'
            }
        });
    };

    return (
        <div>
            <div>
                <NavDashboard />
            </div>
            <div>
                <form className="bg-white shadow-md rounded p-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 items-center justify-center">
                        <label className="text-xl font-medium text-gray-800">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="rounded border border-gray-400 px-4 py-2"
                        />


                        <label className="text-xl font-medium text-gray-800">Segunda-Feira:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={meal.segunda.selected}
                                onChange={(event) => handleChange('segunda', event.target.checked, 'normal')}
                            />

                            <select
                                disabled={!meal.segunda.selected}
                                value={meal.segunda.mealType}
                                onChange={(event) => handleChange('segunda', meal.segunda.selected, event.target.value)}
                                className="rounded border border-gray-400 px-4 py-2"
                            >
                                <option value="not_selected" disabled >Selecione a refeição</option>
                                <option value="normal">Normal</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="nao_quero">Não Quero</option>
                            </select>
                        </div>
                        <label className="text-xl font-medium text-gray-800">Terça-Feira:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={meal.terça.selected}
                                onChange={(event) => handleChange('terça', event.target.checked, 'normal')}
                            />

                            <select
                                disabled={!meal.terça.selected}
                                value={meal.terça.mealType}
                                onChange={(event) => handleChange('terça', meal.terça.selected, event.target.value)}
                                className="rounded border border-gray-400 px-4 py-2"
                            >
                                <option value="not_selected" disabled>Selecione a refeição</option>
                                <option value="normal">Normal</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="nao_quero">Não Quero</option>
                            </select>
                        </div>
                        {/* Repeat for quarta to Sunday */}
                        <label className="text-xl font-medium text-gray-800">Quarta-Feira:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={meal.quarta.selected}
                                onChange={(event) => handleChange('quarta', event.target.checked, 'normal')}
                            />

                            <select
                                disabled={!meal.quarta.selected}
                                value={meal.quarta.mealType}
                                onChange={(event) => handleChange('quarta', meal.quarta.selected, event.target.value)}
                                className="rounded border border-gray-400 px-4 py-2"
                            >
                                <option value="not_selected" disabled>Selecione a refeição</option>
                                <option value="normal">Normal</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="nao_quero">Não Quero</option>
                            </select>
                        </div>
                        {/*quinta */}
                        <label className="text-xl font-medium text-gray-800">Quinta-Feira:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={meal.quinta.selected}
                                onChange={(event) => handleChange('quinta', event.target.checked, 'normal')}
                            />

                            <select
                                disabled={!meal.quinta.selected}
                                value={meal.quinta.mealType}
                                onChange={(event) => handleChange('quinta', meal.quinta.selected, event.target.value)}
                                className="rounded border border-gray-400 px-4 py-2"
                            >
                                <option value="not_selected" disabled>Selecione a refeição</option>
                                <option value="normal">Normal</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="nao_quero">Não Quero</option>
                            </select>
                        </div>
                        {/*sexta */}
                        <label className="text-xl font-medium text-gray-800">Sexta-Feira:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={meal.sexta.selected}
                                onChange={(event) => handleChange('sexta', event.target.checked, 'normal')}
                            />

                            <select
                                disabled={!meal.sexta.selected}
                                value={meal.sexta.mealType}
                                onChange={(event) => handleChange('sexta', meal.sexta.selected, event.target.value)}
                                className="rounded border border-gray-400 px-4 py-2"
                            >
                                <option value="not_selected" disabled>Selecione a refeição</option>
                                <option value="normal">Normal</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="nao_quero">Não Quero</option>
                            </select>
                        </div>


                        < div >
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};



