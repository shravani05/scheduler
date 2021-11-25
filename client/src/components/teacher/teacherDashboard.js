import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllStudent, getOfflineStudent, getOnlineStudent } from '../../store/actions/teacher_actions';
import HeaderDashboardTeacher from '../Headers/headerDashboardTeacher';
import Image from 'react-bootstrap/Image';;

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
            <>
            <HeaderDashboardTeacher/>
            <div className="teacher-dashboard">
                <Image src="./images/teacher-dashboard.png" fluid className = "img"/>
                <h1>Welcome to the dashboard. Explore above options to see student roster and class details.</h1>
            </div>
            </>
        )
    }
}

function mapStateToProps(state){
    return{
        teacher: state.teacher
    }
}

export default connect(mapStateToProps)(Dashboard);