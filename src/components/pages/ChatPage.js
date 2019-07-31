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
            "&img":{
                border: '2px solid #e05023',
                borderRadius: 30
            }
        },


    },
    chatHeaderTitle:{
        padding: '5px 10px 5px',
        fontWeight: 600
    },
    dvider: {
        marginLeft: 12
    },
    dividerCustom:{
        marginRight:0,
        marginLeft: 16
    },
    poperContent: {
        padding: 10,
        minHeight:850
    },
});


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

                    <Typography variant="h4" fontWeight="fontWeightBold" component="h4" style={{

                        margin: '25px 5px 10px 0px'
                    }}>
                        Чат
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9}>
                            <Paper classes={{root: classes.poperContent}}>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={4} style={{borderRight: '1px solid #eee'}}>
                                        <Typography variant="h5" component={"h4"} classes={{root:classes.chatHeaderTitle}}> Старый пароль</Typography>
                                        <List className={classes.root}>

                                            <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Никита Макаренко"
                                                            src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Никита Макаренко"
                                                />
                                            </ListItem>
                                            <Divider component="li" classes={{root:classes.dividerCustom}}/>
                                            <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Никита Макаренко"
                                                            src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Никита Макаренко"
                                                />
                                            </ListItem>
                                            <Divider component="li" classes={{root:classes.dividerCustom}}/>
                                            <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Никита Макаренко"
                                                            src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Никита Макаренко"
                                                />
                                            </ListItem>
                                            <Divider component="li" classes={{root:classes.dividerCustom}}/>
                                            <ListItem alignItems="flex-start" classes={{root: classes.listItem}}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Никита Макаренко"
                                                            src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Никита Макаренко"
                                                />
                                            </ListItem>
                                            <Divider component="li" classes={{root:classes.dividerCustom}}/>


                                        </List>

                                    </Grid>
                                    <Grid item md={8}>
                                        <div className="d-flex justify-content-start itemChat">
                                            <div className="img_cont_msg">
                                                <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                                    className="rounded-circle user_img_msg"/>
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
                                                <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                                    className="rounded-circle user_img_msg"/>
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
                                                <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                                    className="rounded-circle user_img_msg"/>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start itemChat">
                                            <div className="img_cont_msg">
                                                <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                                    className="rounded-circle user_img_msg"/>
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
                                                <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                                    className="rounded-circle user_img_msg"/>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end itemChat">
                                            <div className="msg_cotainer_send">
                                                Hi Maryam i am good tnx how about you?
                                                <div className="msg_time_send">8:55</div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <img
                                                    src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                                    className="rounded-circle user_img_msg"/>
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
                                            <Grid item md={9}>
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
                                            <Grid item md={3}>
                                                <Button variant="contained" color="secondary" fullWidth
                                                        className={classes.button}>
                                                    Отправить
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