import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LeftMenu from '../tools/LeftMenu';
import '../../media/style.css';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';



const styles = theme => ({
        multlineInput: {
            padding: 10
        },
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
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
        chatHeaderTitle: {
            padding: '5px 10px 5px',
            fontWeight: 600
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
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'inherit'
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    })
;


const API_POLLS = "polls/list";


class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false
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
                    <Grid item md={9}>
                        <Paper classes={{root: classes.poperContent}}>
                            <Grid container spacing={3} direction={"row"}>
                                <Grid item md={4} style={{borderRight: '1px solid #eee'}}>
                                    <Typography variant="h5" component={"h4"}
                                                classes={{root: classes.chatHeaderTitle}}> Старый пароль</Typography>
                                    <List className={classes.root}>

                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                            <ListItemAvatar>
                                                <Link to={"/"}> <Avatar alt="Никита Макаренко"
                                                                        src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"/>
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Никита Макаренко"
                                                classes={{primary: classes.titleFieldesetHead}}
                                            />
                                        </ListItem>
                                        <Divider component="li" classes={{root: classes.dividerCustom}}/>
                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                            <ListItemAvatar>
                                                <Link to={"/"}>
                                                    <Avatar
                                                        alt="Никита Макаренко"
                                                        classes={{root: classes.avatarChat}}
                                                        src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    />
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Никита Макаренко"
                                                classes={{primary: classes.titleFieldesetHead}}
                                            />
                                        </ListItem>
                                        <Divider component="li" classes={{root: classes.dividerCustom}}/>
                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                            <ListItemAvatar>
                                                <Link to={"/"}> <Avatar alt="Никита Макаренко"
                                                                        src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"/>
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Никита Макаренко"
                                                classes={{primary: classes.titleFieldesetHead}}
                                            />
                                        </ListItem>
                                        <Divider component="li" classes={{root: classes.dividerCustom}}/>
                                        <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                            <ListItemAvatar>
                                                <Link to={"/"}> <Avatar alt="Никита Макаренко"
                                                                        src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"/>
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
                                <Grid item md={8}>
                                    <div className={classes.scrollable}>
                                        <div className="d-flex justify-content-start itemChat">
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                            <div className="msg_cotainer">
                                                Здраствуйте! Я могу вам чем-то помочь? Если не нужна, то закройте окно
                                                чата Всегда
                                                буду рад ответить Вам.
                                                <div className="msg_time">8:40</div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start itemChat">
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                            <div className="msg_cotainer">
                                                Здраствуйте! Я могу вам чем-то помочь? Если не нужна, то закройте окно
                                                чата Всегда
                                                буду рад ответить Вам.
                                                <div className="msg_time">8:40</div>
                                            </div>
                                        </div>


                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start itemChat">
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                            <div className="msg_cotainer">
                                                Здраствуйте! Я могу вам чем-то помочь? Если не нужна, то закройте окно
                                                чата Всегда
                                                буду рад ответить Вам.
                                                <div className="msg_time">8:40</div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <Link to={"/"}> <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Grid
                                        direction={"row"}
                                        container
                                        spacing={2}
                                        style={{padding: 10}}
                                    >
                                        <Grid item md={9} sm={9} xs={9}>
                                            <TextField
                                                id="standard-multiline-flexible"
                                                fullWidth
                                                multiline
                                                variant="outlined"
                                                className={classes.textField}
                                                InputProps={
                                                    {
                                                        classes: {
                                                            root: classes.multlineInput
                                                        }
                                                    }
                                                }
                                            />
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <Button variant="contained" color="secondary" fullWidth
                                                    className={classes.sectionDesktop}>
                                                Отправить
                                            </Button>
                                            <Button variant="contained" color="secondary" fullWidth
                                                    className={classes.sectionMobile}>
                                                <SvgIcon viewBox="0 0 16 16"
                                                         classes={{root: classes.svgRootP}}>
                                                    <defs>
                                                        <clipPath id="clip-path-sendTg">
                                                            <rect id="brooke-cagle-609873-unsplash"
                                                                  width="16" height="16"
                                                                  transform="translate(750 1484)"
                                                                  fill="#fff"/>
                                                        </clipPath>
                                                    </defs>
                                                    <g id="Mask_Group_27" data-name="Mask Group 27"
                                                       transform="translate(-750 -1484)"
                                                       clip-path="url(#clip-path-sendTg)">
                                                        <g id="paper-plane" transform="translate(750 1484)">
                                                            <path id="Path_1260" data-name="Path 1260"
                                                                  d="M15.863.139a.461.461,0,0,0-.508-.1L.277,6.651A.466.466,0,0,0,0,7.05a.458.458,0,0,0,.232.423l5.257,2.981,3.121,5.311a.464.464,0,0,0,.4.229h.027a.461.461,0,0,0,.4-.276L15.962.647A.455.455,0,0,0,15.863.139Zm-2.4,1.736L5.749,9.541,1.488,7.125ZM8.945,14.518,6.4,10.189l7.761-7.709Z"
                                                                  fill="#fff"/>
                                                        </g>
                                                    </g>
                                                </SvgIcon>
                                            </Button>
                                        </Grid>


                                    </Grid>
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