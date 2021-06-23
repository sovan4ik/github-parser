import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Search from './containers/Search/Search';
import SearchItem from './containers/SearchItem/SearchItem';
import Task from './components/Task/Task';

// import classes from './App.css';
class App extends Component {
  
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/">
            <Task />
            <Search />
          </Route>
          <Route exact path="/repository/:owner_login/:repo_name">
            <SearchItem />
          </Route>
        </Switch>
      </Layout>
    )
  }
}

export default App;
