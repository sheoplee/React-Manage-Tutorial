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

const customers = [
  {
    id: 1,
    image: 'https://placeimg.com/32/32/1',
    name: "홍길동",
    birthday: "970219",
    gender: "남자",
    job: "대학생"
  },
  {
    id: 2,
    image: 'https://placeimg.com/64/64/2',
    name: "김아무개",
    birthday: "881219",
    gender: "여자",
    job: "회사원"
  },
  {
    id: 3,
    image: 'https://placeimg.com/64/64/3',
    name: "이순신",
    birthday: "781219",
    gender: "남자",
    job: "디자이너"
  }
]

class App extends Component {
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
          { customers.map(c => { return (
            <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name = {c.name}
            birthday = {c.birthday}
            gender = {c.gender}
            job = {c.job}
            />
            )})
          }
        </TableBody>
      </Table>        
      </Paper>
      );
  }
}

export default withStyles(styles)(App);
