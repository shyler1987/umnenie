import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Avatar from "@material-ui/core/Avatar";
import selenaAvatar from "../../media/selenaAvatar.jpg";
import {Link, NavLink} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';                                                                                                                                                                        
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
                    <Avatar alt="Remy Sharp" src={selenaAvatar} className={classes.bigAvatar}/>
                    <div style={{paddingLeft: 10}}>
                        <h5 style={{marginBottom: 0}}>Исидатэ Тайти</h5>
                        <Link to={"/"} style={{color: "#e0512a"}}>
                            Сменить фото профиля
                        </Link>
                    </div>
                </div>

                <List component="nav">
                    <Paper className={classes.paper}>
                        <ListItem button classes={{root: classes.ListItemRoot}} to={"/account/profile-edit"}   component={NavLink} activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                primary="Редактировать профиль"
                            />
                        </ListItem>
                    </Paper>
                    <Paper className={classes.paper}>
                        <ListItem button component={NavLink} to={"/account/passchange"}  classes={{root: classes.ListItemRoot}} activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                primary="Сменить пароль"
                            />
                        </ListItem>
                    </Paper>
                    <Paper className={classes.paper}>
                        <ListItem button component={NavLink} to={"/polls/create"}  classes={{root: classes.ListItemRoot}} activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                primary="Создать опрос"
                            />
                        </ListItem>
                    </Paper>
                    <Paper className={classes.paper}>
                        <ListItem button component={NavLink} classes={{root: classes.ListItemRoot}} activeClassName={classes.ListItemRootActive}>
                            <ListItemText
                                primary="Чат"
                            />
                        </ListItem>
                    </Paper>
                </List>
            </div>
        );
    }


}

export default withStyles(styles)(LeftMenu);

