import './style.css';

import React, { useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import Main from './Main';
import Exam from './Exam';
import { ThemeContext, themes, UserContext, user as us } from './ThemeContext';

const App = () => {
  const [theme, setTheme] = useState(themes.dark);

  const [user, setUser] = useState(us);
  const history = useHistory();
  const location = useLocation().pathname;
  const themeChangeHandler = (color) => {
    setTheme(color);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <header className="App-header">
            <div>
              Theme Color
              <button
                className="Button"
                style={{
                  background: 'blue',
                }}
                onClick={() => themeChangeHandler(themes.blue)}
              />
              <button
                className="Button"
                style={{
                  background: 'red',
                }}
                onClick={() => themeChangeHandler(themes.red)}
              />
            </div>
            <div
              onClick={() => history.push('/')}
              style={{ cursor: 'pointer' }}
            >
              IndexDb
            </div>
            {!location.includes('/Exam') && (
              <div
                style={{ paddingRight: '10px', cursor: 'pointer' }}
                onClick={() => {
                  const url = '/Exam';
                  history.push(url);
                }}
              >
                Start Exam
              </div>
            )}
          </header>
          <div className="Main">
            <Switch>
              <Route path="/Exam" render={() => <Exam />} />
              {/* <Route path="/" render={() => <Main />} /> */}
            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
