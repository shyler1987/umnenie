import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles, WithStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
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
import setExitApp from '../../redux/actions/setExitApp'


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
const LOGOUT = "profil/logout";

const API_URL = "account/login";

class ExitDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
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

    logOut = () =>{
        this.setState({show:true})
        axios.get(LOGOUT).then(res=>{
            if(res.status===200){
                localStorage.removeItem("token");
                this.props.seTisAuthenticated(false);
                this.props.setExitApp(false);
                this.props.setUserData({
                    userFIO: null,
                    userName: null,
                    userImage: null,
                    userPhone: false,
                    access_token: null,
                    user_id: null,
                    role: null
                });
                this.props.history.push("/")
            }
            this.setState({show:false})
        }).catch(err=>{
            this.setState({show:false})
        })
    }

    closeSnakbar = () => {
        this.setState({
            openSnakbar: false,
        })
    }

    backTo = () =>{
        this.props.setExitApp(false);
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
                    open={this.props.isExitApp}
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
                        <IconButton aria-label="Close" onClick={this.backTo} className={classes.closeButton}
                                    classes={{root: classes.iconBtn}}>
                            <CloseIcon className={classes.white}/>
                        </IconButton>
                    </div>
                    <DialogTitle id="alert-dialog-title"> Выйти из сайта?</DialogTitle>
                    <DialogContent>
                        <p>Вы хотите покинуть сайт?</p>
                        <p>Нажмите Нет, если вы хотите продолжить работу. Нажмите «Да», чтобы выйти из текущего пользователя.</p>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item md={6} xs={6} sm={6}>
                                <Button
                                    fullWidth
                                    disabled={this.state.show}
                                    classes={{root: classes.loginBtn}}
                                    disabled={this.state.show}
                                    onClick={this.logOut}
                                >
                                    Да
                                </Button>
                            </Grid>
                            <Grid item md={6} xs={6} sm={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    disabled={this.state.show}
                                    classes={{root: classes.loginBtn}}
                                    onClick={this.backTo}
                                    disabled={this.state.show}
                                >
                                    Нет
                                </Button>
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }

}

function mapDispatch(dispatch) {
    return bindActionCreators({setIsAuth, seTisAuthenticated, setUserData, setExitApp}, dispatch);
}

function mapStateToProps(state) {

    return {
        isAuth: state.mainData.isAuth,
        isExitApp: state.mainData.isExitApp,
        user: state.mainData.user
    };

}


export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(withRouter(ExitDialog)));