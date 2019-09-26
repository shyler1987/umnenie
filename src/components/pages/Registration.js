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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import setIsAuth from '../../redux/actions/setIsAuth'
import seTisAuthenticated from '../../redux/actions/seTisAuthenticated'
import setUserData from '../../redux/actions/setUserData'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
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

const API_REGFISTRATION = "account/registry";

const NamesState = [
    'phone',
    'fio',
    'org_name',
    'email',
    'username',
    'password',
    'retry_password',
];
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmitForm = () =>{
        if(this.state.personToggle){
            //fiz litsoi
            const  data = {
                type:1,
                fio:this.state.fio,
                phone:this.state.phone,
                username:this.state.username,
                password:this.state.password,
                retry_password:this.state.retry_password,
            };
            this.regAction(data)
        }else{
            //yur litsoi
            const  data = {
                type:2,
                org_name:this.state.org_name,
                email:this.state.email,
                username:this.state.username,
                password:this.state.password,
                retry_password:this.state.retry_password,
            };
            this.regAction(data)
        }
    }


    regAction = (data) => {
        this.setState({show:true})
        axios.post(API_REGFISTRATION, data).then(res=>{

            this.setState({show:false})
            if(res.status===201){
                localStorage.setItem('token', res.data.data.access_token);
                this.props.seTisAuthenticated(true);
                this.props.setUserData(res.data.data)
                this.props.history.push("/account/profile")
            }

        }).catch(err=>{
            this.setState({show:false})
            let errTextAll = "";
            NamesState.map(item => {
                this.setState({
                    [item + 'Error']: false,
                    [item + 'ErrorText']: null
                });
            })
            if(err.response!==undefined){
                let erors = JSON.parse(err.response.data.message);
                Object.keys(erors).map(item => {
                    let errText = "";
                    erors[item].map(itemError => {
                        errTextAll += itemError + ', ';
                        errText += itemError + ', ';
                    })
                    this.setState({
                        [item + 'Error']: true,
                        [item + 'ErrorText']: errText,
                    });

                });
            }

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
                                    <ValidatorForm
                                        fullWidth
                                        ref="form"
                                        onSubmit={this.onSubmitForm}
                                        onError={errors => console.log(errors)}
                                    >
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
                                                <TextValidator
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"Ф.И.О"}
                                                    name={"fio"}
                                                    value={this.state.fio}
                                                    onChange={this.handleChange}
                                                    validators={['required']}
                                                    errorMessages={['Это поле обязательно к заполнению']}
                                                    error={this.state.fioError}
                                                    helperText={this.state.fioErrorText}
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                                <TextValidator
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"Номер телефона"}
                                                    margin="dense"
                                                    variant="outlined"
                                                    name={"phone"}
                                                    onChange={this.handleChange}
                                                    value={this.state.phone}
                                                    error={this.state.phoneError}
                                                    helperText={this.state.phoneErrorText}
                                                    validators={['required']}
                                                    errorMessages={['Это поле обязательно к заполнению']}
                                                />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <TextValidator
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"Название организация"}
                                                    margin="dense"
                                                    name={"org_name"}
                                                    value={this.state.org_name}
                                                    error={this.state.org_nameError}
                                                    helperText={this.state.org_nameErrorText}
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    validators={['required']}
                                                    errorMessages={['Это поле обязательно к заполнению']}
                                                />
                                                <TextValidator
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"E-mail"}
                                                    name={"email"}
                                                    value={this.state.email}
                                                    error={this.state.emailError}
                                                    helperText={this.state.emailErrorText}
                                                    onChange={this.handleChange}
                                                    margin="dense"
                                                    variant="outlined"
                                                    validators={['required', 'isEmail']}
                                                    errorMessages={['Это поле обязательно к заполнению', 'Email не является допустимым']}
                                                />
                                            </React.Fragment>
                                        }

                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Придумайте логин/имя пользователя"}
                                            variant="outlined"
                                            name={"username"}
                                            value={this.state.username}
                                            error={this.state.usernameError}
                                            helperText={this.state.usernameErrorText}
                                            onChange={this.handleChange}
                                            margin="dense"
                                        />
                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Пароль"}
                                            variant="outlined"
                                            margin="dense"
                                            name={"password"}
                                            value={this.state.password}
                                            error={this.state.passwordError}
                                            helperText={this.state.passwordErrorText}
                                            onChange={this.handleChange}
                                            type={"password"}

                                        />
                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Повторите пароль"}
                                            name={"retry_password"}
                                            value={this.state.retry_password}
                                            onChange={this.handleChange}
                                            type={"password"}
                                            error={this.state.retry_passwordError}
                                            helperText={this.state.retry_passwordErrorText}
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
                                                <Button
                                                    disabled={this.state.show}
                                                    variant="contained" color="secondary" style={{marginTop: 10}} type={"submit"}
                                                        classes={{root: classes.regBtns}} fullWidth>
                                                    Зарегистрироваться
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </ValidatorForm>
                                    <div>
                                        <Typography classes={{root: classes.textP}}>Все права защищены. Используя сайт,
                                            вы обязуетесь выполнять условия <Link to={"/license"} className={classes.textA}>Пользовательского
                                                соглашения.</Link></Typography>

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


function mapDispatch(dispatch) {
    return bindActionCreators({setIsAuth, seTisAuthenticated, setUserData}, dispatch);
}

function mapStateToProps(state) {
    return {
        isAuth:state.mainData.isAuth,
        user:state.mainData.user
    };
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Registration));