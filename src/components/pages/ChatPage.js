import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {Link} from "react-router-dom";
import LeftMenu from '../tools/LeftMenu';


import ChatProfileItem from '../tools/ChatProfileItem'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = theme => ({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
            maxHeight: '150vh'
        },

        listItem: {
            alignItems: 'center',
            "&:hover": {
                cursor: 'pointer',
                color: '#e05023',
                "& img": {
                    border: 2,
                    borderStyle: 'solid',
                    borderColor: theme.palette.YellowColor,
                    borderRadius: 50
                }
            },


        },
        dvider: {
            marginLeft: 12
        },
        dividerCustom: {
            marginRight: 0,
            marginLeft: 16
        },
        poperContent: {
            padding: 10,
        },
        titleHead: {
            fontWeight: 600,
            fontSize: 30,
            margin: '25px 5px 10px 0px'
        },
        titleFieldesetHead: {
            fontWeight: 600,
            fontSize: 15,

        },
        avatarChat: {},
        scrollable: {
            overflow: 'auto',
            maxHeight: 500
        },
        contentPageOnDesc: {
            [theme.breakpoints.down('md')]: {
                display: 'block'
            }
        },
        contentPageOnMobile: {
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        }

    })
;


const API_POLLS = "polls/list";


class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            chatUserShow:false
        };
    }

    submit = (values, pristineValues) => {
        // get all values and pristineValues on form submission
    }

    componentDidMount() {
        this.setState({
            show: true
        })
        axios.get(API_POLLS).then(res => {
            if (res.status === 200 && res.data.count > 0) {

                this.setState({
                    polls: res.data.result

                })
            }
            this.setState({
                show: false
            })

        }).catch(err => {
            this.setState({
                show: false
            })
            console.log(err);
        })
    }

    getChats = (profile_id) => {
        this.setState({
            chatUserShow:true
        })
    }

    backToChatsList = (bool) =>{
        this.setState({
            chatUserShow:bool
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

                <Typography classes={{root: classes.titleHead}}>
                    Чат
                </Typography>
                <Grid container spacing={2} direction={"row"}>
                    <Grid item md={3} sm={12} xs={12}>
                        <LeftMenu/>
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                        <Paper classes={{root: classes.poperContent}}>
                            <Grid container spacing={3} direction={"row"}>
                                <Grid item md={4} sm={12} xs={12} style={{borderRight: '1px solid #eee'}} className={this.state.chatUserShow ? classes.contentPageOnMobile : classes.contentPageOnDesc }>

                                    <List className={classes.root}>

                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}} button onClick={this.getChats}>
                                            <ListItemAvatar>
                                                <Link to={"/"}> <Avatar alt="Никита Макаренко"
                                                                        src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"/>
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Никита Макаренко"
                                                classes={{primary: classes.titleFieldesetHead}}
                                            />
                                        </ListItem>
                                        <Divider component="li" classes={{root: classes.dividerCustom}}/>
                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}} button onClick={this.getChats}>
                                            <ListItemAvatar>
                                                <Link to={"/"}>
                                                    <Avatar
                                                        alt="Никита Макаренко"
                                                        classes={{root: classes.avatarChat}}
                                                        src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                                                    />
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Никита Макаренко"
                                                classes={{primary: classes.titleFieldesetHead}}
                                            />
                                        </ListItem>
                                        <Divider component="li" classes={{root: classes.dividerCustom}}/>
                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}} button onClick={this.getChats} >
                                            <ListItemAvatar>
                                                <Link to={"/"}> <Avatar alt="Никита Макаренко"
                                                                        src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"/>
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Никита Макаренко"
                                                classes={{primary: classes.titleFieldesetHead}}
                                            />
                                        </ListItem>
                                        <Divider component="li" classes={{root: classes.dividerCustom}}/>
                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}} button onClick={this.getChats}>
                                            <ListItemAvatar>
                                                <Link to={"/"}> <Avatar alt="Никита Макаренко"
                                                                        src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"/>
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Никита Макаренко"
                                                classes={{primary: classes.titleFieldesetHead}}
                                            />
                                        </ListItem>
                                        <Divider component="li" classes={{root: classes.dividerCustom}}/>


                                    </List>

                                </Grid>
                                <Grid item md={8} sm={12} xs={12}>
                                    <ChatProfileItem chatUserShow={this.state.chatUserShow} backTo={this.backToChatsList}/>
                                </Grid>

                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>


            </div>
        );
    }

}

export default withStyles(styles)(ChatPage);