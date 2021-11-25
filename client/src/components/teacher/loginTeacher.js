import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginTeacher } from '../../store/actions/teacher_actions';
import { Link } from "react-router-dom";
import Header from '../Headers/header';

const LoginSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, 'Too short !!')
    .required('Required !!'),
    email: Yup.string()
    .email('Invalid email :(')
    .required('Required !!')
})


class LoginTeacher extends Component {
    state = {
        success: false,
        validation: false
    }

    static getDerivedStateFromProps(props, state){
        const auth = props.teacher.auth;
        if(auth){
            return{
                success: auth ? true : false
            }
        }
        return null;
    }

    componentDidUpdate(){
        if(this.state.success){
            this.props.history.push('/teacher-dashboard');
        }
    }

    render(){
        console.log(this.props)
        return(
            <>
            <Header/>
            <div className="form_container">
                <h1>Welcome back!</h1>
                <hr/>
                <h4>Login here:</h4>
                <Formik
                    initialValues={{email: "", password: ""}}
                    validationSchema={LoginSchema}
                    onSubmit = {values => {
                        this.props.dispatch(loginTeacher(values)).then(response => {
                            if(!this.props.teacher.auth){
                                this.setState({
                                    validation: true
                                })
                            }
                        })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter your email"
                                        className="u-full-width"
                                    />
                                    { errors.email && touched.email ?
                                        <div className="error_label">{errors.email}</div>
                                    : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Enter your password"
                                        className="u-full-width"
                                    />
                                    { errors.password && touched.password ?
                                        <div className="error_label">{errors.password}</div>
                                    : null}
                                </div>
                            </div>

                            <button type="submit">
                                Login
                            </button>

                            <p className="transfer-text">
                                Don't have an account? <Link className = "link" to="/teacher-signup">Sign up</Link> instead.
                            </p>
                            <br/>
                            {
                                this.state.validation ?
                                <div className="error_label">
                                    Error, please try again.
                                </div>
                                : null
                            }
                        </form>
                    )}
                </Formik>
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

export default connect(mapStateToProps)(LoginTeacher);