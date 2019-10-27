import React from 'react';
import {fade, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Container from '@material-ui/core/Container';
import logo from "../../media/logo.png"
import {Link} from "react-router-dom";
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import {bindActionCreators} from "redux";
import setIsAuth from '../../redux/actions/setIsAuth'
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import AuthDialog from "../pages/AuthDialog";
import PhoneNumberConfirm from "../pages/PhoneNumberConfirm";
import ExitDialog from "../pages/ExitDialog";
import axios from "axios";
import seTisAuthenticated from "../../redux/actions/seTisAuthenticated";
import setUserData from "../../redux/actions/setUserData";
import setExitApp from "../../redux/actions/setExitApp";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
const styles = theme => ({
    toolbar: {
        // maxWidth: 1170
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    searchM: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2)*1,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },

    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "'Source Sans Pro', sans-serif"
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color:theme.palette.mainBlackColor,
            "&:hover":{
                color:theme.palette.mainBlackColor,
                textDecoration:'none'
            },
            "& p":{
                marginLeft:5,
                fontWeight:600,
                fontSize:14
            }


        },
    },
    mibileIcon:{
        padding: 8
    },
    sectionMobileAvatar:{
        color:theme.palette.mainBlackColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "&:hover":{
            color:theme.palette.mainBlackColor,
            textDecoration:'none'
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    appBar:{
        backgroundColor: '#ffffff',
        color:"#000",
        borderBottom: '1px solid #e6e6e6',
        boxShadow: 'unset'


    },
    loginIn:{
        color:theme.palette.mainBlackColor,
        "&:hover":{
            cursor:"pointer",
            textDecoration:'none'
        }
    },
    borderBot:{
        borderBottom: '1px solid #e6e6e6',
    },
    LogoDiv: {
        [theme.breakpoints.up('md')]: {
            width: '20%',
        },
    },
    home:{
        marginRight:20,
        "&:focus":{
            outline:0
        }
    }

});

const LOGOUT = "profil/logout";


 class TopMenu extends React.Component  {
     constructor(props) {
         super(props);
         this.state = {
             isSerachOpen:false,
             show:false,
             search:"",
         }
     }

     openSearchbar = () =>{
        this.setState({
            isSerachOpen:!this.state.isSerachOpen
        })
     }

     setAuthClick=()=>{
         this.props.setIsAuth(true);
     }

     logOut = (e) =>{
         e.preventDefault();
         this.props.setExitApp(true);
         // this.setState({show:true})
         // axios.get(LOGOUT).then(res=>{
         //     if(res.status===200){
         //         localStorage.removeItem("token");
         //         this.props.seTisAuthenticated(false);
         //         this.props.setUserData({
         //             userFIO: null,
         //             userName: null,
         //             userImage: null,
         //             access_token: null,
         //             user_id: null,
         //             role: null
         //         });
         //         this.props.history.push("/")
         //     }
         //     this.setState({show:false})
         //
         // }).catch(err=>{
         //     this.setState({show:false})
         //    console.log(err)
         // })
     }

     onSubmit = (event) =>{
         event.preventDefault()
         if(this.state.search!==""){
             this.props.history.push("/search/"+this.state.search)
         }

     }


     handleChange = (event) =>{
         this.setState({[event.target.name]:event.target.value})
     }

     render(){
         const {classes} = this.props;

         return (
        <div className={classes.grow}>

            <Loading
                show={this.state.show}
                color="red"
            />
            <ExitDialog dialogBool={false}/>
            <AuthDialog dialogBool={false}/>
            <PhoneNumberConfirm dialogBool={false}/>
            <AppBar position="relative" classes={{root:classes.appBar}}>
                <Container maxWidth="lg">

                <Toolbar className={classes.toolbar} disableGutters={true}>

                    {!this.state.isSerachOpen ?
                        <div className={classes.LogoDiv}>
                        <Link to={'/'} className={classes.home} >
                            <img src={logo} alt="logo"  width="150" />
                        </Link> </div> : ""}


                    {this.state.isSerachOpen ?
                        <div className={classes.searchM}>
                            <form onSubmit={this.onSubmit}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Поиск"
                                name={"search"}
                                onChange={this.handleChange}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                            </form>

                        </div> : ""}

                        <div className={classes.search}>
                            <form onSubmit={this.onSubmit}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Поиск"
                                    name={"search"}
                                    onChange={this.handleChange}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </form>
                        </div>

                        <div className={classes.grow}/>
                    {this.props.isAuthenticated ? <React.Fragment>
                        <Link to={"/account/profile"} className={classes.sectionDesktop}>
                            <Button className={classes.button} onClick={this.logOut}>Выход</Button>
                            <Avatar aria-label="Recipe" src={this.props.userInfo.userImage}/>
                            <Typography>{this.props.userInfo.userFIO}</Typography>
                        </Link>
                    </React.Fragment>:
                            <Button className={classes.button} onClick={this.setAuthClick}>Войти</Button>
                        }

                        <div className={classes.sectionMobile}>
                            {!this.state.isSerachOpen ?
                                <IconButton
                                    aria-haspopup="true"
                                    onClick={this.openSearchbar}
                                    classes={{root: classes.mibileIcon}}
                                    color="inherit"
                                >
                                    <SearchIcon/>
                                </IconButton>
                                :
                                <IconButton
                                    aria-haspopup="true"
                                    onClick={this.openSearchbar}
                                    classes={{root: classes.mibileIcon}}
                                    color="inherit"
                                >
                                    <ClearIcon/>
                                </IconButton>
                            }
                            {!this.state.isSerachOpen ? this.props.isAuthenticated ?
                                    <Link to={"/account/profile"} className={classes.sectionMobileAvatar}>
                                <Avatar aria-label="Recipe" src={this.props.userInfo.userImage}/>
                            </Link> : "" : ""}

                        </div>

                </Toolbar>
            </Container>
            </AppBar>
        </div>
    );}
}

function mapStateToProps(state){
     return {
         isAuthenticated:state.mainData.isAuthenticated,
         userInfo:state.mainData.user
     }
}

function mapDispatchToProps(dispatch){
     return bindActionCreators({setIsAuth, seTisAuthenticated, setUserData, setExitApp}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(TopMenu)));