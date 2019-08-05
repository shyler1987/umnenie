import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {Link} from "react-router-dom";

import selenaAvatar from '../../media/selenaAvatar.jpg';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LeftMenu from '../tools/LeftMenu';

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
    poperContent: {
        padding: 10,
        minHeight:850
    },
    inputHeight: {
        height: 100
    },
    editPЗ: {
        color: '#d7d9e0',
    },
    editP: {
        display: 'flex',
        margin: 5,
        fontSize: 16,
        color: '#e0512a',
        textDecoration: 'underline',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    inlineText: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& p': {
            fontWeight: 700,
            paddingRight:10,
            minWidth: '25%',
            textAlign: 'right'
        }


    },
    titleHead:{
        fontWeight: 600,
        fontSize:30,
        margin: '25px 5px 10px 0px'
    }


});


const API_POLLS = "polls/list";


class PasswordChange extends Component {

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
                <Typography classes={{root:classes.titleHead}} >
                        Сменить пароль
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <Paper classes={{root: classes.poperContent}}>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Старый пароль"}
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Новый пароль"}
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Подтвердите новый пароль"}
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">
                                    <Grid item md={5} sm={12} xs={12}>
                                        <Button fullWidth variant="contained"  color={"secondary"}>Сохранить изменения</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>


            </div>
        );
    }

}

export default withStyles(styles)(PasswordChange);