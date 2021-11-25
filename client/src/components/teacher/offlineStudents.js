import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOfflineStudent } from '../../store/actions/teacher_actions';
import HeaderLogoutTeacher from '../Headers/headerLogoutTeacher';
import Table from 'react-bootstrap/Table';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class OfflineStudents extends Component{

    state = {
        offlineStudents: [],
        success: false
    }

    componentDidMount(){
        this.props.dispatch(getOfflineStudent()).then(response => {
            this.setState({
                offlineStudents: response.payload.studentsList,
                success: true
            })
        })
    }

    render(){
        console.log(this.state.offlineStudents)
        return(
            <>
            <HeaderLogoutTeacher/>
            <h1>Offline Students</h1>
            <div>
              
                {
                    this.state.success ?
                    this.state.offlineStudents.length !== 0 ?
                    
                    <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.offlineStudents.map((student, i) => (
                        <tr>
                        <td>{i}</td>
                        <td>{student.name}</td>
                        <td>{student.lastname}</td>
                        <td>{student.email}</td>
                        </tr>
                    
                        ))
                    }
                    </tbody>
                    </Table>
                    
                    : <h1>No Offline Students</h1>
                    : 
                    <div className="loader">
                        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                    </div>
                }
                
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

export default connect(mapStateToProps)(OfflineStudents);