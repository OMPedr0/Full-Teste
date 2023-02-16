import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from '../provider/AuthRoute';


import { Profile , Dashboard, MeusHorarios, ContactDashboard, MarcarEmentas, TesteCodigo} from '../dashboard'
import { Login } from '../components'


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<AuthRoute path={''} auth={false}> <Dashboard /> </AuthRoute> }  />
                <Route path="/login" element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/marcarementas' element={<MarcarEmentas/>} />
                <Route path='/meushorarios' element={<MeusHorarios/>} />
                <Route path='/contactdashboard' element={<ContactDashboard/>} />
                <Route path='/teste' element={<TesteCodigo/>} />
            </Routes>
        </BrowserRouter>
    );
}