import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Books from './components/Books/Books';
import CreateBook from './components/CreateBook/CreateBook';
import Orders from './components/Orders/Orders';
import BookDetails from './components/BookDetails/BookDetails';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#ffd740',
    },
    primary: {
      main: '#ffab00',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/login'>
            <Login />
          </Route>

          <PrivateRoute exact path="/books">
            <Books/>
          </PrivateRoute>

          <PrivateRoute exatct path="/book/:id">
            <BookDetails/>
          </PrivateRoute>

          <PrivateRoute exact path="/create-book">
            <CreateBook/>
          </PrivateRoute>

          <PrivateRoute exact path="/orders">
            <Orders/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
