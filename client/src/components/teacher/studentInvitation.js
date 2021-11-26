import React, { Component } from 'react';
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
                            if(!this.props.classSub.auth){
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
        classSub: state.classSub
    }
}

export default connect(mapStateToProps)(StudentInvitation);