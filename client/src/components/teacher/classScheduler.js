import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { addEventClass } from '../../store/actions/class_actions';
import { connect } from 'react-redux';
import Header from '../Headers/header';

class ClassScheduler extends Component{

    state = {
        success: false
    }

    componentDidUpdate(){
        if(this.state.success){
            console.log("success");
            alert("Class scheduled successfully. Move ahead to invite students.")
            this.props.history.push('/invite-students')
        }
    }


    onDataBound = () => {
        let event = this.scheduleObj.getEvents();
        console.log(event)

        this.props.dispatch(addEventClass(event[0])).then(response => {
            let newEvent = response.payload.classEvent;
            // newEvent.slotSubject ?
            this.setState({
                success: newEvent.slotSubject === "" ? true : false
            })
            // : this.setState({ success: false })
        })
    }

    render(){
        return(
            <>
            <Header/>
            <div className="container dashboard_container">
                <h1>Schedule your class: </h1>
                <ScheduleComponent height='550px' ref={t => this.scheduleObj = t}  
                dataBound={this.onDataBound.bind(this)} >
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>
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

export default connect(mapStateToProps)(ClassScheduler);