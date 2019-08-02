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
import Registration from "./components/pages/Registration";
//import './media/fonts/sourcesanspro/sourcesanspro.css'
import './media/font.css'
import {withStyles} from '@material-ui/styles';

const raleway = {

};


const styles = theme => ({

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            //borderColor: `#e35b1e !important`,
            borderWidth:1,
            borderStyle:'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)'
        },
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: 'rgba(0, 0, 0, 0.23)'
        },
    },

    cssFocused: {
        borderColor: `#e35b1e !important`,
    },

    notchedOutline: {
        borderWidth:1,
        borderStyle:'solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        "&:hover":{
            borderWidth:1,
            borderStyle:'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)',
        }

    },



});

const outerTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: 'SourceSansProRegular, sans-serif',
        fontWeight: 400
    },
    overrides: {
        MuiInputBase:{
            root:{
                fontFamily: 'SourceSansProRegular, sans-serif',
            }
        },
        MuiButton:{
            label:{
                fontFamily: 'SourceSansProRegular, sans-serif',
            }
        },
        MuiOutlinedInput: {
            root:{
                "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
                '&$focused $notchedOutline': {
                    borderWidth:1,
                    borderStyle:'solid',
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
            },

            notchedOutline:{
                borderWidth:1,
                borderStyle:'solid',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                '&$focused $notchedOutline': {
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                '&::placeholder': {
                    textOverflow: 'ellipsis !important',
                    color: 'blue'
                }
                // "&:hover":{
                //     borderWidth:1,
                //     borderStyle:'solid',
                //     borderColor: 'rgba(0, 0, 0, 0.23)',
                // }
            }
        },
        // MuiInputBase:{
        //     '&$focused $notchedOutline': {
        //         borderColor: "#fff",
        //         borderWidth: 2,
        //     },
        // },
        // MuiInput:{
        //     '&$focused $notchedOutline': {
        //         borderColor: "#fff",
        //         borderWidth: 2,
        //     },
        // }

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
    // cssFocused: {
    //
    // },

    // notchedOutline: {
    //     borderWidth:1,
    //     borderStyle:'solid',
    //     borderColor: 'rgba(0, 0, 0, 0.23)',
    //     "&:hover":{
    //         borderWidth:1,
    //         borderStyle:'solid',
    //         borderColor: 'rgba(0, 0, 0, 0.23)',
    //     }
    //
    // },
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

                        <DashboardLayoutRoute exact path="/account/registration" component={Registration}/>
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




