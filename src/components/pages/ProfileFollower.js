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

import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
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
    cover:{
        position: 'absolute',
        bottom: -30
    },
    timelineCover:{
        background:`url(${CoverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: 300,
        borderRadius: '0 0 4px 4px',
        position: 'relative',
    },
    buttonFollow:{
        color:"#ffffff",
        fontWeight:600,
        borderColor: '#ffffff',
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
        color:'outline: 5px auto #fff'
    },

});

const API_POLLS = "polls/list";


class Profile extends Component {

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

                                    <Avatar alt="Remy Sharp" src={selenaAvatar} className={classes.bigAvatar} />
                                    <div style={{
                                        bottom: 55,
                                        left: 210,
                                        width: '100%',
                                        position:"absolute"
                                    }}>
                                        <Typography variant="caption" display="block"   style={{
                                            fontWeight: 700,
                                            color:"#fff",
                                        }}>
                                            22.06.19
                                        </Typography>
                                        <Typography variant="h5" fontWeight="fontWeightBold" component="h5" style={{
                                            fontWeight: 700,
                                            color:"#fff",
                                        }}>
                                            Исидатэ Тайти Тайти
                                        </Typography>
                                    </div>




                                </div>
                            </Grid>
                            <Grid item md={6} style={{textAlign:"right"}}>

                                {/*<div style={{*/}
                                {/*// bottom: 55,*/}
                                {/*// left: 210,*/}
                                {/*// width: '100%',*/}
                                {/*// position:"relative"*/}
                                {/*}}>*/}
                                <Button variant="outlined" className={classes.button} classes={{root:classes.buttonFollow}}  color="secondary1" size="large">
                                    Default
                                </Button>

                                <Button variant="outlined" className={classes.button} classes={{root:classes.buttonFollow}}  color="secondary1" size="large">
                                    Default
                                </Button>





                                {/*</div>*/}
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
                        Восстановит пароль
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid md={12}>
                            <Paper className={classes.paper}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-start"
                                    style={{minHeight: 500}}
                                >
                                    <Grid item md={4}>
                                        <form fullWidth>
                                            <TextField
                                                fullWidth
                                                id="outlined-bare"
                                                placeholder={"Номер телефона или почты"}
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                inputProps={{
                                                    style: {
                                                        height: 40,
                                                        padding: '0 14px',
                                                    },
                                                }}
                                            />
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="flex-start"

                                            >
                                                <Grid item md={4}>
                                                    <Button color="primary" fullWidth className={classes.button}>
                                                        Назад
                                                    </Button>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <Button variant="contained" color="secondary" fullWidth
                                                            className={classes.button}>
                                                        Отправить смс
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        </form>
                                        <div>
                                            <p className={classes.textP}>Все права защищены. Используя сайт, вы
                                                обязуетесь выполнять условия <a href={"#"}>Пользовательского
                                                    соглашения.</a></p>
                                        </div>
                                    </Grid>


                                </Grid>


                                <Grid
                                    container
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="flex-end"
                                >
                                    <Grid md={12}>
                                        <Divider variant="fullWidth" component="hr" style={{marginBottom: 10}}/>
                                    </Grid>
                                    <Grid md={6} className={classes.copyright}>
                                        <Typography variant="caption" align={'left'} gutterBottom>
                                            (c) 2015-2019
                                        </Typography>
                                    </Grid>
                                    <Grid md={6} className={classes.callCenter}>
                                        <Typography variant="caption" gutterBottom style={{paddingTop: 5}}>
                                            <Link to={"/"}>Обратиться в службу поддержки</Link>
                                        </Typography>

                                    </Grid>


                                </Grid>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </div>
        );
    }

}

export default withStyles(styles)(Profile);