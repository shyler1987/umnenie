import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles, WithStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogTitle from '@material-ui/core/DialogTitle';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import setIsAuth from '../../redux/actions/setIsAuth'
import seTisAuthenticated from '../../redux/actions/seTisAuthenticated'
import SvgIcon from '@material-ui/core/SvgIcon';


import {connect} from "react-redux";
import {bindActionCreators} from "redux";



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
        padding:"20px 20px 0px"
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
    svgRootIcon:{
        height:'40.196px',
        width:'40.196px',
    },
    titleText:{
        fontSize:15,
        fontWeight:600
    },
    fastAc:{
        fontSize:15,
        fontWeight:600,
        textAlign:'center'
    },
    textA:{
        color:"#e35b1e", fontSize:13, textDecoration: 'underline', fontWeight: 600
    },
    iconBtn:{
        padding: 5
    },
    loginBtn:{
        marginTop:10
    },
    outlinedIn:{
        fontSize:15,
        fontWeight:600
    },
    btnText:{

    },
    white:{
        color:"#ffffff"
    },
    backdrop:{
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
            <Typography classes={{root:classes.titleText}}>{children}</Typography>

        </MuiDialogTitle>
    );
});

const API_URL = "account/login";

class AuthDialog extends Component {

    constructor(props) {
        super(props);
        const {dialogBool} = this.props;
        this.state = {
            show: false,
            dialogBool: this.props.isAuth,
            password:'',
            username:'',
        }
        this.checkAuth=this.checkAuth.bind(this);
    }


    handleClose = () => {
       this.props.setIsAuth(false);
    }

    handleChange = (e) =>{
        this.setState({
          [e.target.name]:e.target.value
        });
    }

    setPropsSt = () =>{
        this.props.setIsAuth(false);
        this.props.seTisAuthenticated(true);
    }

