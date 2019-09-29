import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import 'react-loading-bar/dist/index.css'
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../../media/style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

const styles = theme => ({
        multlineInput: {
            padding: 10
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        input: {
            display: 'none',
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
        labelCommentFile: {
            display: 'inline-block',
            marginBottom: 0
        },
        fileSendIcon: {
            padding: 0,
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0)"
            }
        },
        svgRoot: {
            width: '20px',
            height: '20apx',
        },
        contentPage: {
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        },
        contentPageOnMobile: {
            [theme.breakpoints.down('md')]: {
                display: 'block'
            }
        },
        showBackOnMobile: {
            display: 'none',
            [theme.breakpoints.down('md')]: {
                display: 'block'
            }
        }
    })
;

const API_URL_ACTIVE = "profil/chat-messages?chat_id=";
const API_URL_SEND_TXT = "profil/chat-send-text";
const API_URL_SEND_FILE = "profil/chat-send-file";
class ChatProfileItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            chatUserShow:this.props.chatUserShow,
            messages:[],
            text:null,
            to:null,
            userName:null,
            userFio:null,
            userAvatar:null,
        }
    }
    handleSendPhoto = (e) => {
        this.sendToCommentFile(e.target.files[0]);
    }

    sendToCommentFile = (file) => {
        this.showLoadingBar(true);
        var bodyFormData = new FormData();
        bodyFormData.append('chat_image', file);
        bodyFormData.append('to', this.state.to);
        bodyFormData.append('chat_id', this.props.chat_id);
        axios.post(
            API_URL_SEND_FILE,
            bodyFormData
        ).then(res => {
            if (res.status === 202) {
                this.setState({
                    messages:res.data.activeMessages,
                })
            }
            this.showLoadingBar(false);
        }).catch(err => {
            this.showLoadingBar(false);
        })
    }


    submit = (e) => {
        e.preventDefault();
        this.showLoadingBar(true)

        axios.post(API_URL_SEND_TXT, {
            to:this.state.to,
            text:this.state.text,
            chat_id:this.props.chat_id,
        }).then(res=>{
            this.showLoadingBar(false)
            if(res.status===202){
                this.setState({
                    messages:res.data.activeMessages,
                    text:null
                })
            }

        }).catch(err=>{
            this.showLoadingBar(false)

        })
    }
    componentDidMount() {
        this.getActiveMessages(this.props.chat_id);
    }

    getActiveMessages = (chat_id) =>{
        this.showLoadingBar(true)
        axios.get(API_URL_ACTIVE+chat_id).then(res=>{
            if(res.status===200){
                this.setState({
                    to:res.data.to,
                    userName:res.data.userName,
                    userFio:res.data.userFio,
                    userAvatar:res.data.userAvatar,
                    messages:res.data.activeMessages,
                })
            }
            this.showLoadingBar(false)
        }).catch(err=>{
            this.showLoadingBar(false)

        })
    }

    backTo = () =>{
        this.props.backTo(false);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            chatUserShow:nextProps.chatUserShow
        })
        if(this.props.chat_id!==nextProps.chat_id){
            this.getActiveMessages(nextProps.chat_id);
        }
    }
    showLoadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        const {classes} = this.props;
        return (

            <div className={this.state.chatUserShow ? classes.contentPageOnMobile : classes.contentPage}>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <List className={classes.root}>
                    <ListItem  disableGutters={true} onClick={this.backTo}>
                        <ListItemIcon classes={{root:classes.showBackOnMobile}}>
                            <IconButton edge="end" aria-label="delete">
                                <ArrowBack />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemAvatar>
                            <Link to={this.state.userName}>
                            <Avatar alt={this.state.userFio} src={this.state.userAvatar} />
                            </Link>
                        </ListItemAvatar>
                        <ListItemText
                            primary={this.state.userFio}
                        />
                    </ListItem>
                </List>
                <div className={classes.scrollable}>
                    {this.state.messages.map((item, Ind)=>{
                        //*
                        // avatar	http://umnenie.foundrising.uz/uploads/user/foto/2_1569130464.jpg
                        // user_name	Beshimov Nodirjon
                        // user_link	http://api.foundrising.uz/v1/polls/user-profil?user_id=2
                        // date_cr	2019-09-29 19:05:12
                        // file	null
                        // text	test
                        // *//
                        if(item.my_sms ===0){
                            return (
                                <div className="d-flex justify-content-start itemChat">
                                    <div className="img_cont_msg">
                                        <Link to={"/profile/"+item.userName}> <img
                                            src={item.userAvatar} alt={item.userFIO}
                                            className="rounded-circle user_img_msg"/></Link>
                                    </div>
                                    <div className="msg_cotainer">
                                        {item.text!==null && item.text}
                                        {item.file!==null && <img style={{width:'100%'}} src={item.file} />}
                                        <div className="msg_time">{item.date_cr}</div>
                                    </div>
                                </div>
                            );
                        }

                        if(item.my_sms ===1){
                            return (
                                <div className="d-flex justify-content-end itemChat">
                                    <div className="msg_cotainer_send">
                                        {item.text!==null && item.text}
                                        {item.file!==null && <img style={{width:'100%'}} src={item.file} />}
                                        <div className="msg_time_send">{item.date_cr}</div>
                                    </div>
                                    <div className="img_cont_msg">
                                        <Link to={"/profile/"+item.userName}><img
                                            src={item.userAvatar} alt={item.userFIO}
                                            className="rounded-circle user_img_msg"/></Link>
                                    </div>
                                </div>
                            );
                        }

                    })}

                </div>
                <br/>
                <form onSubmit={this.submit}>
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
                            name={"text"}
                            value={this.state.text}
                            onChange={this.handleChange}
                            variant="outlined"
                            className={classes.textField}
                            InputProps={
                                {
                                    classes: {
                                        root: classes.multlineInput
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={this.handleSendPhoto}

                                            />
                                            <label htmlFor="contained-button-file"
                                                   className={classes.labelCommentFile}>
                                                <IconButton variant="contained" component="span"
                                                            classes={{root: classes.fileSendIcon}}>
                                                    <SvgIcon viewBox="0 0 16 16"
                                                             classes={{root: classes.svgRoot}}>
                                                        <defs>
                                                            <clipPath id="clip-path-send">
                                                                <rect
                                                                    id="brooke-cagle-609873-unsplash"
                                                                    width="16" height="16"/>
                                                            </clipPath>
                                                        </defs>
                                                        <g id="Mask_Group_28"
                                                           data-name="Mask Group 28"
                                                           opacity="0.35"
                                                           clip-path="url(#clip-path-send)">
                                                            <path id="paperclip"
                                                                  d="M1.016,9.861,2.2,8.678,7.524,3.353a2.51,2.51,0,0,1,3.55,3.55L5.749,12.229a.558.558,0,0,1-.789-.789l5.325-5.326A1.394,1.394,0,0,0,8.313,4.142L2.987,9.467,1.8,10.65A2.511,2.511,0,1,0,5.355,14.2l.986-.986,5.522-5.522.395-.394A3.626,3.626,0,0,0,7.129,2.17L1.213,8.086A.558.558,0,1,1,.424,7.3L6.341,1.381a4.741,4.741,0,0,1,6.705,6.705L7.129,14l-.987.986A3.626,3.626,0,0,1,1.016,9.861Zm0,0"
                                                                  transform="translate(0.785)"/>
                                                        </g>
                                                    </SvgIcon>
                                                </IconButton>
                                            </label>

                                        </InputAdornment>
                                    ),
                                }
                            }

                        />
                    </Grid>
                    <Grid item md={3} sm={3} xs={3}>
                        <Button variant="contained" type={"submit"} color="secondary" fullWidth
                                className={classes.sectionDesktop}>
                            Отправить
                        </Button>
                        <Button variant="contained" color="secondary"  type={"submit"}  fullWidth
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
                </form>
            </div>

        );
    }

}

export default withStyles(styles)(ChatProfileItem);