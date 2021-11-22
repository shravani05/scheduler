import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { addEventClass, getEventClass } from '../../store/actions/class_actions';
import { connect } from 'react-redux';

class Dashboard extends Component{

    // state = {
    //     data: [{
    //         Id: 2,
    //         Subject: 'Paris',
    //         StartTime: new Date(2021, 10, 20, 10, 0),
    //         EndTime: new Date(2021, 10, 20, 12, 30),
    //         IsAllDay: false,
    //         RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5'
    //     }]
    // } eventSettings={{ dataSource: this.state.data }}

    state = {
        data: [{
                Subject: "Blah",
                StartTime: "2021-11-24T07:00:00.000Z",
                EndTime: "2021-11-24T07:30:00.000Z",
                RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5'
                }],
        success: false
    }

    componentDidMount(){
        this.props.dispatch(getEventClass()).then(response => {
            let event = response.payload.classEvent;
            this.setState({
                data:[{
                    Subject: event.slotSubject,
                    StartTime: event.slotStartTime,
                    EndTime: event.slotEndTime,
                    RecurrenceRule: event.slotRecurrenceRelation
                }]
            })
        })
    }

    componentDidUpdate(){
        
        if(this.state.success){
            console.log("success");
        }
    }


    onDataBound = () => {
        console.log("Here!")
        let event = this.scheduleObj.getEvents();
        console.log(event)

        this.props.dispatch(addEventClass(event[0])).then(response => {
            this.setState({
                success: true
            })
        })
    }

    render(){
        return(
            <>
                <ScheduleComponent height='550px' ref={t => this.scheduleObj = t}  
                dataBound={this.onDataBound.bind(this)} eventSettings={{ dataSource: this.state.data }}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>;
                <Link to="/invite-students">Go to Invite Students</Link>
            </>
        )
    }
}

function mapStateToProps(state){
    return {
        classSub: state.classSub
    }
}

export default connect(mapStateToProps)(Dashboard);