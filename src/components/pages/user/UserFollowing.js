import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import ProfileHeadCoverUser from '../../tools/ProfileHeadCoverUser'
import axios from "axios";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import setTitle from "../../../redux/actions/setTitleAction";
import {connect} from "react-redux";


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
    ListButtonInActive: {
        textTransform: 'none',
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

const USER_ME = "profil/user-info";
const USER_SUBSCRIBERS = "profil/subscribers";
const USER_SUBSCRIPTIONS = "profil/subscriptions";
const URL_CLICK = "profil/subscribe-to-user";


class UserFollowing extends Component {

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
        }).catch(err=>{
            this.showLoading(false)
        });
    }




    componentDidMount() {
        this.getUserMe(this.props.match.params.username);
        this.getFollow("profil/user-followers?username="+this.props.match.params.username)
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
        axios.post(USER_ME, {
            username: this.props.match.params.username
        }).then(res => {
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
                this.props.setTitle("Подписки  -" + res.data.userFIO);
            }

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <ProfileHeadCoverUser
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
                        <Grid md={12}>

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

function mapDispatch(dispatch) {
    return bindActionCreators({setTitle}, dispatch);
}

function mapStateToProps(state) {
    return {
    };

}



export default  connect(mapStateToProps, mapDispatch)(withStyles(styles)(UserFollowing));