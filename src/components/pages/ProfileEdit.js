import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {Link} from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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


});


const API_POLLS = "polls/list";


class ProfileEdit extends Component {

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

                    <Typography variant="h4" fontWeight="fontWeightBold" component="h4" style={{

                        margin: '25px 5px 10px 0px'
                    }}>
                        Редактировать профиль
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9}>
                            <Paper classes={{root: classes.poperContent}}>
                                <Typography variant={"h6"}>Личная информация</Typography>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={3} classes={{root: classes.inlineText}}>
                                        <Typography>Категория</Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            fullWidth
                                            className={classes.textField}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                                style: {
                                                    height: 40,
                                                },
                                            }}
                                            placeholder={"Выберите категорию"}
                                            variant="outlined"
                                            margin="dense"
                                        >
                                            <MenuItem key={1} value={1}>
                                                Выберите категорию
                                            </MenuItem>
                                            <MenuItem key={2} value={2}>
                                                Выберите категорию
                                            </MenuItem>

                                        </TextField>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Выберите категорию"}
                                            className={classes.textField}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <p className={classes.editP}>
                                                            <EditIcon style={{fontSize: 20}}/> Редактировать
                                                        </p>

                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Название бренда"}
                                            className={classes.textField}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <p className={classes.editP}>
                                                            <EditIcon style={{fontSize: 20}}/> Редактировать
                                                        </p>

                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Название организации"}
                                            className={classes.textField}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <p className={classes.editP}>
                                                            <EditIcon style={{fontSize: 20}}/> Редактировать
                                                        </p>

                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Эл. адрес"}
                                            className={classes.textField}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <p className={classes.editP}>
                                                            <EditIcon style={{fontSize: 20}}/> Редактировать
                                                        </p>

                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>


                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={6}>
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Эл. адрес"}
                                            className={classes.textField}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <span className={classes.editPЗ}>
                                                            нельзя изменить
                                                        </span>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Страна/Город"}
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            fullWidth
                                            className={classes.textField}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                                style: {
                                                    height: 40,
                                                },
                                            }}
                                            placeholder={"Выберите категорию"}
                                            variant="outlined"
                                            margin="dense"
                                        >
                                            <MenuItem key={1} value={1}>
                                                Выберите категорию
                                            </MenuItem>
                                            <MenuItem key={2} value={2}>
                                                Выберите категорию
                                            </MenuItem>

                                        </TextField>
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Фактические адреса"}
                                            className={classes.textField}
                                            variant="outlined"
                                        />

                                    </Grid>


                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <div className={classes.inlineText}>
                                            <Typography>ссылка на сайт</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"http://"}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Facebook</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Telegram</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Twitter</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </div>
                                    </Grid>


                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            rows="4"
                                            variant="outlined"
                                            defaultValue="О себе"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">
                                    <Grid item md={5}>
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

export default withStyles(styles)(ProfileEdit);