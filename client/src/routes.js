import React, {Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
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
import Footer from './components/footer';
import About from './components/about';
import OnlineStudents from './components/teacher/onlineStudents';
import OfflineStudents from './components/teacher/offlineStudents';
import AllStudents from './components/teacher/allStudents';
import LogoutStudent from './components/student/logoutStudent';
import LogoutTeacher from './components/teacher/logoutTeacher';

class RoutesComp extends Component {
  render(){
    return(
      <BrowserRouter>
          <Switch>
              <Route path="/teacher-dashboard-all" component = {AuthTeacher(AllStudents, true)}/>
              <Route path="/teacher-dashboard-offline" component = {AuthTeacher(OfflineStudents, true)}/>
              <Route path="/teacher-dashboard-online" component = {AuthTeacher(OnlineStudents, true)}/>
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
              <Route path = "/logout-teacher" component = {AuthTeacher(LogoutTeacher, true)}/>
              <Route path = "/logout-student" component = {AuthStudent(LogoutStudent, true)}/>
              <Route path="/about" component = {About}/>
              <Route path = "/" component = {Home}/>
          </Switch>
          <Footer/>
        </BrowserRouter>
    );
  }
}

export default RoutesComp;
