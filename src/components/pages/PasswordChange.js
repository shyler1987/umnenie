import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import LeftMenu from '../tools/LeftMenu';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {bindActionCreators} from "redux";
import setTitle from "../../redux/actions/setTitleAction";
import {connect} from "react-redux";

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


});


const API_CHANGE_PASSWORD = "profil/edit-password ";

const NamesState = [
    'old_password',
    'password',
    'retry_password',
];
class PasswordChange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            snakbar: false,
        };

        this.passChange = React.createRef();
    }
    handleClose =()=>{
        this.setState({
            snakbar: false,
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submit = (values, pristineValues) => {
        this.regAction({
            old_password:this.state.old_password,
            password:this.state.password,
            retry_password:this.state.retry_password,
        });
    }

    regAction = (data) => {
        this.setState({show:true})
        axios.post(API_CHANGE_PASSWORD, data).then(res=>{

            this.setState({show:false})
            if(res.status===202){
                localStorage.setItem('token', res.data.access_token);
                this.setState({snakbar:true});
                NamesState.map(item => {
                    this.setState({
                        [item + 'Error']: false,
                        [item + 'ErrorText']: null
                    });
                })
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

            console.log(err)
        })
    }

    componentDidMount() {
        this.props.setTitle("Сменить пароль");
        this.passChange.current.scrollIntoView({behavior: 'smooth', block: 'start'})


    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.snakbar}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Пароль успешно изменен</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <Typography classes={{root:classes.titleHead}} >
                        Сменить пароль
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <Paper ref={this.passChange} classes={{root: classes.poperContent}}>
                                <ValidatorForm onSubmit={this.submit}>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <TextValidator
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Старый пароль"}
                                            className={classes.textField}
                                            variant="outlined"
                                            name={"old_password"}
                                            onChange={this.handleChange}
                                            type={"password"}
                                            value={this.state.old_password}
                                            error={this.state.old_passwordError}
                                            helperText={this.state.old_passwordErrorText}
                                            validators={['required']}
                                            errorMessages={['Это поле обязательно к заполнению']}
                                        />
                                        <TextValidator
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            type={"password"}
                                            placeholder={"Новый пароль"}
                                            className={classes.textField}
                                            variant="outlined"
                                            name={"password"}
                                            onChange={this.handleChange}
                                            value={this.state.password}
                                            error={this.state.passwordError}
                                            helperText={this.state.passwordErrorText}
                                            validators={['required']}
                                            errorMessages={['Это поле обязательно к заполнению']}
                                        />
                                        <TextValidator
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            type={"password"}
                                            placeholder={"Подтвердите новый пароль"}
                                            className={classes.textField}
                                            variant="outlined"
                                            name={"retry_password"}
                                            onChange={this.handleChange}
                                            value={this.state.retry_password}
                                            error={this.state.retry_passwordError}
                                            helperText={this.state.retry_passwordErrorText}
                                            validators={['required']}
                                            errorMessages={['Это поле обязательно к заполнению']}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">
                                    <Grid item md={5} sm={12} xs={12}>
                                        <Button fullWidth variant="contained" type={"submit"} color={"secondary"}>Сохранить изменения</Button>
                                    </Grid>
                                </Grid>
                                </ValidatorForm>
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
    };

}



export default  connect(mapStateToProps, mapDispatch)(withStyles(styles)(PasswordChange));