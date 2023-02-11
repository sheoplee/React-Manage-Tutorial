import React from "react";
import axios from 'axios';

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
        fileName: ''
    };
  }

  addCustomer = () => {
    const url = 'http://localhost:5000/customer';
    const formData = new FormData();
    formData.append('id', this.state.id);
    formData.append('image', this.state.file);
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
        fileName: ''
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

  render () {
    return (
        <form onSubmit={this.handleFormSubmit}>
            <h1>고객 추가</h1>
            아이디: <input type="number" name="id" value={this.state.id} onChange={this.handleValueChange}/><br/>
            프 로 필: <input type="file" name="file" file={this.state.file} value={this.state.filename} onChange={this.handleFileChange}/><br/>
            이    름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
            성    별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            직    업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
            <button type="submit">추가하기</button>
        </form>
      );
  }
}

export default CustomerAdd;