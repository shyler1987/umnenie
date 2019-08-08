import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import CoverImage from '../../media/back.jpg';
import selenaAvatar from '../../media/selenaAvatar.jpg';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import photoSvg from  '../../media/icons/photo.svg';
import FaceSvg from '../../media/icons/facebook.svg';
import TelegramSvg from '../../media/icons/telegram.svg';
import InstagramSvg from '../../media/icons/instagram.svg';
import WebSvg from '../../media/icons/web.svg';

import { Provider } from 'react-redux'



const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },

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
    bigAvatar: {
        margin: 5,
        width: 180,
        height: 180,
        border: '3px solid #fff',
        [theme.breakpoints.down('md')]: {
            margin: 5,
            width: 90,
            height: 90,
            border: '3px solid #fff',
        },
    },
    cover: {
        position: 'absolute',
        bottom: -30,
        zIndex: 1000
    },
    timelineCover: {
        background: `url(${CoverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: 300,
        borderRadius: '0 0 4px 4px',
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            minHeight: 202,
        }

    },

    button: {
        margin: '15px 0px 15px'
    },
    buttonLine: {
        margin: '0px 5px 0px',
        [theme.breakpoints.down('md')]: {
            width:'100%',
            margin: '5px 0px',
        }
    },
    buttonOblojka: {

    },

    buttonFollow: {
        color: "#ffffff",
        fontWeight: 600,
        borderColor: theme.palette.BorderColor,
        margin: '0px 5px 0px 5px',
        background: 'rgba(43, 42, 41, 0.45)',
        '&:hover': {
            borderColor: '#ffffff',
            background: 'rgba(255, 255, 255, 0.2)'
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: '#ffffff',
            background: 'rgba(43, 42, 41, 0.45)'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
            color: 'outline: 5px auto #fff',
            background: 'rgba(43, 42, 41, 0.45)'
        },
    },
    buttonFollowMobile: {
        color: "#000",
        fontWeight: 600,
        width:'100%',
        borderColor: theme.palette.BorderColor,
        margin: '4px 0px',
        //background: 'rgba(43, 42, 41, 0.45)',
        '&:hover': {
            borderColor: '#ffffff',
            //background: 'rgba(43, 42, 41, 0.45)'
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: '#ffffff',
            //background: 'rgba(43, 42, 41, 0.45)'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
            color: 'outline: 5px auto #fff',
            //background: 'rgba(43, 42, 41, 0.45)'
        },
    },
    buttonFollowMobileLabel:{
        justifyContent: 'normal',
        display: 'flow-root',
        textAlign: 'left'


    },

    profileTitleBar:{
        bottom: 55,
        left: 210,
        width: '150%',
        position: "absolute",
        [theme.breakpoints.down('md')]: {
            left: 110,
            width: '163%',
            right: 0,
            bottom: 40,
            position: 'absolute',
            display: 'inline-block'
        }
    },
    profileTitle:{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize:30,
        fontWeight: 600,
        color: "#fff",
        textShadow: '0 0 20px #000000',
        [theme.breakpoints.down('md')]: {
            fontSize:22,
            fontWeight: 600,
            lineHeight: 'normal',
            textShadow: '0 0 20px #000000',
        }
    }
    ,
    profileTitleDate:{
        textShadow: '0 0 20px #000000',
        fontWeight: 400,
        color: "#fff",
    },
    profileHeadButtonBar:{
        top: 130,
        position: "relative"
    },
    dot: {
        borderRadius: '50%',
        width: 5,
        height: 5,
        background: "#e67043",
        right: 10,
        top: 18,
        position: 'absolute',


    },
    fotoBouttonContainer:{
        marginTop:25,
        padding: '15px 0px 15px',
        minHeight: 74
    },

    buttonLeftPhoto:{
        width: 25,
        marginRight: 10
    },

    socialIcons: {
        display: 'inline',
        margin: '0px 15px 0px',
        "& img": {
            margin: '0px 10px 0px',
            width: 20,
            height: 20
        },
        [theme.breakpoints.down('md')]: {
            display: 'block',
            margin: '10px 0px 10px',
            "& img": {
                margin: '0px 10px 0px',
                width: 20,
                height: 20
            },
        }
    },
    timelineSocial: {
        background: "#fff",
        position: 'relative',
    },
    lineGrid:{
        textAlign: 'right',
        margin: '10px 0px'
    }


});

const API_POLLS = "polls/list";


class ProfileHeadCover extends Component {

    constructor(props) {
        super(props);
        const {profilePhoto} = this.props;
        this.state = {
            profilePhoto:profilePhoto===null ? false : profilePhoto,
            show: false
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.timelineCover}>
                    <Container>
                        <Grid
                            direction={"row"}
                            container
                            alignItems="flex-end"
                        >
                            <Grid item md={6}>
                                <div className={classes.cover}>
                                    <Avatar alt="Remy Sharp" src={selenaAvatar} className={classes.bigAvatar}/>
                                    <div className={classes.profileTitleBar}>
                                        <Typography variant="caption" display="block" classes={{root:classes.profileTitleDate}}>
                                            22.06.19
                                        </Typography>
                                        <Typography   classes={{root:classes.profileTitle}}>
                                            Исидатэ Тайти
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item md={6} style={{textAlign: "right"}} xsDown>

                                    <div className={classes.fotoBouttonContainer}>
                                        {this.state.profilePhoto ? <Button variant="outlined" className={classes.buttonOblojka}
                                                                classes={{root: classes.buttonFollow}} color="secondary1" size="large">
                                            <img src={photoSvg} className={classes.buttonLeftPhoto}/>  Добавить фото обложки
                                        </Button> : ""}

                                    </div>


                                    <div className={classes.profileHeadButtonBar}>

                                        <Button variant="outlined" className={classes.button}
                                                classes={{root: classes.buttonFollow}} color="secondary1" size="large">
                                            Подписчиков <span style={{marginLeft: 20, color: '#e35b1e'}}>255</span> <dot className={classes.dot}></dot>
                                        </Button>
                                        <Button variant="outlined" className={classes.button}
                                                classes={{root: classes.buttonFollow}} color="secondary1" size="large">
                                            Подписки <span style={{marginLeft: 20, color: '#e35b1e'}}>255</span> <dot className={classes.dot}></dot>
                                        </Button>
                                    </div>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Container>
                </div>

                <div className={classes.timelineSocial}>

                    <Container>

                        <Grid
                            direction={"row"}
                            container
                        >
                            <Hidden only={['md', 'xl', 'lg']}>
                                <Grid item md={12} sm={12} xs={12} style={{textAlign: 'center'}}>
                                    <div className={classes.socialIcons}>
                                        <a href={"#"}><img src={WebSvg}/></a>
                                        <a href={"#"}><img src={TelegramSvg}/></a>
                                        <a href={"#"}><img src={FaceSvg}/></a>
                                        <a href={"#"}><img src={InstagramSvg}/></a>

                                    </div>
                                </Grid>
                            </Hidden>
                            <Grid item md={12} sm={12} xs={12} classes={{root:classes.lineGrid}}>
                                <Hidden mdDown>
                                    <div className={classes.socialIcons}>
                                        <a href={"#"}><img src={WebSvg}/></a>
                                        <a href={"#"}><img src={TelegramSvg}/></a>
                                        <a href={"#"}><img src={FaceSvg}/></a>
                                        <a href={"#"}><img src={InstagramSvg}/></a>

                                    </div>
                                </Hidden>

                                <Hidden only={['md', 'xl', 'lg']}>
                                    <Button variant="outlined" className={classes.button}
                                            classes={{root: classes.buttonFollowMobile, label:classes.buttonFollowMobileLabel}} color="secondary1" size="large">
                                        Подписчиков <span style={{marginLeft: 20, color: '#e35b1e', float:"right"}}>255</span> <dot className={classes.dot}></dot>
                                    </Button>
                                    <Button variant="outlined" className={classes.button}
                                            classes={{root: classes.buttonFollowMobile, label:classes.buttonFollowMobileLabel}} color="secondary1" size="large">
                                        Подписки <span style={{marginLeft: 20, color: '#e35b1e', float:"right"}}>255</span> <dot className={classes.dot}></dot>
                                    </Button>

                                </Hidden>

                                <Button variant="contained" size="meduim"  color="secondary" classes={{root:classes.buttonLine}} onClick={()=>{this.props.history.push('/account/profile-edit/')}}>
                                    Редактировать профиль
                                </Button>
                                <Button variant="contained" size="meduim"  color="secondary" classes={{root:classes.buttonLine}}>
                                    Заблокировать
                                </Button>

                                <Button variant="contained" size="meduim" color="secondary" classes={{root:classes.buttonLine}}>
                                    Написать
                                </Button>
                                <Button variant="contained" size="meduim" color="secondary" classes={{root:classes.buttonLine}}>
                                    Подписаться
                                </Button>
                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(ProfileHeadCover);