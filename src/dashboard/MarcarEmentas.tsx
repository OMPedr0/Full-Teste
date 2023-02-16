import { NavDashboard } from '../components';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { config } from '../provider/config';

firebase.initializeApp(config.firebaseConfig);

const firestore = firebase.firestore();

const checkmarks = firestore.collection('maels');

interface Meal {
  id: string;
  name: string;
}

interface MarkedMeal {
  meal: Meal;
  day: string;
}


export function MarcarEmentas() {

  const [meals, setMeals] = useState<Meal[]>([{ id: "Almoço", name: "Normal" }, { id: "Vegetariano", name: "Vegetariano" }]);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>(["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"]);
  const [markedMeals, setMarkedMeals] = useState<MarkedMeal[]>([]);
  const [checked, setChecked] = useState(true);


  const auth = getAuth();
  const user = auth.currentUser;

  const handleMealMark = (meal: Meal, day: string) => {
    setMarkedMeals([...markedMeals, { meal, day }]);
  };

  const handleMealUnmark = (mealId: string) => {
    setMarkedMeals(markedMeals.filter(meal => meal.meal.id !== mealId));
  };




  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const weekdays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
    const checkedMeals = markedMeals.filter(meal => markedMeals);
    const sortedCheckedMeals = checkedMeals.sort((a, b) => weekdays.indexOf(a.day) - weekdays.indexOf(b.day));
    if (user && user.email) {
      firestore.collection("marcar").doc(user.email).get().then(doc => {
        if (doc.exists) {
          alert("Você já marcou refeições para essa semana. Edite as refeições marcadas anteriormente.");
        } else {
          const email = user?.email || "";
          firestore.collection("marcar").doc(email).set({
            marcadas: sortedCheckedMeals.map(meal => ({ meal: meal.meal, day: meal.day }))
          });
          alert("Refeições marcadas com sucesso!");
        }
      });
    } else {
      alert("Usuário não está logado. Não é possível marcar refeições.");
    }
  };



  return (
    <div className="w-full">
      <NavDashboard />
      <table className="w-full text-left table-collapse">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Dia da semana</th>
            <th className="px-4 py-2">Refeições disponíveis</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map(day => (
            <tr key={day}>
              <td className="border px-4 py-2">{day}</td>
              <td className="border px-4 py-2">
                {meals.map(meal => (
                  <div key={meal.id} className="inline-block mr-4">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id={`${meal.id}-${day}`}
                      disabled={!checked || markedMeals.some(m => m.meal.id !== meal.id && m.day === day)}
                      onChange={e => {
                        if (e.target.checked) {
                          handleMealMark(meal, day);
                        } else {
                          handleMealUnmark(meal.id);
                        }
                      }}
                    />
                    <label htmlFor={`${meal.id}-${day}`}>{meal.name}</label>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit} >
        Submit
      </button>
    </div>
  );

};

