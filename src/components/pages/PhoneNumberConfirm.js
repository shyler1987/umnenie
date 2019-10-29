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
import seTisAuthenticated from '../../redux/actions/seTisAuthenticated'
import setIsAuth from '../../redux/actions/setIsAuth'
import setPhoneNumber from '../../redux/actions/setPhoneNumber'
import setUserData from '../../redux/actions/setUserData'
import setExitApp from "../../redux/actions/setExitApp";


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
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
        marginTop: 10,

        marginBottom: 20,
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
    },
    rotp:{
        textAlign: 'center',
        margin: '10px 0px'
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

const API_URL = "profil/phone-verify";

class PhoneNumberConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            dialogBool: this.props.isPhoneNumber,

            openSnakbar: false,

            step:1,
            phone:null,
            sms_code:null
        }
    }
    componentDidMount() {
        // eslint-disable-next-line no-unused-expressions

    }

    handleClose = () => {
        this.props.setPhoneNumber(false);
        this.props.setExitApp(true);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    sendSms = (e) => {
        e.preventDefault();
        this.setState({
            show: true
        })
        axios.post(API_URL, {
            phone: this.state.phone,
        })
            .then(response => {
                if (response.status === 203) {
                    this.openSnakbar('success', "СМС отправлено ")
                    this.setState({
                        step: 2
                    })
                }
                this.setState({
                    show: false
                })
            })
            .catch(error => {
                if(error.response===undefined){
                    this.openSnakbar('error', "не определено ошибка ")
                    return;
                }
                if(error.response.status===404){
                    this.openSnakbar('error', "Этот номер телефона уже зарегистрирован на umnenie.com")
                }
                this.setState({
                    show: false
                })
            });
    }


    sendCode = (e) => {
        e.preventDefault();
        this.setState({
            show: true
        })
        axios.post("profil/otp", {
            phone: this.state.phone,
            sms_code: this.state.sms_code,
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.access_token);
                    this.props.setIsAuth(false);
                    this.props.seTisAuthenticated(true);
                    this.props.setUserData(response.data);
                    this.props.setPhoneNumber(false);
                }
                this.setState({
                    show: false
                })
            })
            .catch(error => {
                if(error.response===undefined){
                    this.openSnakbar('error', "не определено ошибка ")
                    return;
                }
                if(error.response.status===404){
                    this.openSnakbar('error', "код подтверждения недействителен или истек")
                }
                this.setState({
                    show: false
                })
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
                    open={this.props.isAuthenticated && this.props.user.userPhone===null}
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
                    <DialogTitle id="alert-dialog-title">Подтвердить аккаунт</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item md={12} xs={12} sm={12}>
                                <Typography classes={{root:classes.rotp}}>Введите номер телефона, чтобы подтвердить свой аккаунт</Typography>
                                {this.state.step === 1 && <ValidatorForm fullWidth onSubmit={this.sendSms}>
                                    <TextValidator
                                        validators={['required']}
                                        errorMessages={['Это поле обязательно к заполнению']}
                                        autoComplete='off'
                                        value={this.state.phone}
                                        fullWidth
                                        id="outlined-bare"
                                        name={"phone"}
                                        onChange={this.handleChange}
                                        placeholder={"Номер телефона"}
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
                                        Отправить код
                                    </Button>


                                </ValidatorForm>}
                                {this.state.step === 2 && <ValidatorForm fullWidth onSubmit={this.sendCode}>
                                    <TextValidator
                                        validators={['required']}
                                        errorMessages={['Это поле обязательно к заполнению']}
                                        autoComplete='off'
                                        value={this.state.sms_code}
                                        fullWidth
                                        id="outlined-bare"
                                        name={"sms_code"}
                                        onChange={this.handleChange}
                                        placeholder={"Код подтверждения смс"}
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
                                        Проверка кода
                                    </Button>


                                </ValidatorForm>}

                            </Grid>


                        </Grid>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }

}

function mapDispatch(dispatch) {
    return bindActionCreators({setPhoneNumber, setExitApp, setUserData, seTisAuthenticated, setIsAuth}, dispatch);
}

function mapStateToProps(state) {

    return {
        isPhoneNumber: state.mainData.isPhoneNumber,
        isAuthenticated: state.mainData.isAuthenticated,
        user: state.mainData.user
    };

}


export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(withRouter(PhoneNumberConfirm)));