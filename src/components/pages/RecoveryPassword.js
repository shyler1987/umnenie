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
    textField: {

    },
    inputHeight:{
        height:100
    },
    textP:{
        fontSize: 13,
        textAlign: 'center',
        padding: '10px 20px 10px',
        fontWeight: 600,
        color:"#2b2a29"
    },
    callCenter:{
        textAlign: 'right',
    },
    copyright:{
        textAlign: 'left',
    },
    ButtonGroup:{
        background: '#fff',
    },
    buttonGroupActive:{
        background: '#e35b1e',
        color: '#fff',
        border: '1px solid #e35b1e',
        '&:hover':{
            background:'rgba(227, 91, 30, 0.08)',
            color: '#e35b1e',
        }
    },
    titleHead:{
        fontWeight: 600,
        fontSize:30,
        margin: '25px 5px 10px 0px'
    },
    outlinedPrimary:{
        border: "1px solid #e6e6e6",
        "&:hover":{
            border: "1px solid #e6e6e6",
        }

    },
    muiBtnLabel:{
        opacity: 0.88
    },
    textA:{
        color:"#e05022",
        textDecoration:'underline'
    },
    marginBottom:{
        marginBottom:30
    }





});

const API_POLLS = "polls/list";


class RecoveryPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show:false
        }
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
                    Восстановит пароль
                </Typography>
                <Grid container spacing={0} classes={{root:classes.marginBottom}} >
                    <Grid md={12}>
                        <Paper className={classes.paper}>

                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                style={{minHeight:500}}
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
                                                    height:40,
                                                    padding: '0 14px',
                                                },
                                            }}
                                        />
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-start"
                                            spacing={2}

                                        >
                                            <Grid item md={4}>
                                                <Button  color="primary" variant={"outlined"} fullWidth classes={{outlinedPrimary:classes.outlinedPrimary}}>
                                                    Назад
                                                </Button>
                                            </Grid>
                                            <Grid item md={8}>
                                                <Button variant="contained" color="secondary" fullWidth classes={{label:classes.muiBtnLabel}}>
                                                    Отправить смс
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </form>
                                    <div>
                                        <Typography classes={{root:classes.textP}}>Все права защищены. Используя сайт, вы обязуетесь выполнять условия <a href={"#"} className={classes.textA}>Пользовательского соглашения.</a></Typography>
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
                                    <Divider variant="fullWidth" component="hr"  style={{marginBottom:10}}/>
                                </Grid>
                                <Grid md={6} className={classes.copyright} >
                                    <Typography variant="caption" align={'left'} gutterBottom >
                                        (c) 2015-2019
                                    </Typography>
                                </Grid>
                                <Grid md={6} className={classes.callCenter}>
                                    <Typography variant="caption"  gutterBottom style={{paddingTop:5}}>
                                        <Link to={"/"}>Обратиться в службу поддержки</Link>
                                    </Typography>

                                </Grid>


                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>


            </div>
        );
    }

}

export default withStyles(styles)(RecoveryPassword);