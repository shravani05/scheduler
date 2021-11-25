import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { inviteStudent } from '../../store/actions/class_actions';
import HeaderLogoutTeacher from '../Headers/headerLogoutTeacher';


const InviteSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email :(')
    .required('Required !!')
})


class StudentInvitation extends Component{

    state = {
        success: false,
        validation: false
    }

    static getDerivedStateFromProps(props, state){
        const auth = props.classSub.auth;
        if(auth){
            return{
                success: auth ? true : false
            }
        }
        return null;
    }

    componentDidUpdate(){
        if(this.state.success){
        //    alert("Invited Successfully.")
        }
    }

    render(){
        return(
            <>
            <HeaderLogoutTeacher/>
            <div className="form_container invite_container">
                <h4>Student Invitation:</h4>

                <Formik
                    initialValues={{email: ""}}
                    validationSchema={InviteSchema}
                    onSubmit = {(values, {resetForm}) => {
                        this.props.dispatch(inviteStudent(values)).then(response => {
                            console.log(values.email)
                            if(!this.props.classSub.auth){
                                // this.setState({
                                //     validation: true
                                // })
                                alert("Error, student not found. Please check the email id again.")
                            }else{
                                alert("Invited Successfully.")
                            }
                        })
                        resetForm({})
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
                                <div className="label-form">Enter student email to invite: </div>
                                <div className="twelve columns">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter student email id"
                                        className="u-full-width"
                                    />
                                    { errors.email && touched.email ?
                                        <div className="error_label">{errors.email}</div>
                                    : null}
                                </div>
                            </div>

                            <button type="submit">
                                INVITE
                            </button>

                            {/* {
                                this.state.validation ?
                                
                                <div className="error_label">
                                    Error, student not found. Please check the email id again.
                                </div>
                                : null
                            } */}
                        </form>
                    )}
                </Formik>
                <Link to="/teacher-dashboard">Teacher Dashboard</Link>
            </div>
            </>
        )
    }
}
function mapStateToProps(state){
    console.log(state)
    return{
        classSub: state.classSub
    }
}

export default connect(mapStateToProps)(StudentInvitation);