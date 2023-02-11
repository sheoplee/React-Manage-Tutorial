import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

class Customer extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
        <TableRow>
            <TableCell>({this.props.id})</TableCell>
            <TableCell><img src={this.props.image} alt="profile"/></TableCell>
            <TableCell>{this.props.name}</TableCell>
            <TableCell>{this.props.birthday}</TableCell>
            <TableCell><p>{this.props.gender}</p></TableCell>
            <TableCell><p>{this.props.job}</p></TableCell>
        </TableRow>
      );
  }
}

export default Customer;