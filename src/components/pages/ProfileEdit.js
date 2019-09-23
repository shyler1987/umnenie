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
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withRouter } from "react-router";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
    formControl: {
        width: '100%',
        textAlign: 'center'
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
        minHeight: 850
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
            paddingRight: 10,
            minWidth: '25%',
            textAlign: 'right'
        }
    },
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },
    titleFieldesetHead: {
        fontWeight: 600,
        fontSize: 15,
        marginTop: 10
    },
    titleFieldesetHeadKategory: {
        fontWeight: 600,
        fontSize: 15,

    },
    muiSeelctRoot: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor,
    },
    muiSelectRootL: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor,
        "&::after": {
            content: "'▾'",
            paddingLeft: 5,
            fontSize: 10
        }
    },
    inLabel: {
        left: '-15px',
        width: '100%',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor,
        "&::after": {
            content: "'▾'",
            paddingLeft: 5,
            fontSize: 10
        }
    },

    inLabelSpeasial: {
        left: '-15px',
        width: '100%',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor,
        "&::after": {
            content: "'▾'",
            paddingLeft: 5,
            fontSize: 10
        }
    },
    socSet: {
        fontSize: 15,
        fontWeight: 600
    },
    noPadding:{
        paddingTop: '0px !important',
        paddingBottom:  '0px !important'
    }


});
const NamesState = [
    'userFIO',
    'userName',
    'userComments',
    'userGender',
    'facebook',
    'telegram',
    'twitter',
    'site',
    'org_name',
    'factual_address',
    'email',
    'address',
    'birthday',
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
    margin: "dense",
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
    }
};


const API_POLLS = "polls/list";
const API_CATEGORY = "profil/categories";
const API_SPECIAL = "profil/specialization";


class ProfileEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            selected: [],
            category_id: [],
            specialization_id: [],
            spetsializatsiya: [],
            category: [],
            selectedKategoriya: [],
        };


    }

    submit = (values, pristineValues) => {
        // get all values and pristineValues on form submission
    }

    handleChange = (event) => {
        this.setState({category_id: event.target.value});
    }

    handleChangeField = (e) => {
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    handleChangeSpecial = (event) => {
        this.setState({specialization_id: event.target.value});

    }
    loadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }

    getSpecial = () => {
        this.loadingBar(true)
        axios.get(API_SPECIAL).then(res => {
            this.loadingBar(false)
            if (res.status === 200) {
                this.setState({
                    spetsializatsiya: res.data
                })
            }
        }).catch(err => {
            this.loadingBar(false)
        })
    }
    /*
    userId	2
userFIO	Beshimov Nodir
userName	nodir
userImage	http://umnenie.foundrising.uz/uploads/user/foto/2_1569130464.jpg
userBackground	http://umnenie.foundrising.uz/uploads/user/logo/2_1569128849.jpg
userType	1
userTypeName	Физическое лицо
userRegistryDate	08.08.2019
userComments	man bu dastur orqali ozimni vaqtimni tejash niyatim bor
userGender	Мужской
social_networks	{…}
facebook	facebook.com
telegram	telegram.org
twitter	twitter.com
site	nodir.uz
email	nodir@gmail.com
category_id	1,2
categoryNames	Sport,Musiqa,
phone	+998 97 726-33-66
address	Tashkent
specialization_id	1,2
specializationNames	Dasturlash,Tibbiyot,
verified	0
profi_status	1
birthday	21.07.2011
mobile_phone
expire_at	1569309343
access_token	YFyIVuZGUkgY3YlQPPWbhy_I_WFFmD-2
subscriptionCount	1
subscribersCount	2
    * */

    /**
     *
     * {"JSON":{"userId":4,"userFIO":"Samad TextTile","userName":"sanjar",
     * "userImage":"http://umnenie.foundrising.uz/img/no_user.jpg",
     * "userBackground":"http://umnenie.foundrising.uz/uploads/user/logo/4.jpg",
     * "userType":2,"userTypeName":"Юридическое лицо",
     * "userRegistryDate":"08.08.2019",
     * "userComments":"Davronbek zor bola","userGender":"Женский",
     * "social_networks":{"site":"sanjar.uz"},"facebook":"","telegram":"","twitter":""
     * ,"site":"sanjar.uz","org_name":"Samad TextTile",
     * "factual_address":"Toshkent viloyati, Zangiota tumani",
     * "mobile_phone":"+998 71 124-59-68",
     * "email":"sanjar@gmail.com",
     * "category_id":null,"categoryNames":"","phone":"+998 91 656-96-56","address":"Jizzax",
     * "specialization_id":null,"specializationNames":"","verified":0,
     * "profi_status":0,"birthday":"08.08.1970","expire_at":1569324434,
     * "access_token":"s28FieASo2XmGBHWKthVBhG2ZtkDgaBC"
     * ,"subscriptionCount":0,"subscribersCount":0},"Response payload":{"EDITOR_CONFIG":{"text":"{\"userId\":4,\"userFIO\":\"Samad TextTile\",\"userName\":\"sanjar\",\"userImage\":\"http://umnenie.foundrising.uz/img/no_user.jpg\",\"userBackground\":\"http://umnenie.foundrising.uz/uploads/user/logo/4.jpg\",\"userType\":2,\"userTypeName\":\"Юридическое лицо\",\"userRegistryDate\":\"08.08.2019\",\"userComments\":\"Davronbek zor bola\",\"userGender\":\"Женский\",\"social_networks\":{\"site\":\"sanjar.uz\"},\"facebook\":\"\",\"telegram\":\"\",\"twitter\":\"\",\"site\":\"sanjar.uz\",\"org_name\":\"Samad TextTile\",\"factual_address\":\"Toshkent viloyati, Zangiota tumani\",\"mobile_phone\":\"+998 71 124-59-68\",\"email\":\"sanjar@gmail.com\",\"category_id\":null,\"categoryNames\":\"\",\"phone\":\"+998 91 656-96-56\",\"address\":\"Jizzax\",\"specialization_id\":null,\"specializationNames\":\"\",\"verified\":0,\"profi_status\":0,\"birthday\":\"08.08.1970\",\"expire_at\":1569324434,\"access_token\":\"s28FieASo2XmGBHWKthVBhG2ZtkDgaBC\",\"subscriptionCount\":0,\"subscribersCount\":0}","mode":"application/json"}}}
     *
     *
     * */

    editUser = () => {
        let userData = {
            userFIO: this.state.userFIO,
            userName: this.state.userName,
            userType: this.state.userType,
            userComments: this.state.userComments,
            userGender: this.state.userGender,
            facebook: this.state.facebook,
            telegram: this.state.telegram,
            twitter: this.state.twitter,
            site: this.state.site,
            org_name: this.state.org_name,
            factual_address: this.state.factual_address,
            email: this.state.email,
            category_id: this.state.category_id,
            address: this.state.address,
            specialization_id: this.state.specialization_id,
            birthday: this.state.birthday,
        }
        this.loadingBar(true)
        axios.post("profil/edit-profile", userData).then(res => {
            this.loadingBar(false)
            if(res.status===202){
                this.props.history.push("/account/profile");
            }
        }).catch(err => {
            this.loadingBar(false)
            if(err.response.status===422){
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
            }
        });

    }


    fetchMe = () => {
        this.loadingBar(true)
        axios.get("profil/me").then(res => {
            if (res.status === 200) {
                Object.keys(res.data).map(item => {
                    this.setState({
                        [item]: res.data[item]
                    })
                })
            }
            this.loadingBar(false)
        }).catch(err => {
            this.loadingBar(false)
        })
    }

    getCoategorys = () => {
        this.loadingBar(true)
        axios.get(API_CATEGORY).then(res => {
            this.loadingBar(false)
            if (res.status === 200) {
                this.setState({
                    category: res.data
                })
            }
        }).catch(err => {
            this.loadingBar(false)
        })
    }

    componentDidMount() {
        this.getSpecial();
        this.getCoategorys();
        this.fetchMe();
    }

    onSubmitForm = () => {
        this.editUser();
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
                    Редактировать профиль
                </Typography>
                <Grid container spacing={2} direction={"row"}>
                    <Grid item md={3} sm={12} xs={12}>
                        <LeftMenu/>
                    </Grid>
                    <Grid item md={9}>
                        <ValidatorForm
                            fullWidth
                            ref="form"
                            onSubmit={this.onSubmitForm}
                        >
                            <Paper classes={{root: classes.poperContent}}>
                                <Typography classes={{root: classes.titleFieldesetHead}}>Личная информация</Typography>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                        <Typography
                                            classes={{root: classes.titleFieldesetHeadKategory}}>Категория</Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={9}>
                                        <FormControl className={classes.formControl} margin="dense" fullWidth
                                                     variant="outlined">
                                            {this.state.category_id.length === 0 ?
                                                <InputLabel htmlFor="outlined-category"
                                                            classes={{root: classes.inLabel}}
                                                            shrink={false}>
                                                    Выберите категорию
                                                </InputLabel> : ""}

                                            <Select
                                                multiple
                                                IconComponent={() => {
                                                    return "";
                                                }}
                                                classes={{root: this.state.category_id.length === 0 ? classes.muiSeelctRoot : classes.muiSelectRootL}}
                                                value={this.state.category_id}
                                                onChange={this.handleChange}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput name="category" id="outlined-kategory-simple"/>}
                                                renderValue={selected => {
                                                    if(this.state.category.length>0){
                                                        let nn = [];
                                                        selected.map(item => {
                                                            nn.push(this.state.category.find(it => it.id == item).name);
                                                        });
                                                        return nn.join(", ");
                                                    }
                                                    return selected.join(", ");

                                                }}
                                            >
                                                {this.state.category.map(item => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        <ListItemText primary={item.name}/>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        {this.state.userType === 2 ? <React.Fragment>

                                            <TextValidator
                                                name={"org_name"}
                                                value={this.state.org_name}
                                                validators={['required']}
                                                errorMessages={['Это поле обязательно к заполнению']}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"Название организации"}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.org_nameError}
                                                helperText={this.state.org_nameErrorText}
                                            />
                                            <TextValidator
                                                name={"email"}
                                                validators={['required']}
                                                errorMessages={['Это поле обязательно к заполнению']}
                                                value={this.state.email}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"Эл. адрес"}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.emailError}
                                                helperText={this.state.emailErrorText}
                                            />
                                            <TextValidator
                                                name={"userName"}
                                                value={this.state.userName}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"Имя пользователя"}
                                                className={classes.textField}
                                                variant="outlined"
                                                validators={['required']}
                                                errorMessages={['Это поле обязательно к заполнению']}
                                                error={this.state.userNameError}
                                                helperText={this.state.userNameErrorText}
                                            />
                                        </React.Fragment> : ""}


                                        {this.state.userType === 1 ? <React.Fragment>
                                            <TextValidator
                                                name={"userFIO"}
                                                value={this.state.userFIO}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"И.Ф.О"}
                                                className={classes.textField}
                                                variant="outlined"
                                                validators={['required']}
                                                errorMessages={['Это поле обязательно к заполнению']}
                                                error={this.state.userFIOError}
                                                helperText={this.state.userFIOErrorText}
                                            />
                                            <TextValidator
                                                name={"userName"}
                                                value={this.state.userName}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"Имя пользователя"}
                                                className={classes.textField}
                                                variant="outlined"
                                                validators={['required']}
                                                errorMessages={['Это поле обязательно к заполнению']}
                                                error={this.state.userNameError}
                                                helperText={this.state.userNameErrorText}
                                            />
                                            <TextValidator
                                                name={"email"}
                                                value={this.state.email}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"Эл. адрес"}
                                                className={classes.textField}
                                                variant="outlined"
                                                validators={['required']}
                                                errorMessages={['Это поле обязательно к заполнению']}
                                                error={this.state.emailError}
                                                helperText={this.state.emailErrorText}
                                            />
                                        </React.Fragment> : ""}

                                    </Grid>


                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    {this.state.userType === 1 ?

                                        <React.Fragment>
                                            <Grid item md={6} sm={12} xs={12} className={classes.noPadding}>
                                                <TextValidator
                                                    validators={['required']}
                                                    errorMessages={['Это поле обязательно к заполнению']}
                                                    name={"phone"}
                                                    value={this.state.phone}
                                                    onChange={this.handleChangeField}
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
                                                    error={this.state.phoneError}
                                                    helperText={this.state.phoneErrorText}
                                                />

                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12} className={classes.noPadding}>
                                                <FormControl className={classes.formControl} margin="dense" fullWidth
                                                             variant="outlined">
                                                    {this.state.userGender === null ?
                                                        <InputLabel htmlFor="outlined-category"
                                                                    classes={{root: classes.inLabelSpeasial}}
                                                                    shrink={false}>ПОЛ</InputLabel> : ""}
                                                    <Select
                                                        IconComponent={() => {
                                                            return "";
                                                        }}
                                                        name={"userGender"}
                                                        onChange={this.handleChangeField}

                                                        classes={{root: this.state.userGender === null ? classes.muiSeelctRoot : classes.muiSelectRootL}}
                                                        MenuProps={MenuProps}
                                                        renderValue={select => {
                                                            let dd = ["Мужиское", "Женское"];
                                                            return dd[select];
                                                        }}
                                                        input={<OutlinedInput name="speacial"
                                                                              id="outlined-speacial-simple"/>}
                                                        value={this.state.userGender}
                                                    >
                                                        <MenuItem key={"key0pol"} value={0}>
                                                            <ListItemText primary={"Мужиское"}/>
                                                        </MenuItem>
                                                        <MenuItem key={"key1pol"} value={1}>
                                                            <ListItemText primary={"Женское"}/>
                                                        </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12} className={classes.noPadding}>
                                                <TextField
                                                    name={"birthday"}
                                                    type="date"
                                                    format={'YYYY-MM-DD'}
                                                    value={this.state.birthday}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={this.handleChangeField}
                                                    margin="dense"
                                                    id="outlined-name"
                                                    defaultValue={this.state.birthday}
                                                    fullWidth
                                                    placeholder={"Дата рождения"}
                                                    className={classes.textField}
                                                    variant="outlined"
                                                    error={this.state.birthdayError}
                                                    helperText={this.state.birthdayErrorText}
                                                />
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12} className={classes.noPadding}>
                                                <FormControl className={classes.formControl} margin="dense" fullWidth
                                                             variant="outlined">
                                                    {this.state.specialization_id.length === 0 ?
                                                        <InputLabel htmlFor="outlined-category"
                                                                    classes={{root: classes.inLabelSpeasial}}
                                                                    shrink={false}>Специализация</InputLabel> : ""}
                                                    <Select
                                                        multiple
                                                        value={this.state.specialization_id}
                                                        onChange={this.handleChangeSpecial}
                                                        IconComponent={() => {
                                                            return "";
                                                        }}
                                                        classes={{root: this.state.specialization_id.length === 0 ? classes.muiSeelctRoot : classes.muiSelectRootL}}
                                                        MenuProps={MenuProps}
                                                        input={<OutlinedInput name="speacial"
                                                                              id="outlined-speacial-simple"/>}
                                                        renderValue={selected => {
                                                            let nn = [];
                                                            if (this.state.spetsializatsiya.length !== 0) {
                                                                selected.map(item => {
                                                                    nn.push(this.state.spetsializatsiya.find(it => it.id == item).name);
                                                                });
                                                                return nn.join(", ");
                                                            }
                                                            return selected.join(", ");


                                                        }}
                                                    >
                                                        {this.state.spetsializatsiya.map(item => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                <ListItemText primary={item.name}/>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>


                                            </Grid>

                                            <Grid item md={12} sm={12} xs={12} className={classes.noPadding}>
                                                <TextValidator
                                                    name={"address"}
                                                    value={this.state.address}
                                                    onChange={this.handleChangeField}
                                                    margin="dense"
                                                    id="outlined-name"
                                                    fullWidth
                                                    placeholder={"Страна\Город"}
                                                    className={classes.textField}
                                                    variant="outlined"
                                                    validators={['required']}
                                                    errorMessages={['Это поле обязательно к заполнению']}
                                                    error={this.state.addressError}
                                                    helperText={this.state.addressErrorText}
                                                />
                                            </Grid>
                                        </React.Fragment> : ""}

                                    {this.state.userType === 2 ? <React.Fragment>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <TextValidator
                                                name={"phone"}
                                                validators={['required']}
                                                errorMessages={['Это поле обязательно к заполнению']}
                                                value={this.state.phone}
                                                onChange={this.handleChangeField}
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
                                                error={this.state.phoneError}
                                                helperText={this.state.phoneErrorText}
                                            />
                                            <TextField
                                                onChange={this.handleChangeField}
                                                name={"address"}
                                                value={this.state.address}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"Страна\Город"}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.addressError}
                                                helperText={this.state.addressErrorText}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <FormControl className={classes.formControl} margin="dense" fullWidth
                                                         variant="outlined">
                                                {this.state.specialization_id.length === 0 ?
                                                    <InputLabel htmlFor="outlined-category"
                                                                classes={{root: classes.inLabelSpeasial}}
                                                                shrink={false}>Специализация</InputLabel> : ""}
                                                <Select
                                                    multiple
                                                    value={this.state.specialization_id}
                                                    onChange={this.handleChangeSpecial}
                                                    IconComponent={() => {
                                                        return "";
                                                    }}
                                                    classes={{root: this.state.specialization_id.length === 0 ? classes.muiSeelctRoot : classes.muiSelectRootL}}
                                                    MenuProps={MenuProps}
                                                    input={<OutlinedInput name="speacial"
                                                                          id="outlined-speacial-simple"/>}
                                                    renderValue={selected => {
                                                        let nn = [];
                                                        if (this.state.spetsializatsiya.length !== 0) {
                                                            selected.map(item => {
                                                                nn.push(this.state.spetsializatsiya.find(it => it.id == item).name);
                                                            });
                                                            return nn.join(", ");
                                                        }
                                                        return selected.join(", ");
                                                    }}
                                                >
                                                    {this.state.spetsializatsiya.map(item => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            <ListItemText primary={item.name}/>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                name={"factual_address"}
                                                value={this.state.factual_address}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"Фактические адреса"}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.factual_addressError}
                                                helperText={this.state.factual_addressErrorText}
                                            />

                                        </Grid>
                                    </React.Fragment> : ""}


                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12}>
                                        <div className={classes.inlineText}>
                                            <Typography classes={{root: classes.socSet}}>ссылка на сайт</Typography>
                                            <TextField
                                                name={"site"}
                                                value={this.state.site}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"http://"}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.siteError}
                                                helperText={this.state.siteErrorText}
                                            />
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography classes={{root: classes.socSet}}>Facebook</Typography>
                                            <TextField
                                                name={"facebook"}
                                                onChange={this.handleChangeField}
                                                value={this.state.facebook}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.facebookError}
                                                helperText={this.state.facebookErrorText}
                                            />
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography classes={{root: classes.socSet}}>Telegram</Typography>
                                            <TextField
                                                name={"telegram"}
                                                value={this.state.telegram}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.telegramError}
                                                helperText={this.state.telegramErrorText}
                                            />
                                        </div>
                                        <div className={classes.inlineText}>
                                            <Typography classes={{root: classes.socSet}}>Twitter</Typography>
                                            <TextField
                                                name={"twitter"}
                                                value={this.state.twitter}
                                                onChange={this.handleChangeField}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.twitterError}
                                                helperText={this.state.twitterErrorText}
                                            />
                                        </div>
                                    </Grid>


                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={12} xs={12} sm={12}>
                                        {this.state.userType === 1 ? <React.Fragment>
                                            <TextField
                                                name={"userComments"}
                                                value={this.state.userComments}
                                                onChange={this.handleChangeField}
                                                multiline
                                                fullWidth
                                                rows="4"
                                                variant="outlined"
                                                defaultValue="О себе"
                                                className={classes.textField}
                                                margin="normal"
                                                error={this.state.userCommentsError}
                                                helperText={this.state.userCommentsErrorText}
                                            />
                                        </React.Fragment> : ""}
                                        {this.state.userType === 2 ? <React.Fragment>
                                            <TextField
                                                name={"userComments"}
                                                value={this.state.userComments}
                                                onChange={this.handleChangeField}
                                                multiline
                                                fullWidth
                                                rows="4"
                                                variant="outlined"
                                                defaultValue="О компании"
                                                className={classes.textField}
                                                margin="normal"
                                                error={this.state.userCommentsError}
                                                helperText={this.state.userCommentsErrorText}
                                            />
                                        </React.Fragment> : ""}


                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">
                                    <Grid item md={5} sm={12} xs={12}>
                                        <Button fullWidth variant="contained" color={"secondary"} type={"submit"}>Сохранить
                                            изменения</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </ValidatorForm>
                    </Grid>
                </Grid>


            </div>
        );
    }

}

export default withStyles(styles)(withRouter(ProfileEdit));