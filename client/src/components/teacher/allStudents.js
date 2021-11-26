import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllStudent } from '../../store/actions/teacher_actions';
import HeaderLogoutTeacher from '../Headers/headerLogoutTeacher';
import Table from 'react-bootstrap/Table';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class AllStudents extends Component{

    state = {
        allStudents: [],
        success: false
    }

    componentDidMount(){
        this.props.dispatch(getAllStudent()).then(response => {
            this.setState({
                allStudents: response.payload.studentsList,
                success: true
            })
        })
    }

    render(){
        return(
            <>
            <HeaderLogoutTeacher/>
            <div className="table_conatiner">
            <h1>All Students</h1>
            <div  className="table">
              
                {
                    this.state.success ?
                    this.state.allStudents ?
                    
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
                        this.state.allStudents.map((student, i) => (
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
                    
                    : <h1>No Students</h1>
                    : 
                    <div className="loader">
                        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                    </div>
                }
                
            </div>
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

export default connect(mapStateToProps)(AllStudents);