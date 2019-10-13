import React, {Component} from 'react';
import {withRouter} from "react-router";
import Button from '@material-ui/core/Button';

import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {withStyles} from '@material-ui/styles';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import selenaAvatar from "../../media/selenaAvatar.jpg";
import {Link, NavLink} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import setIsAuth from "../../redux/actions/setIsAuth";
import seTisAuthenticated from "../../redux/actions/seTisAuthenticated";
import setUserData from "../../redux/actions/setUserData";
import axios from "axios";

const styles = theme => ({
    rootHead: {
        fontFamily: "'Source Sans Pro', sans-serif",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        fontWeight: 600,
        fontSize: 18,
        color: '#000'

        // backgroundColor: theme.palette.background.paper,
    },
    rootLink: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 400,
        fontSize: 15,
        color: "#e0512a",
        "&:hover": {
            color: "#e0512a",
        }
    },
    title: {
        marginBottom: 0
    },
    papeRoot: {
        //padding: theme.spacing(2),
        margin: '0px 0px 8px',
        color: theme.palette.text.secondary,
        //minHeight:500
    },
    bigAvatar: {
        width: 70,
        height: 70
    },
    avatarWithTextRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ListItemRoot: {
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 4,

        '&:hover': {
            background: '#e0512a',
            color: "#fff",
            borderRadius: 4
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: '#ffffff',
            borderRadius: 4
        },
        '&:focus': {
            boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
            color: 'outline: 5px auto #fff',
            borderRadius: 4
        },
    },
    ListItemRootActive: {
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 4,
        background: '#e0512a',
        color: "#fff",
        '&:hover': {
            background: '#e0512a',
            color: "#fff",
            borderRadius: 4
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: '#ffffff',
            borderRadius: 4
        },
        '&:focus': {
            boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
            color: 'outline: 5px auto #fff',
            borderRadius: 4
        },
    },
    itemTitle: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 600,
        fontSize: 15,
    },
    avatarTitle: {},
    input: {display: 'none'},
    CopyRight: {
        fontSize: 13,
        fontWeight: 400,
        opacity: 0.45,
        color: '#2b2a29',
        [theme.breakpoints.down('md')]: {
            display:'none'
        }
    },
    rootTypography: {
        fontSize: 15,
    },
    clickAvatar: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        "&:hover": {
            textDecoration: 'none'
        }
    },
    changePhoto: {
        color: '#e0512a',

        textDecoration: 'underline',

        cursor: 'pointer'
    }

});
const API_USER_IMAGE = "profil/add-avatar";

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        const {userInfo} = this.props;
        this.state = {
            userImage: userInfo.userImage,
            userFIO: userInfo.userFIO,
            show: false
        }

    }

    showLoadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.userInfo.userImage !== this.state.userImage) {
            this.setState({
                userImage: nextProps.userInfo.userImage,
            })
        }
        if (nextProps.userInfo.userFIO !== this.state.userFIO) {
            this.setState({
                userFIO: nextProps.userInfo.userFIO
            })
        }
    }

    handleSendPhoto = (e) => {
        this.sendToCommentFile(e.target.files[0]);
    }

    sendToCommentFile = (file) => {
        this.showLoadingBar(true);
        var bodyFormData = new FormData();
        bodyFormData.append('user_image', file);
        axios.post(
            API_USER_IMAGE,
            bodyFormData
        ).then(res => {
            if (res.status === 202) {

                this.setState({
                    userImage: res.data.userImage
                })
                this.forceUpdate()
            }
            this.showLoadingBar(false);
        }).catch(err => {
            console.log(err)
            this.showLoadingBar(false);

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
                <div className={classes.avatarWithTextRoot}>
                    <div className={classes.clickAvatar}>
                        <Link to={"/account/profile"}><Avatar alt={this.state.userFIO} src={this.state.userImage}
                                              className={classes.bigAvatar}/></Link>
                        <div style={{paddingLeft: 10}}>
                            <Link to={"/account/profile"}><Typography classes={{root: classes.rootHead}}
                                                      variant={"h5"}>{this.state.userFIO}</Typography></Link>


                            <label htmlFor="contained-button-avatar">
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-avatar"
                                    type="file"
                                    onChange={this.handleSendPhoto}
                                />
                                <a component={"span"} className={classes.rootLink}>
                                    <Typography classes={{root: classes.changePhoto}}> Сменить фото профиля</Typography>
                                </a>
                            </label>
                        </div>
                    </div>
                </div>

                <List component="nav">
                    <Paper className={classes.papeRoot}>
                        <ListItem button classes={{root: classes.ListItemRoot}} to={"/account/profile-edit"}
                                  component={NavLink} activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                classes={{primary: classes.itemTitle}}
                                primary="Редактировать профиль"
                            />
                        </ListItem>
                    </Paper>
                    <Paper className={classes.papeRoot}>
                        <ListItem button component={NavLink} to={"/account/passchange"}
                                  classes={{root: classes.ListItemRoot}} activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                classes={{primary: classes.itemTitle}}
                                primary="Сменить пароль"
                            />
                        </ListItem>
                    </Paper>
                    <Paper className={classes.papeRoot}>
                        <ListItem button component={NavLink} to={"/poll/create"} classes={{root: classes.ListItemRoot}}
                                  activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                classes={{primary: classes.itemTitle}}
                                primary="Создать опрос"
                            />
                        </ListItem>
                    </Paper>
                    <Paper className={classes.papeRoot}>
                        <ListItem button component={NavLink} to={"/chat"} classes={{root: classes.ListItemRoot}}
                                  activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                classes={{primary: classes.itemTitle}}
                                primary="Чат"
                            />
                        </ListItem>
                    </Paper>
                </List>
                <Typography classes={{root: classes.CopyRight}} gutterBottom>
                    © 2015-{(new Date().getFullYear())} UMNENIE
                </Typography>
            </div>
        );
    }


}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.mainData.isAuthenticated,
        userInfo: state.mainData.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(LeftMenu)));