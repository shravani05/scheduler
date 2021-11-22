import React, { Component } from 'react';
import { auth } from '../store/actions/teacher_actions';
import { connect } from 'react-redux';

export default function(ComposedClass, reload){

    class AuthenticationCheck extends Component{
        state = {
            loading: true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                let teacher = this.props.teacher.auth;

                this.setState({loading: false})

                if(!teacher){
                    if(reload)
                    {
                        this.props.history.push('/teacher-login')
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
                    : <ComposedClass {...this.props} teacher={this.props.teacher}/>
     
            )
        }
    }

    function mapStateToprops(state){
        return {
            teacher: state.teacher
        }
    }

    return connect(mapStateToprops)(AuthenticationCheck);

}