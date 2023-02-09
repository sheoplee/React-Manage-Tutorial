import { Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';

const styles = theme => ({
  root: {
    width: '100%',
    mardinTop: theme.spacing(3), //`theme.spacing(y)`
    overFlex: "auto"
  },
  table: {
    minWidth: 1080
  }
})

class App extends Component {

  state = {
    customers:""
  }

  componentDidMount(){
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('http://localhost:5000/api/customers');
    const body = await response.json();
    return body;
  }

  render () {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
       <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { this.state.customers ? this.state.customers.map(c => { return (
            <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name = {c.name}
            birthday = {c.birthday}
            gender = {c.gender}
            job = {c.job}
            />
            )}) : ""
          }
        </TableBody>
      </Table>        
      </Paper>
      );
  }
}

export default withStyles(styles)(App);
