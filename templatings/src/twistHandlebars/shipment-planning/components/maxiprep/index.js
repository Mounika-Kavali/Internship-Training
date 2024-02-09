import { Route, IndexRedirect } from 'react-router';

import Root from './components/root';
import Planning from './components/planning/plan-controller';
import Hitpicking from './components/hitpicking/run-controller';


const routes = (path) => {
    return (
    <Route path={ path } component={Root}>
            {/* <IndexRedirect to="planning"/> */}
            <Route path="planning" component={ Planning }/>
            <Route path="hitpicking" component={ Hitpicking }/>
    </Route>
    );
};

export default routes;