import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

const styles = theme => ({
  root: {
    width: '100%',
    mardinTop: theme.spacing(3), //`theme.spacing(y)`
    overFlex: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit *2
  }
})

/* React LifeCycle
1) constructor()
2) componentDidMount()
3) render()
4) componentWillMount()
 * pros or state 변경 시 => shouldComponentUpdate()
*/

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers:"",
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
        customers:"",
        completed: 0
    });

    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }
  
  componentDidMount(){
    this.timer = setInterval(this.progress, 10);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/customer');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render () {
    const { classes } = this.props;
    return (
      <div>
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
              <Customer key={c[0]} id={c[0]} image={c[1]} name={c[2]} birthday={c[3]} gender={c[4]} job={c[5]} />
              )}) : 
              <TableRow>
                <TableCell colSpan="6" align='center'>
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>        
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
      );
  }
}

export default withStyles(styles)(App);
