import { Route, IndexRedirect } from 'react-router';

import Root from './components/root';
import ShipmentPlanningHome from './components/home';
import ShipmentPlanRelease from './components/release';

import MaxiPrep from './components/maxiprep/index';
import MiniPrep from './components/miniprep/index';


const ROOT_ROUTE = "SHIPMENT_PLANNING";

export const apps = [
    {
        name: `${ROOT_ROUTE}/hitpick`
        , label: 'Hitpick'
       
    },
    {
        name: `${ROOT_ROUTE}/release`
        , label: 'Release'
    },
];

const ShipmentPlanningApp = (
    <Route path={ `/${ROOT_ROUTE}` } component={Root}>
        <IndexRedirect to="hitpick"/>
        <Route path="hitpick" component={ ShipmentPlanningHome }/>
        <Route path="release" component={ ShipmentPlanRelease }/>
       
        { MiniPrep('miniprep')}
        { MaxiPrep('maxiprep')}
        
    </Route>
)
export default ShipmentPlanningApp;
