import React, { Component } from 'react';
import { auth } from '../store/actions/student_actions';
import { connect } from 'react-redux';

export default function(ComposedClass, reload){

    class AuthenticationCheck extends Component{
        state = {
            loading: true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                let student = this.props.student.auth;

                this.setState({loading: false})

                if(!student){
                    if(reload)
                    {
                        this.props.history.push('/student-login')
                    }
                }else{
                    if(reload === false)
                    {
                        this.props.history.push('/admin')
                    }
                }
            })
        }

        render(){
            return(
                
                    this.state.loading ?
                    <div className="loader">Loading...</div>
                    : <ComposedClass {...this.props} student={this.props.student}/>
     
            )
        }
    }

    function mapStateToprops(state){
        return {
            student: state.student
        }
    }

    return connect(mapStateToprops)(AuthenticationCheck);

}