import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSubjects } from '../../store/actions/student_actions';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCard, CCardImage, CCardBody, CCardTitle } from '@coreui/react';
import HeaderDashboardStudent from '../Headers/headerDashboardStudent';

class ClassesDashboard extends Component{

    state = {
        success: false,
        subjects: []
    }

    componentDidMount(){
        this.props.dispatch(getSubjects()).then(response => {
            this.setState({
                success: true,
                subjects: response.payload.subjects
            })
        })
    }

    listClasses = (values) => (
        values ?
              values.map( item => (
                  <Link
                      key={item._id}
                      to={`/class/${item._id}`}
                      className="link_classes_cards"
                  >
                    <CCard className="classes_cards" style={{ width: '28rem' }}>
                    <CCardImage orientation="top" src="/images/classes.png" />
                    <CCardBody>
                    <CCardTitle className="class-title">{item.classname}</CCardTitle>
                    </CCardBody>
                    </CCard>
                </Link>
              ))
        : null
      )

    render(){

        console.log(this.state.success)
        console.log(this.state.subjects)
        return(
            <>
            <HeaderDashboardStudent/>
            <div className="container class_container">
                {
                    this.state.success ?
                    <>
                    <h2>Your classes are displayed below:</h2>
                    {this.listClasses(this.state.subjects)}
                    </>
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
        student: state.student
    }
}

export default connect(mapStateToProps)(ClassesDashboard);
