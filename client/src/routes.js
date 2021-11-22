import React, {Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import Admin from './components/admin';
import Home from './components/home';
import LoginStudent from './components/student/loginStudent';
import SignupStudent from './components/student/signupStudent';
import ClassRegister from './components/teacher/classRegister';
import Dashboard from './components/teacher/dashboard';
import LoginTeacher from './components/teacher/loginTeacher';
import SignupTeacher from './components/teacher/signupTeacher';
import StudentInvitation from './components/teacher/studentInvitation';
import AuthStudent from './hoc/authStudent';
import AuthTeacher from './hoc/authTeacher';

class RoutesComp extends Component {
  render(){
    return(
      <BrowserRouter>
          <Switch>
              <Route path = "/invite-students" component = {StudentInvitation}/>
              <Route path = "/teacher-dashboard" component = {Dashboard}/>
              <Route path = "/class-register" component = {ClassRegister}/>
              <Route path = "/teacher-signup" component = {AuthTeacher(SignupTeacher, false)}/>
              <Route path = "/teacher-login" component = {AuthTeacher(LoginTeacher, false)}/>
              <Route path = "/student-signup" component = {AuthStudent(SignupStudent, false)}/>
              <Route path = "/student-login" component = {AuthStudent(LoginStudent, false)}/>
              <Route path = "/admin" component = {AuthStudent(Admin, true)}/>
              <Route path = "/" component = {Home}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default RoutesComp;
