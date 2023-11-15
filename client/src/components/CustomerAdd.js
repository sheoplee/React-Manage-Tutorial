import React from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hidden : {
    display: 'none'
  }
});

class CustomerAdd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        id: 0,
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
    };
  }

  addCustomer = () => {
    const url = 'http://localhost:5000/customer';
    const formData = new FormData();
    formData.append('id', this.state.id);
    formData.append('image', this.state.file);
    formData.append('filename', this.state.file.name);
    formData.append('name', this.state.userName);
    formData.append('birthday', this.state.birthday);
    formData.append('gender', this.state.gender);
    formData.append('job', this.state.job);
    const config = {
        header: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer()
        .then((res) => {
            console.log(res.data);
            this.props.stateRefresh();
        });
    this.setState({
        id: 0,
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
    });
  }

  handleFileChange = (e) => {
    this.setState({
        file: e.target.files[0],
        fileName: e.target.value
    })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClickClose = () => {
    this.setState({
      id: 0,
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    });
  }
  render () {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClickClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file">
                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
              </Button>
            </label>
            <br/>
            <TextField label="아 이 디" type="number" name="id" value={this.state.id} onChange={this.handleValueChange}/><br/>
            <TextField label="이    름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
            <TextField label="성    별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            <TextField label="직    업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
      );
  }
}

export default withStyles(styles)(CustomerAdd);