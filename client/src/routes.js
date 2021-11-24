import React, {Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import Admin from './components/admin';
import Home from './components/home';
import Class from './components/student/class';
import ClassesDashboard from './components/student/classesDashboard';
import LoginStudent from './components/student/loginStudent';
import SignupStudent from './components/student/signupStudent';
import ClassRegister from './components/teacher/classRegister';
import ClassScheduler from './components/teacher/classScheduler';
import LoginTeacher from './components/teacher/loginTeacher';
import SignupTeacher from './components/teacher/signupTeacher';
import StudentInvitation from './components/teacher/studentInvitation';
import Dashboard from './components/teacher/teacherDashboard';
import viewSchedule from './components/teacher/viewSchedule';
import AuthStudent from './hoc/authStudent';
import AuthTeacher from './hoc/authTeacher';

class RoutesComp extends Component {
  render(){
    return(
      <BrowserRouter>
          <Switch>
              <Route path="/class/:classId" component = {AuthStudent(Class, true)}/>
              <Route path = "/view-class-teacher" component = {AuthTeacher(viewSchedule, true)}/>
              <Route path = "/teacher-dashboard" component = {AuthTeacher(Dashboard, true)}/>
              <Route path = "/invite-students" component = {AuthTeacher(StudentInvitation, true)}/>
              <Route path = "/teacher-scheduler" component = {AuthTeacher(ClassScheduler, true)}/>
              <Route path = "/class-register" component = {AuthTeacher(ClassRegister, true)}/>
              <Route path = "/teacher-signup" component = {AuthTeacher(SignupTeacher, false)}/>
              <Route path = "/teacher-login" component = {AuthTeacher(LoginTeacher, false)}/>
              <Route path = "/student-signup" component = {AuthStudent(SignupStudent, false)}/>
              <Route path = "/student-login" component = {AuthStudent(LoginStudent, false)}/>
              <Route path = "/classes-dashboard" component = {AuthStudent(ClassesDashboard, true)}/>
              <Route path = "/" component = {Home}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default RoutesComp;
