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
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import setTitle from "../../redux/actions/setTitleAction";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
            maxHeight: '150vh'
        },
    margin: {
        margin: 4,
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
        listItemActive: {
            alignItems: 'center',
            color: '#e05023',
            "&:hover": {
                cursor: 'pointer',

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
        },
    CopyRight: {
        fontSize: 13,
        fontWeight: 400,
        opacity: 0.45,
        color: '#2b2a29',
        [theme.breakpoints.up('sm')]: {
            display:'none'
        }
    },

    })
;
const CHAT_LIST = "profil/chat-list";

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_list: [],
            show: false,
            chatUserShow:false
        };

        this.toChatForm = React.createRef();
    }

    submit = (values, pristineValues) => {
        // get all values and pristineValues on form submission
    }
    showLoadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }

    getChatList = () =>{
        this.showLoadingBar(true);
        axios.get(CHAT_LIST).then(res => {
            if (res.status === 200 ) {
                this.setState({
                    chat_list: res.data.chatList
                })
                console.log(this.state.chat_list[0].chat_id)
            }
            this.showLoadingBar(false);

        }).catch(err => {
            this.showLoadingBar(false);
            console.log(err);
        })
    }
    componentDidMount() {
        this.getChatList();
        this.props.setTitle("Чат");
        this.toChatForm.current.scrollIntoView({behavior: 'smooth', block: 'start'})

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

    chatRouteChange = (chat_id) => (e) =>{
        e.preventDefault();
        this.props.history.push('/chat/'+chat_id);
        this.setState({chatUserShow:true})
    }

    onReadMessage = (bool) =>{
        if(bool){
            this.getChatList();
        }
    }

    render() {
        const {classes} = this.props;
        const now_chat_id=    this.props.match.params.chat_id;
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
                        <Paper ref={this.toChatForm} classes={{root: classes.poperContent}}>
                            <Grid container spacing={3} direction={"row"}>
                                <Grid item md={4} sm={12} xs={12} style={{borderRight: '1px solid #eee'}} className={this.state.chatUserShow ? classes.contentPageOnMobile : classes.contentPageOnDesc }>

                                    <List className={classes.root}>
                                        {this.state.chat_list.map((item, In)=>{

                                            return  (
                                                <div key={In+"1"}>
                                                    <ListItem key={item.chat_id} onClick={this.chatRouteChange(item.chat_id)} alignItems="flex-start" classes={{root: now_chat_id===item.chat_id ? classes.listItemActive : classes.listItem }} button>
                                                        <ListItemAvatar>
                                                            <Link to={"/profile/"+item.userName}>
                                                                <Badge color="secondary" invisible={item.notify===0} badgeContent={item.notify}  classes={{badge:classes.margin}}>
                                                                    <Avatar alt={item.userFIO} src={item.userImage}/>
                                                                </Badge>
                                                            </Link>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item.userFIO}
                                                            classes={{primary: classes.titleFieldesetHead}}
                                                        />
                                                    </ListItem>
                                                    <Divider component="li" classes={{root: classes.dividerCustom}}/>
                                                </div>
                                            );
                                        })}
                                    </List>

                                </Grid>
                                <Grid item md={8} sm={12} xs={12}>
                                    {this.state.chat_list.length>0 && <ChatProfileItem chatUserShow={this.state.chatUserShow} backTo={this.backToChatsList} chat_id={this.props.match.params.chat_id !== undefined ? this.props.match.params.chat_id : this.state.chat_list[0].chat_id} onReadMessage={this.onReadMessage}/>}
                                </Grid>

                            </Grid>

                        </Paper>
                        <Typography classes={{root: classes.CopyRight}} gutterBottom>
                            © 2015-{(new Date().getFullYear())} UMNENIE
                        </Typography>
                    </Grid>
                </Grid>


            </div>
        );
    }

}
function mapDispatch(dispatch) {
    return bindActionCreators({setTitle}, dispatch);
}

function mapStateToProps(state) {
    return {
        notification:state.mainData.notify
    };

}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(ChatPage));