import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import selenaAvatar from "../../media/selenaAvatar.jpg";
import {Link, NavLink} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    rootHead: {
        fontFamily: "'Source Sans Pro', sans-serif",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        fontWeight: 600,
        fontSize: 18,
        color:'#000'

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
    CopyRight: {
        fontSize: 13,
        fontWeight: 400,
        opacity: 0.45,
        color: '#2b2a29'
    },
    rootTypography: {
        fontSize: 15,
    },
    clickAvatar:{
        display: 'inline-flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        "&:hover":{
            textDecoration:'none'
        }
    }

});


class LeftMenu extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.avatarWithTextRoot}>
                    <Link to={""} className={classes.clickAvatar}>
                        <Avatar alt="Remy Sharp" src={selenaAvatar} className={classes.bigAvatar}/>
                        <div style={{paddingLeft: 10}}>
                            <Typography classes={{root: classes.rootHead}} variant={"h5"}>Исидатэ Тайти</Typography>
                            <Link to={"/"} className={classes.rootLink}>
                                <Typography> Сменить фото профиля</Typography>
                            </Link>
                        </div>
                    </Link>
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
                        <ListItem button component={NavLink} to={"/polls/create"} classes={{root: classes.ListItemRoot}}
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
                    © 2015-2019 UMNENIE
                </Typography>
            </div>
        );
    }


}

export default withStyles(styles)(LeftMenu);

