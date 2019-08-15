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
        marginLeft: 0,
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
        color:"#000"

    },
    loginIn:{
        color:theme.palette.mainBlackColor,
        "&:hover":{
            cursor:"pointer",
            textDecoration:'none'
        }
    }
});

 class TopMenu extends React.Component  {
     constructor(props) {
         super(props);
         this.state = {
             isSerachOpen:false
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

     render(){
         const {classes} = this.props;

         return (
        <div className={classes.grow}>
            <AuthDialog dialogBool={false}/>
            <AppBar position="relative" classes={{root:classes.appBar}}>
                <Container maxWidth="lg">

                <Toolbar className={classes.toolbar} disableGutters={true}>

                    {!this.state.isSerachOpen ? <Link to={'/'}>
                        <img src={logo} alt="Kitten"  width="150" />
                    </Link> : ""}


                    {this.state.isSerachOpen ?
                        <div className={classes.searchM}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Поиск"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div> : ""}

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Поиск"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>

                        <div className={classes.grow}/>
                    {this.props.isAuthenticated ? <React.Fragment>
                        <Link to={"/account/profile"} className={classes.sectionDesktop}>
                            <Avatar aria-label="Recipe" src={"http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"}/>
                            <Typography>Исидатэ Тайти</Typography>
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
                                <Avatar aria-label="Recipe" src={"http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"}/>
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
         isAuthenticated:state.mainData.isAuthenticated
     }
}

function mapDispatchToProps(dispatch){
     return bindActionCreators({setIsAuth}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(TopMenu)));