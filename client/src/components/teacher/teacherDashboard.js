import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllStudent, getOfflineStudent, getOnlineStudent } from '../../store/actions/teacher_actions';


class Dashboard extends Component{

    state = {
        onlineStudents: [],
        offlineStudents: [],
        totalStudents: []
    }

    getOnline = () => {
        this.props.dispatch(getOnlineStudent()).then(response => {
            this.setState({
                onlineStudents: response.payload.studentsList
            })
        })
    }

    getOffline = () => {
        this.props.dispatch(getOfflineStudent()).then(response => {
            this.setState({
                offlineStudents: response.payload.studentsList
            })
        })
    }

    getAll = () => {
        this.props.dispatch(getAllStudent()).then(response => {
            this.setState({
                totalStudents: response.payload.studentsList
            })
        })
    }

    render(){
        console.log(this.state)
        return(
            <div className="container">
                Dashboard
                <button onClick={this.getOnline}>Get Online Students</button>
                <button onClick={this.getOffline}>Get Offline Students</button>
                <button onClick={this.getAll}>Get All Students</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        teacher: state.teacher
    }
}

export default connect(mapStateToProps)(Dashboard);