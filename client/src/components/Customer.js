import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import CustomerDelete from "./CustomerDelete";

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
            {/* 부모 컴포넌트에서 넘어온 stateRefresh 함수 그내로 넘겨주면 됨 */}
            <TableCell><CustomerDelete stateRefresh = {this.props.stateRefresh} id = {this.props.id}/></TableCell>
        </TableRow>
      );
  }
}

export default Customer;