import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import React from "react";

class CustomerDelete extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        };
      }
    
    deleteCustomer(id) { // 아이디가 id인 고객 삭제
        // api/customers/7
        const url = 'customer/' + id;
        fetch(url, { // 해당 url에 접속해서 delete
            method: 'DELETE'
        });
        // 삭제가 이뤄지고 새로 목록 출력
        this.props.stateRefresh();
    }

    
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClickClose = () => {
    this.setState({
      open: false
    });
  }
    
  
  render() {
    return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;