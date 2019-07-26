import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Container from 'react-bootstrap/Container'
import CoverImage from '../../media/back.jpg';
import selenaAvatar from '../../media/selenaAvatar.jpg';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

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
    textField: {},
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
    bigAvatar: {
        margin: 5,
        width: 180,
        height: 180,
        border: '3px solid #fff',
    },
    cover: {
        position: 'absolute',
        bottom: -30,
        zIndex: 1000
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
    ListButtonInActive: {
        textTransform: 'none',
        color:"#000"
    },

    buttonFollow: {
        color: "#ffffff",
        fontWeight: 600,
        borderColor: '#ffffff',
        margin: '0px 5px 0px 5px'
    },
    '&:hover': {
        borderColor: '#ffffff',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#ffffff',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
        color: 'outline: 5px auto #fff'
    },

});

const API_POLLS = "polls/list";


class ProfileFollower extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.timelineCover}>
                    <Container>
                        <Grid
                            direction={"row"}
                            container
                            alignItems="flex-end"
                        >
                            <Grid item md={6}>

                                <div className={classes.cover}>

                                    <Avatar alt="Remy Sharp" src={selenaAvatar} className={classes.bigAvatar}/>
                                    <div style={{
                                        bottom: 55,
                                        left: 210,
                                        width: '100%',
                                        position: "absolute"
                                    }}>
                                        <Typography variant="caption" display="block" style={{
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}>
                                            22.06.19
                                        </Typography>
                                        <Typography variant="h5" fontWeight="fontWeightBold" component="h5" style={{
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}>
                                            Исидатэ Тайти Тайти
                                        </Typography>
                                    </div>


                                </div>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item md={6} style={{textAlign: "right"}} xsDown>

                                    <div style={{

                                        top: 210,
                                        // width: '100%',
                                        position: "relative"
                                    }}>
                                        <Button variant="outlined" className={classes.button}
                                                classes={{root: classes.buttonFollow}} color="secondary1" size="large">
                                            Подписчиков <span style={{marginLeft: 20, color: '#e35b1e'}}>255</span>
                                        </Button>
                                        <Button variant="outlined" className={classes.button}
                                                classes={{root: classes.buttonFollow}} color="secondary1" size="large">
                                            Подписки <span style={{marginLeft: 20, color: '#e35b1e'}}>255</span>
                                        </Button>


                                    </div>
                                </Grid>
                            </Hidden>

                        </Grid>
                    </Container>
                </div>

                <div className={classes.timelineSocial}>
                    <Container>
                        <Grid
                            direction={"row"}
                            container
                            alignItems="flex-end"
                        >
                            <Grid item md={6}>

                            </Grid>
                            <Grid item md={6} style={{textAlign: 'right'}}>

                                <Button variant="contained" size="large" color="secondary" className={classes.button}>
                                    Редактировать профиль
                                </Button>
                            </Grid>

                        </Grid>
                    </Container>
                </div>

                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Container>
                    <Typography variant="h4" fontWeight="fontWeightBold" component="h4" style={{
                        fontWeight: 700,
                        margin: '25px 5px 10px 0px'
                    }}>
                        Подписки
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid md={12}>

                            <List>

                                <Paper className={classes.paper}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Single-line item"
                                            secondary={'Secondary text'}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button variant="contained" color="secondary"
                                                    className={classes.ListButton}>Подписаться</Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Single-line item"
                                            secondary={'Secondary text'}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button  color="secondary"
                                                    className={classes.ListButtonInActive}>Подписки</Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Single-line item"
                                            secondary={'Secondary text'}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button color="secondary"
                                                    className={classes.ListButtonInActive}>Подписки</Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Single-line item"
                                            secondary={'Secondary text'}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button color="secondary"
                                                    className={classes.ListButtonInActive}>
                                                Подписки
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>



                            </List>


                        </Grid>
                    </Grid>
                </Container>

            </div>
        );
    }

}

export default withStyles(styles)(ProfileFollower);