import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles, WithStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    fab: {
        margin: theme.spacing(1),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
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
    }

});

export
interface
DialogTitleProps
extends
WithStyles < typeof styles > {
    id: string;
children: React.ReactNode;
onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class AuthDialog extends Component {

    constructor(props) {
        super(props);
        const {dialogBool} = this.props;
        this.state = {
            show: false,
            dialogBool: dialogBool,
        }
    }


    handleClose = () => {
        this.setState({
            dialogBool: false
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
                <Dialog
                    open={this.state.dialogBool}
                    onClose={this.handleClose}
                    fullWidth={"xs"}
                    maxWidth={"xs"}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" onClose={this.handleClose}>Авторизоваться</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item md={12}>
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
                                    <TextField
                                        fullWidth
                                        id="outlined-bare"
                                        placeholder={"Пароль"}
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

                                    <Button variant="contained" color="secondary" fullWidth className={classes.button}>
                                        Войти
                                    </Button>

                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-start"

                                    >
                                        <Grid item md={6} style={{marginTop: 10, textAlign: 'left'}}>
                                            <Link to={"/"} color="secondary" style={{color:"#e35b1e"}}>
                                                Забыли пароль?
                                            </Link>
                                        </Grid>
                                        <Grid item md={6} style={{marginTop: 10, textAlign: 'right'}}>
                                            <Link to={"/"} style={{color:"#e35b1e"}}>
                                                Регистрация
                                            </Link>
                                        </Grid>
                                        <Grid md={12}>
                                            <Typography variant="h6" align={'center'} gutterBottom>
                                                Быстрый доступ с
                                            </Typography>
                                            <div style={{textAlign:'center'}}>
                                                <Fab size="medium"  color="primary" aria-label="Add" className={classes.fab}>
                                                    <AddIcon/>
                                                </Fab>
                                                <Fab size="medium"  color="primary" aria-label="Add" className={classes.fab}>
                                                    <AddIcon/>
                                                </Fab>
                                                <Fab size="medium"  color="primary" aria-label="Add" className={classes.fab}>
                                                    <AddIcon/>
                                                </Fab>
                                                <Fab size="medium"  color="primary" aria-label="Add" className={classes.fab}>
                                                    <AddIcon/>
                                                </Fab>

                                            </div>
                                        </Grid>

                                    </Grid>
                                </form>
                            </Grid>


                        </Grid>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }

}

export default withStyles(styles)(AuthDialog);