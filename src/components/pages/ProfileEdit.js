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
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LeftMenu from '../tools/LeftMenu';
import ListItemText from '@material-ui/core/ListItemText';
import OutlinedInput from '@material-ui/core/OutlinedInput';



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
        fontSize: 12,
        color: '#e0512a !important',
        textDecoration: 'underline !important',
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
    titleFieldesetHead:{
        fontWeight: 600,
        fontSize:15,
        marginTop:10
    },
    titleFieldesetHeadKategory:{
        fontWeight: 600,
        fontSize:15,

    },
    muiSeelctRoot:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor

    },
    inLabel:{
        left:'30%',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor
    },inLabelSpeasial:{
        left:'30%',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor
    },
    socSet:{
        fontSize: 15,
        fontWeight: 600
    }



});
const names = [
    'Все',
    'Выберите категорию',

    'Выберите категорию А',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    margin:"dense",
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
    }
};


const API_POLLS = "polls/list";


class ProfileEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            selected:[],
            selectedSpetsializatsiya:[],
        };


    }

    submit = (values, pristineValues) => {
        // get all values and pristineValues on form submission
    }

    handleChange = (event) =>{
        this.setState({ selected: event.target.value});

    }
    handleChangeSpecial = (event) =>{
        this.setState({ selectedSpetsializatsiya: event.target.value});

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
                        Редактировать профиль
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9}>
                            <Paper classes={{root: classes.poperContent}}>
                                <Typography classes={{root:classes.titleFieldesetHead}}>Личная информация</Typography>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                        <Typography classes={{root:classes.titleFieldesetHeadKategory}}>Категория</Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={9}>
                                        <FormControl className={classes.formControl} margin="dense" fullWidth variant="outlined">
                                            {this.state.selected.length===0 ?
                                                <InputLabel htmlFor="outlined-category" classes={{root:classes.inLabel}} shrink={false}>
                                                    Выберите категорию
                                                </InputLabel> : ""}

                                            <Select
                                                multiple
                                                classes={{root:classes.muiSeelctRoot}}
                                                value={this.state.selected}
                                                onChange={this.handleChange}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput  name="category" id="outlined-kategory-simple"/>}
                                                renderValue={selected=>{
                                                    return selected.join(', ');
                                                }}
                                                value={this.state.selected}
                                            >
                                                {names.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
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
                                                        <a className={classes.editP}>
                                                            <EditIcon style={{fontSize: 16, color: '#e0512a'}}/>
                                                            Редактировать
                                                        </a>
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
                                                        <a className={classes.editP}>
                                                            <EditIcon style={{fontSize: 16, color: '#e0512a'}}/>
                                                            Редактировать
                                                        </a>
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
                                                        <a className={classes.editP}>
                                                            <EditIcon style={{fontSize: 16, color: '#e0512a'}}/>
                                                            Редактировать
                                                        </a>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>


                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={6}  sm={12} xs={12}>
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            placeholder={"Телефон"}
                                            className={classes.textField}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" style={{width: '50%'}}>
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
                                            placeholder={"Страна\Город"}
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <FormControl className={classes.formControl} margin="dense" fullWidth variant="outlined">
                                            {this.state.selectedSpetsializatsiya.length===0 ?
                                                <InputLabel htmlFor="outlined-category" classes={{root:classes.inLabelSpeasial}} shrink={false}>Специализация</InputLabel> : ""}
                                            <Select
                                                multiple
                                                value={this.state.selectedSpetsializatsiya}
                                                onChange={this.handleChangeSpecial}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput  name="speacial" id="outlined-speacial-simple"/>}
                                                renderValue={selected=>{
                                                    return selected.join(', ');
                                                }}
                                                value={this.state.selected}


                                            >
                                                {names.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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
                                            <Typography classes={{root:classes.socSet}}>ссылка на сайт</Typography>
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
                                            <Typography classes={{root:classes.socSet}}>Facebook</Typography>
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
                                            <Typography classes={{root:classes.socSet}}>Telegram</Typography>
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
                                            <Typography classes={{root:classes.socSet}}>Twitter</Typography>
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
                                    <Grid item md={12} xs={12} sm={12}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            rows="4"
                                            variant="outlined"
                                            defaultValue="О компании"
                                            className={classes.textField}
                                            margin="normal"
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

export default withStyles(styles)(ProfileEdit);