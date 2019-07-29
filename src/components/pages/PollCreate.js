import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
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

    poperContent: {
        padding: 10
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
        alignItems: 'baseline',
        '& p': {
            fontWeight: 700,
            paddingRight:10,
            minWidth: '25%',
            textAlign: 'right'
        }


    },


});


const API_POLLS = "polls/list";


class PollCreate extends Component {

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
                <Container>
                    <Typography variant="h4" fontWeight="fontWeightBold" component="h4" style={{
                        fontWeight: 700,
                        margin: '25px 5px 10px 0px'
                    }}>
                        Сменить пароль
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9}>
                            <Paper classes={{root: classes.poperContent}}>

                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <div className={classes.inlineText}>
                                            <Typography>Категория</Typography>
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
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Вапрос</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                multiline
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                                helperText="Введите ваши вопрос, например Какой любимый копозиция"
                                            />
                                        </div>

                                    </Grid>
                                    <Grid item md={12}>
                                        <Typography>Дополнительное параметр</Typography>
                                        <div className={classes.inlineText}>
                                            <Typography>Видимость:</Typography>
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
                                                    Виден всем
                                                </MenuItem>
                                                <MenuItem key={2} value={2}>
                                                    Некто
                                                </MenuItem>

                                            </TextField>
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Комментарии:</Typography>
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
                                                    Разрешены
                                                </MenuItem>
                                                <MenuItem key={2} value={2}>
                                                    Некто
                                                </MenuItem>

                                            </TextField>
                                        </div>
<div className={classes.inlineText}>
                                            <Typography>Срок:</Typography>
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
                                                    1 месяц
                                                </MenuItem>
                                                <MenuItem key={2} value={2}>
                                                    Некто
                                                </MenuItem>

                                            </TextField>
                                        </div>


                                        <div className={classes.inlineText}>
                                            <Typography>Хэштэги:</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                multiline
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </div>

                                    </Grid>

                                </Grid>


                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">
                                    <Grid item md={5}>
                                        <Button fullWidth variant="contained"  color={"secondary"}>Далее</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <br/>
                            <br/>

                            <Paper classes={{root: classes.poperContent}}>

                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <div className={classes.inlineText}>
                                            <Typography>Категория</Typography>
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
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Вапрос</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                multiline
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                                helperText="Введите ваши вопрос, например Какой любимый копозиция"
                                            />
                                        </div>

                                    </Grid>
                                    <Grid item md={12}>
                                        <Typography>Дополнительное параметр</Typography>
                                        <div className={classes.inlineText}>
                                            <Typography>Видимость:</Typography>
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
                                                    Виден всем
                                                </MenuItem>
                                                <MenuItem key={2} value={2}>
                                                    Некто
                                                </MenuItem>

                                            </TextField>
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Комментарии:</Typography>
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
                                                    Разрешены
                                                </MenuItem>
                                                <MenuItem key={2} value={2}>
                                                    Некто
                                                </MenuItem>

                                            </TextField>
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography>Срок:</Typography>
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
                                                    1 месяц
                                                </MenuItem>
                                                <MenuItem key={2} value={2}>
                                                    Некто
                                                </MenuItem>

                                            </TextField>
                                        </div>


                                        <div className={classes.inlineText}>
                                            <Typography>Хэштэги:</Typography>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                multiline
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </div>

                                    </Grid>

                                </Grid>


                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">
                                    <Grid item md={5}>
                                        <Button fullWidth variant="contained"  color={"secondary"}>Далее</Button>
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

export default withStyles(styles)(PollCreate);