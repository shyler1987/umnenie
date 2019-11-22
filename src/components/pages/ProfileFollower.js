import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CoverImage from '../../media/back.jpg';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import ProfileHeadCover from '../tools/ProfileHeadCover'
import axios from "axios";
import {Link} from "react-router-dom";
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    paper: {
        //padding: theme.spacing(2),
        margin: '15px 0px 10px',
        color: theme.palette.text.secondary,
        //minHeight:500
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

    timelineCover: {
        background: `url(${CoverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: 300,
        borderRadius: '0 0 4px 4px',
        position: 'relative',
    },
    timelineSocial: {
        background: "#fff",
        position: 'relative',
    },
    button: {
        margin: '15px 0px 15px'
    },
    ListButton: {
        textTransform: 'none'
    },
    btnList:{
        fontSize:13,
    },
    ListButtonInActive: {
        textTransform: 'none',
        fontSize:13,
        color:"#000",
        borderColor:"#eee"
    },
    titleHead:{
        fontWeight: 600,
        fontSize:30,
        margin: '25px 5px 10px 0px'
    },
    textListItem: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize:14,
        fontWeight: 600,
        color:theme.palette.mainBlackColor

    },
    textListItemSecondary: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize:12,
        fontWeight: 400,
        color:theme.palette.YellowColor
    }


});

const USER_ME = "profil/me";
const USER_SUBSCRIBERS = "profil/subscribers";
const USER_SUBSCRIPTIONS = "profil/subscriptions";
const URL_CLICK = "profil/subscribe-to-user";


class ProfileFollower extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            activeButton: 0,
            subscribersCount: 0,
            subscriptionCount: 0,
            social_networks: [],
            userBackground: "",
            userComments: "",
            userFIO: "",
            userId: null,
            userImage: "",
            userRegistryDate: null,
            userType: null,
            follower:[]
        }


    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.match.path!==this.props.match.path){
            this.setTypeComponent(nextProps.match.path);
        }
    }

    clickButton = (user_id) => (e) =>{
        e.preventDefault()
        this.showLoading(true)
        axios.post(URL_CLICK, {
            user_id:user_id
        }).then(res=>{
            this.showLoading(false)
            this.setState({
                follower:res.data
            })
            this.getUserMe();
        }).catch(err=>{
            this.showLoading(false)
        });
    }


    setTypeComponent = (path) =>{
        if(path==="/account/followers"){
            this.getFollow(USER_SUBSCRIBERS)
            this.setState({
                typeComponent:"followers",
                title:"Подписчики "
            })
        }
        if(path==="/account/following"){
            this.getFollow(USER_SUBSCRIPTIONS)
            this.setState({
                typeComponent:"following",
                title:"Подписки"
            })
        }
    }

    componentDidMount() {
        this.setTypeComponent(this.props.match.path);
        this.getUserMe();
    }

    getFollow = (url) =>{
        axios.get(url).then(res => {
            if (res.status === 200) {
                this.setState({follower:res.data})
            }

        }).catch(err => {
            console.log(err)
        })
    }

    showLoading = (bool) =>{
        this.setState({
            show:bool
        })
    }

    getUserMe = () => {
        axios.get(USER_ME).then(res => {
            if (res.status === 200) {
                this.setState({
                    subscribersCount: res.data.subscribersCount,
                    subscriptionCount: res.data.subscriptionCount,
                    social_networks: res.data.social_networks,
                    userBackground: res.data.userBackground,
                    userComments: res.data.userComments,
                    userFIO: res.data.userFIO,
                    userId: res.data.userId,
                    userImage: res.data.userImage,
                    userRegistryDate: res.data.userRegistryDate,
                    userType: res.data.userType,
                })
            }

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <ProfileHeadCover
                    profilePhoto={true}
                    subscribersCount={this.state.subscribersCount}
                    subscriptionCount={this.state.subscriptionCount}
                    social_networks={this.state.social_networks}
                    userBackground={this.state.userBackground}
                    userFIO={this.state.userFIO}
                    userId={this.state.userId}
                    userImage={this.state.userImage}
                    userRegistryDate={this.state.userRegistryDate}
                    userType={this.state.userType}
                    showLoadingBar={this.showLoadingBar}
                />
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Container>
                    <Typography classes={{root:classes.titleHead}} >
                        {this.state.title}
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid md={12} sm={12} xs={12}>

                            <List>
                                {this.state.follower.map((itemFollow, IndexKey) =>{
                                    return (<Paper className={classes.paper}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Link to={"/profile/"+itemFollow.userName} ><Avatar src={itemFollow.avatar} /></Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                classes={{primary:classes.textListItem, secondary:classes.textListItemSecondary}}
                                                primary={itemFollow.userFIO}
                                                secondary={itemFollow.userName}
                                            />
                                            <ListItemSecondaryAction>
                                                <Button variant="contained" color="secondary" onClick={this.clickButton(itemFollow.user_id)}
                                                        className={classes.ListButton} classes={{root:classes.btnList}}>Отменить подписку</Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Paper>)
                                })}


                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}
export default withStyles(styles)(ProfileFollower);