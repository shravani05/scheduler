import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { connect } from 'react-redux';
import { getEventClass } from '../../store/actions/class_actions';
import { addOfflineStudent, addOnlineStudent } from '../../store/actions/teacher_actions';
import HeaderLogoutStudent from '../Headers/headerLogoutStudent';

class Class extends Component{

    state = {
        data: [{
            Subject: "",
            StartTime: "",
            EndTime: "",
            RecurrenceRule: "",
            IsReadonly: true
        }],
        teacherId: "",
        disabled: false
    }

    componentDidMount(){
        this.props.dispatch(getEventClass(this.props.match.params.classId)).then(response => {
            let event = response.payload.classEvent;
            this.setState({
                data:[{
                    Subject: event.slotSubject,
                    StartTime: event.slotStartTime,
                    EndTime: event.slotEndTime,
                    RecurrenceRule: event.slotRecurrenceRelation,
                    IsReadonly: true
                }],
                teacherId: event.teacherId
            })
        })
    }

    onOnlineClick = () => {
        this.props.dispatch(addOnlineStudent(this.state.teacherId)).then(response => {
            console.log("Online added")
            this.setState({
                disabled: true
            })
        })
    }

    onOfflineClick = () => {
        this.props.dispatch(addOfflineStudent(this.state.teacherId)).then(response => {
            console.log("Offline added")
            this.setState({
                disabled: true
            })
        })
    }

    render(){
        console.log(this.props.match.params.classId)
        return(
            <>
            <HeaderLogoutStudent/>
            <div className="container class_book_container">
                <h2>Class Schedule:</h2>
                <ScheduleComponent height='550px' eventSettings={{ dataSource: this.state.data }}
                IsReadonly={true}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>

                <h2>Choose your preference</h2>
                <button onClick={this.onOnlineClick} disabled={this.state.disabled}>Online</button>
                <button onClick={this.onOfflineClick} disabled={this.state.disabled}>Offline</button>

                {
                    this.state.disabled ?
                    
                    <h2>Your preference has been submitted.</h2>

                    : null
                }
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

export default connect(mapStateToProps)(Class); 