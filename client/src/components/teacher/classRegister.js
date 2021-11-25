import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addClass } from '../../store/actions/class_actions';
import Header from '../Headers/header';

const classSchema = Yup.object().shape({
    classname: Yup.string()
    .required('Required !!'),
    availableSlots: Yup.string()
    .required('Required !!'),
})


class ClassRegister extends Component{

    state = {
        success: false
    }

    componentDidUpdate(){
        if(this.state.success){
            this.props.history.push('/teacher-scheduler');
        }
    }
    
    render(){
        return(
            <>
            <Header/>
            <div className="form_container">
                <h2>Enter Class Details:</h2>
                <Formik
                    initialValues={{classname: "", availableSlots: ""}}
                    validationSchema={classSchema}
                    onSubmit = {values => {
                        this.props.dispatch(addClass(values)).then(response => {
                            this.setState({
                                success: true
                            })
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
                                    <div className="label-form">Class Name:</div>
                                    <input
                                        type="text"
                                        name="classname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.classname}
                                        placeholder="Enter your class name"
                                        className="u-full-width"
                                    />
                                    { errors.classname && touched.classname ?
                                        <div className="error_label">{errors.classname}</div>
                                    : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="twelve columns">
                                    <div className="label-form">Available slots:</div>
                                    <input
                                        type="text"
                                        name="availableSlots"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.availableSlots}
                                        placeholder="Enter available slots for offline class"
                                        className="u-full-width"
                                    />
                                    { errors.availableSlots && touched.availableSlots ?
                                        <div className="error_label">{errors.availableSlots}</div>
                                    : null}
                                </div>
                            </div>

                            <button type="submit">
                                SUBMIT
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
    return {
        classSub: state.classSub
    }
}

export default connect(mapStateToProps)(ClassRegister);
