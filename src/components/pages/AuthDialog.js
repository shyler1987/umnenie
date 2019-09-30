import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles, WithStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withRouter} from "react-router-dom";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogTitle from '@material-ui/core/DialogTitle';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import setIsAuth from '../../redux/actions/setIsAuth'
import seTisAuthenticated from '../../redux/actions/seTisAuthenticated'
import setUserData from '../../redux/actions/setUserData'
import SvgIcon from '@material-ui/core/SvgIcon';


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {GoogleLogin} from 'react-google-login';
import VkAuth from 'react-vk-auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../tools/MySnackbarContentWrapper";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    rootDialog: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'baseline',
        overflow: 'hidden',
        padding: "20px 20px 0px"
        // backgroundColor: theme.palette.background.paper,
    },
    fab: {
        //margin: theme.spacing(1),
    },
    closeButton: {
        position: 'absolute',
        right: '-45px',
        top: '-6px',
        color: theme.palette.grey[500],
    },
    moper: {
        // padding: theme.spacing(2),
        // color: theme.palette.text.secondary,
        overflowY: 'unset'
        //minHeight:500
    },
    textField: {},
    inputHeight: {
        height: 100
    },
    textP: {
        fontSize: 14,
        textAlign: 'justify',
        paddingTop: 10
    },
    callCenter: {
        textAlign: 'right',
    },
    copyright: {
        textAlign: 'left',
    },
    svgRootIcon: {
        height: '40.196px',
        width: '40.196px',
    },
    titleText: {
        fontSize: 15,
        fontWeight: 600
    },
    fastAc: {
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center'
    },
    textA: {
        color: "#e35b1e", fontSize: 13, textDecoration: 'underline', fontWeight: 600
    },
    iconBtn: {
        padding: 5
    },
    loginBtn: {
        marginTop: 10
    },
    outlinedIn: {
        fontSize: 15,
        fontWeight: 600
    },
    btnText: {},
    white: {
        color: "#ffffff"
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }


});

export
interface
DialogTitleProps
extends
WithStyles < typeof styles > {
    id: string;
children: React.ReactNode;
onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.rootDialog}>
            <Typography classes={{root: classes.titleText}}>{children}</Typography>

        </MuiDialogTitle>
    );
});

const API_URL = "account/login";

class AuthDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            dialogBool: this.props.isAuth,
            password: '',
            username: '',
            openSnakbar: false,
            isLoaded: false,
            isProcessing: false,
        }
    }
    componentDidMount() {
        // eslint-disable-next-line no-unused-expressions

    }

    handleClose = () => {
        this.props.setIsAuth(false);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    vkLogin = (session) => {
        this.setState({
            show: true
        })
        let data = {};
        Object.keys(session).map(key=>{
            data[key]=session[key];
        })
        axios.post("/account/vk-login", data).then(res => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.access_token);
                this.props.setIsAuth(false);
                this.props.seTisAuthenticated(true);
                this.props.setUserData(res.data)
            }
            this.setState({
                show: false
            })
        }).catch(err=>{
            this.setState({
                show: false
            })
        })
    }

    handleVkResponse = (res) => {

        if (res.status === "connected") {
            this.vkLogin( res.session)
        }
        if (res.status === "not_authorized") {

        }

        if (res.status === "unknown") {

        }

    }


    // setPropsSt = () => {
    //     this.props.setIsAuth(false);
    //     this.props.seTisAuthenticated(true);
    // }

    checkAuth = (e) => {
        e.preventDefault();
        this.setState({
            show: true
        })
        axios.post(API_URL, {
            username: this.state.username,
            password: this.state.password,
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.access_token);
                    this.props.setIsAuth(false);
                    this.props.seTisAuthenticated(true);
                    this.props.setUserData(response.data)

                }
                this.setState({
                    show: false
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    show: false
                })
            });

    }

    responseGoogle = (response) => {
        this.setState({
            show: true
        })
        if(response.Zi===undefined) {  this.setState({
            show: false
        }); return;}
        axios.post("account/google", {
            accessToken: response.Zi.access_token,
        }).then(res => {
            this.openSnakbar('success', "Success")
            if (res.status === 200) {

                localStorage.setItem('token', res.data.access_token);
                this.props.setIsAuth(false);
                this.props.seTisAuthenticated(true);
                this.props.setUserData(res.data)

                //
            }
            this.setState({
                show: false
            })
        }).catch(error => {
            this.setState({
                show: false,

            })
            this.openSnakbar('error', "error")
        });
    }

    closeSnakbar = () => {
        this.setState({
            openSnakbar: false,
        })
    }

    openSnakbar = (snakbarVariant, snakbarMessage) => {
        this.setState({
            openSnakbar: true,
            snakbarVariant: snakbarVariant,
            snakbarMessage: snakbarMessage,
        })
    }

    responseFacebook = (response) => {

        this.setState({
            show: true
        })
        axios.post("/account/facebook", {
            accessToken: response.accessToken,
            email: response.email,
            name: response.name,
            picture: response.picture,
            userID: response.userID,
        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.access_token);
                this.props.setIsAuth(false);
                this.props.seTisAuthenticated(true);
                this.props.setUserData(res.data)
            }
            this.setState({
                show: false
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                show: false,
                snakbarOpen: true,
                variant: "error",
                message:"error"
            })
        });
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.openSnakbar}
                    autoHideDuration={6000}
                    onClose={this.closeSnakbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnakbar}
                        variant={this.state.snakbarVariant}
                        message={this.state.snakbarMessage}
                    />
                </Snackbar>
                <Dialog
                    open={this.props.isAuth}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth={"xs"}
                    BackdropProps={{
                        classes: {
                            root: classes.backdrop
                        }
                    }
                    }
                    classes={{paper: classes.moper}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div>
                        <IconButton aria-label="Close" onClick={this.handleClose} className={classes.closeButton}
                                    classes={{root: classes.iconBtn}}>
                            <CloseIcon className={classes.white}/>
                        </IconButton>
                    </div>
                    <DialogTitle id="alert-dialog-title">Авторизоваться</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item md={12} xs={12} sm={12}>
                                <ValidatorForm fullWidth onSubmit={this.checkAuth}>
                                    <TextValidator
                                        validators={['required']}
                                        errorMessages={['Это поле обязательно к заполнению']}
                                        autoComplete='off'
                                        value={this.state.username}
                                        fullWidth
                                        id="outlined-bare"
                                        name={"username"}
                                        onChange={this.handleChange}
                                        placeholder={"Логин"}
                                        InputProps={{
                                            classes: {
                                                input: classes.outlinedIn,
                                            },
                                        }}
                                        margin="dense"
                                        variant="outlined"
                                        inputProps={{
                                            style: {
                                                height: 40,
                                                padding: '0 14px',
                                            },
                                        }}
                                    />
                                    <TextValidator
                                        validators={['required']}
                                        errorMessages={['Это поле обязательно к заполнению']}
                                        fullWidth
                                        value={this.state.password}
                                        placeholder={"Пароль"}
                                        name={"password"}
                                        type={"password"}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            classes: {
                                                input: classes.outlinedIn,
                                            },
                                        }}
                                        margin="dense"
                                        variant="outlined"
                                        inputProps={{
                                            style: {
                                                height: 40,
                                                padding: '0 14px',
                                            },
                                        }}
                                    />

                                    <Button variant="contained" color="secondary" fullWidth disabled={this.state.show}
                                            classes={{root: classes.loginBtn}} type={"submit"}
                                            disabled={this.state.show}>
                                        Войти
                                    </Button>


                                </ValidatorForm>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-start"

                                >
                                    <Grid item md={6} sm={6} xs={6} style={{marginTop: 10, textAlign: 'left'}}>
                                        <Link to={"/account/recovery"} onClick={this.handleClose}
                                              className={classes.textA}>
                                            Забыли пароль?
                                        </Link>
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={6} style={{marginTop: 10, textAlign: 'right'}}>
                                        <Link to={"/account/registration"} onClick={this.handleClose}
                                              className={classes.textA}>
                                            Регистрация
                                        </Link>
                                    </Grid>
                                    <Grid md={12} item>
                                        <Typography classes={{root: classes.fastAc}}>
                                            Быстрый доступ с
                                        </Typography>
                                        <div style={{textAlign: 'center', paddingBottom: 20}}>

                                            <FacebookLogin
                                                appId="723645781395049" //APP ID NOT CREATED YET
                                                fields="name,email,picture"
                                                callback={this.responseFacebook}
                                                autoLoad={false}
                                                autoLoad={false}
                                                disableMobileRedirect={true}
                                                render={renderProps => (
                                                    <IconButton classes={{root: classes.iconBtn}}
                                                                onClick={renderProps.onClick}>
                                                        <SvgIcon viewBox="0 0 40.196 40.196"
                                                                 classes={{root: classes.svgRootIcon}}>
                                                            <g id="facebook_2_" data-name="facebook (2)"
                                                               transform="translate(0)">
                                                                <circle id="Ellipse_9" data-name="Ellipse 9"
                                                                        cx="20.098" cy="20.098" r="20.098"
                                                                        transform="translate(0 0)" fill="#3b5998"/>
                                                                <path id="Path_1224" data-name="Path 1224"
                                                                      d="M49.416,34.851H45.83V47.989H40.4V34.851H37.812V30.233H40.4V27.246c0-2.137,1.015-5.483,5.482-5.483l4.025.017v4.482h-2.92A1.106,1.106,0,0,0,45.83,27.52v2.717h4.061Z"
                                                                      transform="translate(-24.265 -13.966)"
                                                                      fill="#fff"/>
                                                            </g>
                                                        </SvgIcon>
                                                    </IconButton>
                                                )}
                                            />
                                            <GoogleLogin
                                                clientId="939525112273-06jnkcnpajcl8aik9rjnl4v7fda128vo.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                                                buttonText="LOGIN WITH GOOGLE"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                                scope={"openid"}
                                                responseType="access_token"
                                                render={renderProps => (
                                                    <IconButton classes={{root: classes.iconBtn}}
                                                                onClick={renderProps.onClick}
                                                                disabled={renderProps.disabled}>
                                                        <SvgIcon viewBox="0 0 18 18"
                                                                 classes={{root: classes.svgRootIcon}}>
                                                            <g fill="#000" fill-rule="evenodd">
                                                                <path
                                                                    d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                                                                    fill="#EA4335"></path>
                                                                <path
                                                                    d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                                                                    fill="#4285F4"></path>
                                                                <path
                                                                    d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                                                                    fill="#FBBC05"></path>
                                                                <path
                                                                    d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                                                                    fill="#34A853"></path>
                                                                <path fill="none" d="M0 0h18v18H0z"></path>
                                                            </g>
                                                        </SvgIcon>
                                                    </IconButton>
                                                )}
                                                icon={true}

                                            />
                                            <VkAuth apiId="7149957" callback={this.handleVkResponse}
                                                    style={{
                                                backgroundColor: 'Transparent',
                                                backgroundRepeat: 'no-repeat',
                                                border: 'none',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                outline: 'none',
                                                padding: 0
                                            }}>

                                                <IconButton classes={{root: classes.iconBtn}}>
                                                    <SvgIcon viewBox="0 0 40.196 40.196"
                                                             classes={{root: classes.svgRootIcon}}>
                                                        <defs>
                                                            <clipPath id="clip-path-wk">
                                                                <rect width="40.196" height="40.196" fill="none"/>
                                                            </clipPath>
                                                        </defs>
                                                        <g id="Component_13_1" data-name="Component 13 – 1"
                                                           transform="translate(0 0)" clip-path="url(#clip-path-wk)">
                                                            <g id="XMLID_11_" clip-path="url(#clip-path)">
                                                                <path id="XMLID_11_2" data-name="XMLID_11_"
                                                                      d="M20.1,0A20.1,20.1,0,1,1,0,20.1,20.1,20.1,0,0,1,20.1,0Z"
                                                                      fill="#4d76a1"/>
                                                            </g>
                                                            <path id="Path_1226" data-name="Path 1226"
                                                                  d="M30.851,53.848h1.577a1.331,1.331,0,0,0,.72-.315,1.154,1.154,0,0,0,.217-.693s-.031-2.117.952-2.428,2.212,2.046,3.53,2.95A2.5,2.5,0,0,0,39.6,53.9l3.524-.049s1.844-.114.969-1.563a11.777,11.777,0,0,0-2.62-3.032c-2.21-2.051-1.914-1.719.748-5.267,1.621-2.161,2.269-3.48,2.067-4.045-.193-.538-1.385-.4-1.385-.4l-3.968.025a.9.9,0,0,0-.512.09,1.112,1.112,0,0,0-.35.426,22.976,22.976,0,0,1-1.466,3.094c-1.767,3-2.473,3.159-2.762,2.973-.672-.434-.5-1.744-.5-2.675,0-2.908.441-4.12-.859-4.434a6.776,6.776,0,0,0-1.852-.184,8.553,8.553,0,0,0-3.293.337c-.451.221-.8.714-.588.742a1.781,1.781,0,0,1,1.171.589,3.829,3.829,0,0,1,.392,1.8s.234,3.423-.546,3.848c-.535.292-1.269-.3-2.844-3.026a25.3,25.3,0,0,1-1.417-2.936,1.179,1.179,0,0,0-.327-.442,1.644,1.644,0,0,0-.61-.246l-3.771.025s-.566.016-.774.262c-.185.219-.015.672-.015.672s2.952,6.907,6.295,10.387a9.054,9.054,0,0,0,6.546,2.981Z"
                                                                  transform="translate(-11.512 -24.935)" fill="#fff"
                                                                  fill-rule="evenodd"/>
                                                        </g>
                                                    </SvgIcon>
                                                </IconButton>
                                            </VkAuth>


                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>


                        </Grid>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }

}

function mapDispatch(dispatch) {
    return bindActionCreators({setIsAuth, seTisAuthenticated, setUserData}, dispatch);
}

function mapStateToProps(state) {

    return {
        isAuth: state.mainData.isAuth,
        user: state.mainData.user
    };

}


export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(withRouter(AuthDialog)));