import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import DashboardLayoutRoute from './layouts/DashboardLayout';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Test from './components/Dash'
import RecoveryPassword from './components/pages/RecoveryPassword'
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
import StatisPage from "./components/pages/StatisPage";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import setUserData from './redux/actions/setUserData'
import ProfileUser from "./components/pages/ProfileUser";
const raleway = {};


const styles = theme => ({

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            //borderColor: `#e35b1e !important`,
            borderWidth: 1,
            borderStyle: 'solid',
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
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        "&:hover": {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)',
        }

    },


});

const outerTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 400,
        color: "#2B2A29"
    },
    overrides: {
        MuiInputBase: {
            root: {
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 15,
                fontWeight: 400
            }
        },
        MuiButton: {
            label: {
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 15,
                textTransform: 'initial',
                fontWeight: 600,
            }

            //outline: none
        },
        MuiPaper:{
            elevation1:{
                border: '1px solid #e6e6e6',
                boxShadow: 'unset'
            }
        },
        MuiButtonBase: {
            root: {
                "&:focus": {
                    outline: 'none'
                }
            }
        },
        MuiIconButton: {
            root: {
                "&:focus": {
                    outline: 'none'
                }
            }
        },
        MuiOutlinedInput: {
            root: {
                "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
                '&$focused $notchedOutline': {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
            },

            notchedOutline: {
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                '&$focused $notchedOutline': {
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                '&::placeholder': {
                    textOverflow: 'ellipsis !important',
                    color: 'blue'
                }
            }
        },
    },
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: "#E05022"
        },
        secondary1: {
            main: "#4fe329"
        },
        mainBlackColor: "#2B2A29",
        BorderColor: "#E6E6E6",
        YellowColor: "#E05022",
    },
});


class App extends Component {
    constructor(props) {
        super(props);


    }
    componentDidMount() {
        if(localStorage.getItem('token')!==null){
            this.fetchMe();
        }
    }

    fetchMe = () => {
        axios.get("profil/me").then(res=>{
            this.props.setUserData(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }

    componentWillMount() {
        axios.defaults.baseURL = "http://api.foundrising.uz/v1/";
        axios.interceptors.request.use(function (config) {

            if (localStorage.getItem('token') !== null) {
                config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            // Do something with response data
            return response;
        }, function (error) {
            if (error.response.status === undefined)
                return Promise.reject(error);
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                window.location.replace('/');
               // window.location.replace('/auth/login');
            }
            return Promise.reject(error);
        });

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

                        <ProfileLayoutRoute exact path="/profile/:slug" component={ProfileUser}/>
                        <ProfileLayoutRoute exact path="/account/profilej" component={ProfileJuridic}/>
                        <ProfileLayoutRoute exact path="/account/followers" component={ProfileFollower}/>
                        <ProfileLayoutRoute exact path="/account/following" component={ProfileFollower}/>

                        <DashboardLayoutRoute exact path="/account/registration" component={Registration}/>
                        <DashboardLayoutRoute exact path="/account/profile-edit" component={ProfileEdit}/>
                        <DashboardLayoutRoute exact path="/account/passchange" component={PasswordChange}/>
                        <DashboardLayoutRoute exact path="/polls/create" component={PollCreate}/>
                        <DashboardLayoutRoute exact path="/chat" component={ChatPage}/>
                        <DashboardLayoutRoute exact path="/polls/:id" component={PollView}/>
                        <DashboardLayoutRoute exact path="/statis/" component={StatisPage}/>


                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }

}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.mainData.isAuthenticated,
        user: state.mainData.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setUserData}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps) (App);




