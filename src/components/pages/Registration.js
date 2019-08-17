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
import ButtonGroup from '@material-ui/core/ButtonGroup';

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


        "&:hover": {
            paddingTop: 25,
            outline: '4px',
            paddingBottom: 25,
        },

    },

    textFieldRoot: {
        paddingTop: 25,
        "&:focus": {
            paddingTop: 25,
            outline: '4px',
            paddingBottom: 25,
        },

    },
    textFieldInput: {},
    inputHeight: {
        height: 100
    },
    textP: {
        fontSize: 13,
        textAlign: 'center',
        padding: '10px 20px 10px',
        fontWeight: 600,
        color: "#2b2a29"
    },
    callCenter: {
        textAlign: 'right',
    },
    copyright: {
        textAlign: 'left',
    },
    ButtonGroup: {
        background: '#fff',
        marginBottom: 10
    },
    buttonGroup: {
        color: "#2B2A29"
    },
    buttonGroupActive: {
        background: '#e35b1e',
        color: '#fff',
        border: '1px solid #e35b1e',
        '&:hover': {
            background: '#e35b1e',
            //color:// '#e35b1e',
        }
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            //borderColor: `#e35b1e !important`,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)'
        },
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: 'rgba(0, 0, 0, 0.23)'
        },
    },

    cssFocused: {
        borderColor: `#e35b1e !important`,
    },

    notchedOutline: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        "&:hover": {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)',
        }

    },
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },

    muiBtnLabel: {
        opacity: 0.88
    },
    textA: {
        color: "#e05022",
        textDecoration: 'underline'
    },
    regBtn: {
        marginTop: 10
    },
    marginBottom: {
        marginBottom: 30
    },
    CopyRight: {
        fontSize: 13,
        fontWeight: 400,
        opacity: 0.45,
        color: '#2b2a29'
    },
    support: {
        fontSize: 13,
        fontWeight: 400,
        opacity: 0.45,
        color: '#2b2a29',
        textDecoration: 'underline',
        "&:hover":{
            color: '#2b2a29',
        }
    }

});

const API_POLLS = "polls/list";


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            personToggle: true
        }
    }

    personToggle = () => {
        this.setState({
            personToggle: !this.state.personToggle
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
                <Typography classes={{root: classes.titleHead}}>
                    Регистрация
                </Typography>
                <Grid container spacing={0} classes={{root: classes.marginBottom}}>
                    <Grid md={12} sm={12} xs={12}>
                        <Paper className={classes.paper}>
                            <br/>

                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                style={{minHeight: 500}}
                            >

                                <Grid item md={4} xs={12} sm={12}>
                                    <form fullWidth>
                                        <ButtonGroup fullWidth aria-label="full width outlined button group"
                                                     classes={{root: classes.ButtonGroup}}>
                                            <Button onClick={this.personToggle}
                                                    classes={{root: this.state.personToggle ? classes.buttonGroupActive : ""}}>Физическое
                                                лицо</Button>
                                            <Button onClick={this.personToggle}
                                                    classes={{root: !this.state.personToggle ? classes.buttonGroupActive : ""}}
                                                    color="secondary">Юридическое лицо</Button>

                                        </ButtonGroup>
                                        {this.state.personToggle ?
                                            <React.Fragment>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"Ф.И.О"}
                                                    //className={classes.textField}

                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"Номер телефона"}
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"Название организация"}
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"E-mail"}
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </React.Fragment>
                                        }

                                        <TextField
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Придумайте логин/имя пользователя"}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                        <TextField
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Пароль"}
                                            variant="outlined"
                                            margin="dense"

                                        />
                                        <TextField
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Павтаритие пароль"}

                                            variant="outlined"
                                            margin="dense"

                                        />
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-start"

                                        >

                                            <Grid item md={12}>
                                                <Button variant="contained" color="secondary" style={{marginTop: 10}}
                                                        classes={{root: classes.regBtns}} fullWidth>
                                                    Зарегистрироваться
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </form>
                                    <div>
                                        <Typography classes={{root: classes.textP}}>Все права защищены. Используя сайт,
                                            вы обязуетесь выполнять условия <a href={"#"} className={classes.textA}>Пользовательского
                                                соглашения.</a></Typography>

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
                                    <Typography classes={{root: classes.CopyRight}} gutterBottom>
                                        © 2015-2019 UMNENIE
                                    </Typography>
                                </Grid>
                                <Grid md={6} className={classes.callCenter}>

                                        <Link to={"/"} className={classes.support}>Обратиться в службу поддержки</Link>


                                </Grid>


                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }

}

export default withStyles(styles)(Registration);