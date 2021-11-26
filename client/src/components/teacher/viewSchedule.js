import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { connect } from 'react-redux';
import { getEventClassForTeacher } from '../../store/actions/class_actions';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import HeaderLogoutTeacher from '../Headers/headerLogoutTeacher';


class ViewSchedule extends Component{

    state = {
        data: [{
            Subject: "",
            StartTime: "",
            EndTime: "",
            RecurrenceRule: "",
            IsReadonly: true
        }],
        success: false
    }

    componentDidMount(){
        this.props.dispatch(getEventClassForTeacher()).then(response => {
            let event = response.payload.classEvent;
            event ? 
            this.setState({
                data:[{
                    Subject: event.slotSubject,
                    StartTime: event.slotStartTime,
                    EndTime: event.slotEndTime,
                    RecurrenceRule: event.slotRecurrenceRelation,
                    IsReadonly: true
                }],
                success: true
            }) : 
            this.setState({success: false})
        })
    }

    

    render(){
        return(
            <>
            <HeaderLogoutTeacher/>
            <div className="container view-scheduler">
                {
                    this.state.success ?
                    <>
                    <h1>Class Schedule: </h1>
                    <ScheduleComponent height='550px' eventSettings={{ dataSource: this.state.data }}
                    IsReadonly={true} currentView='Month'>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                    </ScheduleComponent>
                    </>
                :
                    <div className="loader">
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                     </div>
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

export default connect(mapStateToProps)(ViewSchedule); 