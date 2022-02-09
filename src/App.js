import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Home';
import { genreList } from './genreList';
import { GenreComponent } from './Components/GenreComponent';


function App() {
  return (
    <div>
      {/* ********************** */}
      {/* Settingup routes */}
      {/* ********************** */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {/* ********************** */}
        {/* mapping through the list to set up routes */}
        {/* ********************** */}
        {genreList.map(({ name, route }, index) => <Route key={index} exact path={`/${route}`}><GenreComponent key={index} type={route} name={name} /></Route>)}

      </Switch>
    </div>
  );
}

export default App;


