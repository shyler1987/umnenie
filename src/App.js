import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import DashboardLayoutRoute from './layouts/DashboardLayout';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Test from './components/Dash'
import RecoveryPassword from './components/pages/RecoveryPassword'
import {green, orange, grey} from '@material-ui/core/colors';
import axios from "axios"
import Profile from "./components/pages/Profile";
import ProfileLayoutRoute from "./layouts/ProfileLayout";
import ProfileFollower from "./components/pages/ProfileFollower";
import PollView from "./components/pages/PollView";
import License from "./components/pages/License";
import ProfileJuridic from "./components/pages/ProfileJuridic";
import ProfileEdit from "./components/pages/ProfileEdit";
import PasswordChange from "./components/pages/PasswordChange";
import PollCreate from "./components/pages/PollCreate";
import ChatPage from "./components/pages/ChatPage";
//import './media/fonts/sourcesanspro/sourcesanspro.css'
const outerTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: '"Source Sans Pro", sans-serif',
    },
    palette: {
        primary: {
            main: '#000',
        },
        secondary:{
            main:"#e35b1e"
        },
        secondary1:{
            main:"#4fe329"
        }
    },
});


class App extends Component {
    constructor(props) {
        super(props);


    }
    componentWillMount(){
        axios.defaults.baseURL ="http://umnenie.foundrising.uz/api/";

    }
    render() {
        return (
            <ThemeProvider theme={outerTheme}>
                <Router>
                    <Switch>
                        <DashboardLayoutRoute exact path="/" component={Test}/>
                        <DashboardLayoutRoute exact path="/account/recovery" component={RecoveryPassword}/>
                        <DashboardLayoutRoute exact path="/license" component={License}/>
                        <ProfileLayoutRoute exact path="/account/profile" component={Profile}/>

                        <ProfileLayoutRoute exact path="/account/profilej" component={ProfileJuridic}/>
                        <ProfileLayoutRoute exact path="/account/followers" component={ProfileFollower}/>

                        <DashboardLayoutRoute exact path="/account/profile-edit" component={ProfileEdit}/>
                        <DashboardLayoutRoute exact path="/account/passchange" component={PasswordChange}/>
                        <DashboardLayoutRoute exact path="/polls/create" component={PollCreate}/>
                        <DashboardLayoutRoute exact path="/chat" component={ChatPage}/>
                        <DashboardLayoutRoute exact path="/polls/:id" component={PollView}/>



                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }

}

export default App;




