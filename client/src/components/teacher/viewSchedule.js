import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { connect } from 'react-redux';
import { getEventClassForTeacher } from '../../store/actions/class_actions';


class ViewSchedule extends Component{

    state = {
        data: [{
            Subject: "",
            StartTime: "",
            EndTime: "",
            RecurrenceRule: "",
            IsReadonly: true
        }]
    }

    componentDidMount(){
        this.props.dispatch(getEventClassForTeacher()).then(response => {
            let event = response.payload.classEvent;
            this.setState({
                data:[{
                    Subject: event.slotSubject,
                    StartTime: event.slotStartTime,
                    EndTime: event.slotEndTime,
                    RecurrenceRule: event.slotRecurrenceRelation,
                    IsReadonly: true
                }]
            })
        })
    }

    

    render(){
        console.log(this.props.match.params.classId)
        return(
            <div className="container">
                <ScheduleComponent height='550px' eventSettings={{ dataSource: this.state.data }}
                IsReadonly={true}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>

            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        classSub: state.classSub
    }
}

export default connect(mapStateToProps)(ViewSchedule); 