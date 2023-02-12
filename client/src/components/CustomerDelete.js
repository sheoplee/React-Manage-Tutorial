import React from "react";

class CustomerDelete extends React.Component {
    
    deleteCustomer(id) { // 아이디가 id인 고객 삭제
        // api/customers/7
        const url = 'customer/' + id;
        fetch(url, { // 해당 url에 접속해서 delete
            method: 'DELETE'
        });
        // 삭제가 이뤄지고 새로 목록 출력
        this.props.stateRefresh();
    }
    
    render() {
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;