    checkAuth (e){
        axios.post(API_URL, {
                username:this.state.username,
                password:this.state.password,
        })
            .then(response => {
                if(response.data.status===200){
                    localStorage.setItem('token', response.data.data.access_token);
                    this.props.setIsAuth(false);
                    this.props.seTisAuthenticated(true);

                }
            })
            .catch(error=> {
                console.log(error);
            });
        e.preventDefault();

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Dialog
                    open={this.props.isAuth}
                    onClose={this.handleClose}
                    fullWidth={"xs"}
                    maxWidth={"xs"}
                    BackdropProps={{
                        classes: {
                            root: classes.backdrop
                        }
                    }
                    }
                    classes={{paper:classes.moper}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div>
                        <IconButton aria-label="Close"  onClick={this.handleClose} className={classes.closeButton}  classes={{root:classes.iconBtn}} >
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
                            <Grid item md={12}>
                                <form fullWidth onSubmit={this.checkAuth}>
                                    <TextField
                                        fullWidth
                                        id="outlined-bare"
                                        name={"username"}
                                        onChange={this.handleChange}
                                        placeholder={"Телефона или Почта"}
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
                                    <TextField
                                        fullWidth
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

                                    <Button variant="contained" color="secondary" fullWidth classes={{root:classes.loginBtn}} type={"submit"}>
                                        Войти
                                    </Button>

                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-start"

                                    >
                                        <Grid item md={6} style={{marginTop: 10, textAlign: 'left'}}>
                                            <Link to={"/account/recovery"} onClick={this.handleClose}  className={classes.textA}>
                                                Забыли пароль?
                                            </Link>
                                        </Grid>
                                        <Grid item md={6} style={{marginTop: 10, textAlign: 'right'}}>
                                            <Link to={"/account/registration"} onClick={this.handleClose} className={classes.textA}>
                                                Регистрация
                                            </Link>
                                        </Grid>
                                        <Grid md={12}>
                                            <Typography classes={{root:classes.fastAc}}>
                                                Быстрый доступ с
                                            </Typography>
                                            <div style={{textAlign:'center', paddingBottom: 20}}>
                                                <IconButton classes={{root:classes.iconBtn}}>
                                                    <SvgIcon viewBox="0 0 40.196 40.196"  classes={{root: classes.svgRootIcon}}>
                                                        <g id="facebook_2_" data-name="facebook (2)" transform="translate(0)">
                                                            <circle id="Ellipse_9" data-name="Ellipse 9" cx="20.098" cy="20.098" r="20.098" transform="translate(0 0)" fill="#3b5998"/>
                                                            <path id="Path_1224" data-name="Path 1224" d="M49.416,34.851H45.83V47.989H40.4V34.851H37.812V30.233H40.4V27.246c0-2.137,1.015-5.483,5.482-5.483l4.025.017v4.482h-2.92A1.106,1.106,0,0,0,45.83,27.52v2.717h4.061Z" transform="translate(-24.265 -13.966)" fill="#fff"/>
                                                        </g>
                                                    </SvgIcon>
                                                </IconButton>
                                                <IconButton  classes={{root:classes.iconBtn}}>
                                                    <SvgIcon viewBox="0 0 40.196 40.196"  classes={{root: classes.svgRootIcon}}>
                                                        <g id="twitter_1_" data-name="twitter (1)" transform="translate(-0.001)">
                                                            <circle id="Ellipse_10" data-name="Ellipse 10" cx="20.098" cy="20.098" r="20.098" transform="translate(0.001 0)" fill="#55acee"/>
                                                            <g id="Group_1518" data-name="Group 1518" transform="translate(8.994 12.191)">
                                                                <path id="Path_1225" data-name="Path 1225" d="M48.519,36.281a9.585,9.585,0,0,1-2.759.756,4.817,4.817,0,0,0,2.113-2.657,9.617,9.617,0,0,1-3.051,1.165,4.808,4.808,0,0,0-8.186,4.382,13.637,13.637,0,0,1-9.9-5.02,4.809,4.809,0,0,0,1.486,6.414,4.77,4.77,0,0,1-2.176-.6c0,.02,0,.041,0,.061A4.807,4.807,0,0,0,29.9,45.49a4.823,4.823,0,0,1-2.169.083,4.809,4.809,0,0,0,4.488,3.336A9.7,9.7,0,0,1,25.1,50.9a13.662,13.662,0,0,0,21.032-11.51c0-.208,0-.416-.014-.621a9.742,9.742,0,0,0,2.4-2.486Z" transform="translate(-25.103 -34.028)" fill="#f1f2f2"/>
                                                            </g>
                                                        </g>
                                                    </SvgIcon>
                                                </IconButton>
                                                <IconButton  classes={{root:classes.iconBtn}}>
                                                    <SvgIcon viewBox="0 0 40.196 40.196"  classes={{root: classes.svgRootIcon}}>
                                                        <defs>
                                                            <clipPath id="clip-path-wk">
                                                                <rect width="40.196" height="40.196" fill="none"/>
                                                            </clipPath>
                                                        </defs>
                                                        <g id="Component_13_1" data-name="Component 13 – 1" transform="translate(0 0)" clip-path="url(#clip-path-wk)">
                                                            <g id="XMLID_11_" clip-path="url(#clip-path)">
                                                                <path id="XMLID_11_2" data-name="XMLID_11_" d="M20.1,0A20.1,20.1,0,1,1,0,20.1,20.1,20.1,0,0,1,20.1,0Z" fill="#4d76a1"/>
                                                            </g>
                                                            <path id="Path_1226" data-name="Path 1226" d="M30.851,53.848h1.577a1.331,1.331,0,0,0,.72-.315,1.154,1.154,0,0,0,.217-.693s-.031-2.117.952-2.428,2.212,2.046,3.53,2.95A2.5,2.5,0,0,0,39.6,53.9l3.524-.049s1.844-.114.969-1.563a11.777,11.777,0,0,0-2.62-3.032c-2.21-2.051-1.914-1.719.748-5.267,1.621-2.161,2.269-3.48,2.067-4.045-.193-.538-1.385-.4-1.385-.4l-3.968.025a.9.9,0,0,0-.512.09,1.112,1.112,0,0,0-.35.426,22.976,22.976,0,0,1-1.466,3.094c-1.767,3-2.473,3.159-2.762,2.973-.672-.434-.5-1.744-.5-2.675,0-2.908.441-4.12-.859-4.434a6.776,6.776,0,0,0-1.852-.184,8.553,8.553,0,0,0-3.293.337c-.451.221-.8.714-.588.742a1.781,1.781,0,0,1,1.171.589,3.829,3.829,0,0,1,.392,1.8s.234,3.423-.546,3.848c-.535.292-1.269-.3-2.844-3.026a25.3,25.3,0,0,1-1.417-2.936,1.179,1.179,0,0,0-.327-.442,1.644,1.644,0,0,0-.61-.246l-3.771.025s-.566.016-.774.262c-.185.219-.015.672-.015.672s2.952,6.907,6.295,10.387a9.054,9.054,0,0,0,6.546,2.981Z" transform="translate(-11.512 -24.935)" fill="#fff" fill-rule="evenodd"/>
                                                        </g>
                                                    </SvgIcon>
                                                </IconButton>
                                                <IconButton  classes={{root:classes.iconBtn}}>
                                                    <SvgIcon viewBox="0 0 40.196 40.196"  classes={{root: classes.svgRootIcon}}>
                                                        <defs>
                                                            <clipPath id="clip-path-gp">
                                                                <rect width="40.196" height="40.196" fill="none"/>
                                                            </clipPath>
                                                        </defs>
                                                        <g id="Component_12_1" data-name="Component 12 – 1" transform="translate(0 0)" clip-path="url(#clip-path-gp)">
                                                            <circle id="XMLID_30_" cx="20.098" cy="20.098" r="20.098" fill="#dc4e41"/>
                                                            <path id="Path_1229" data-name="Path 1229" d="M19.522,43.743a8.33,8.33,0,0,1,13.809-6.232c-.677.744-1.365,1.48-2.1,2.168a5.82,5.82,0,0,0-4.9-.958,5.234,5.234,0,1,0,3.525,9.848,4.579,4.579,0,0,0,2.691-3.137c-1.582-.032-3.165-.012-4.748-.056,0-.942-.008-1.879,0-2.821,2.639,0,5.282-.012,7.925.012A9.365,9.365,0,0,1,34.042,49.2a8.173,8.173,0,0,1-8.934,2.382A8.282,8.282,0,0,1,19.522,43.743Z" transform="translate(-12.525 -22.746)" fill="#fff"/>
                                                            <path id="Path_1230" data-name="Path 1230" d="M74.828,48.668h2.354c0,.787.012,1.579.016,2.366.787.008,1.579.012,2.366.016v2.358L77.2,53.42c-.008.791-.012,1.579-.016,2.37-.787,0-1.575,0-2.358,0-.008-.791-.008-1.579-.016-2.366-.787-.008-1.579-.012-2.366-.016V51.049q1.181-.006,2.366-.016C74.812,50.247,74.82,49.455,74.828,48.668Z" transform="translate(-44.488 -31.232)" fill="#fff"/>
                                                        </g>
                                                    </SvgIcon>
                                                </IconButton>



                                            </div>
                                        </Grid>

                                    </Grid>
                                </form>
                            </Grid>


                        </Grid>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }

}

function mapDispatch(dispatch) {
    return bindActionCreators({setIsAuth, seTisAuthenticated}, dispatch);
}

function mapStateToProps(state) {

    return {isAuth:state.mainData.isAuth};

}


export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(AuthDialog));