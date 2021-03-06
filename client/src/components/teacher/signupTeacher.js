import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signupTeacher } from '../../store/actions/teacher_actions';
import { Link } from "react-router-dom";
import Header from '../Headers/header';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
    .required('Required !!'),
    lastname: Yup.string()
    .required('Required !!'),
    password: Yup.string()
    .min(6, 'Too short !!')
    .required('Required !!'),
    email: Yup.string()
    .email('Invalid email :(')
    .required('Required !!')
})


class SignupTeacher extends Component {
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
            this.props.history.push('/class-register');
        }
    }

    render(){
        return(
            <>
            <Header/>
            <div className="form_container">
                <h1>Welcome!</h1>
                <hr/>
                <h4>Sign up here:</h4>
                <Formik
                    initialValues={{name: "", lastname: "", email: "", password: ""}}
                    validationSchema={SignupSchema}
                    onSubmit = {values => {
                        this.props.dispatch(signupTeacher(values)).then(response => {
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
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        placeholder="Enter your first name"
                                        className="u-full-width"
                                    />
                                    { errors.name && touched.name ?
                                        <div className="error_label">{errors.name}</div>
                                    : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                        type="text"
                                        name="lastname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastname}
                                        placeholder="Enter your last name"
                                        className="u-full-width"
                                    />
                                    { errors.lastname && touched.lastname ?
                                        <div className="error_label">{errors.lastname}</div>
                                    : null}
                                </div>
                            </div>

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
                                SIGN UP
                            </button>

                            <p className="transfer-text">
                                Already have an account? <Link className = "link" to="/teacher-login">Log in</Link> instead.
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

export default connect(mapStateToProps)(SignupTeacher);