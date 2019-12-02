import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import LeftMenu from '../tools/LeftMenu';
import Divider from '@material-ui/core/Divider';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import Clear from '@material-ui/icons/Clear'
import {withRouter} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../tools/MySnackbarContentWrapper";
import setTitle from '../../redux/actions/setTitleAction'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const visiblity = [
    {id: 1, name: 'Виден всем'},
    {id: 2, name: 'Виден только'},
    {id: 3, name: 'Виден только по ссылке'}
];
const deadline = [
    {id: 1, name: '10 мин'},
    {id: 2, name: 'Час'},
    {id: 3, name: 'Неделя'},
    {id: 4, name: 'Месяц'},
];
const comment = [
    {id: 1, name: 'Разрешены'},
    {id: 2, name: 'Запрещены'},
];

const Type = [
    {id: 1, name: 'Опрос с ответами -картинками'},
    {id: 2, name: 'Опрос с фоновой картинкой'},

];



const MenuProps = {
    PaperProps: {
        style: {
            //maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    margin: "dense",
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
    },

};

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
    svgRoot: {
        width: '15px',
        height: '15px'
    }
    ,
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
    inlineTextVariant: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& p': {
            fontWeight: 700,
            paddingRight: 10,
            paddingTop: 10,
            minWidth: '25%',
            textAlign: 'right'
        }
    },
    pHeader: {
        color: '#e35b1e',
        fontWeight: 600,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 5,
        cursor: 'pointer',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    greyP: {
        padding: 5, color: 'grey', fontSize: 13, fontWeight: 400
    },
    blackP: {
        padding: 5,
        color: '#000',
        fontSize: 14
    },
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },
    titleFieldesetHeadKategory: {
        fontWeight: 600,
        fontSize: 13,
    },
    titleFile: {
        fontWeight: 600,
        fontSize: 13,
    },
    muiSeelctRoot: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor,
        lineHeight: 1.2,

    },
    muiSelectRootL: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1.2,
        color: theme.palette.mainBlackColor,
        "&::after": {
            content: "'▾'",
            paddingLeft: 5,
            fontSize: 10
        }
    },
    inLabel: {
        fontSize: 15,
        fontWeight: 600,
        width: '100%',
        left: '-15px',
        color: theme.palette.mainBlackColor,
        "&::after": {
            content: "'▾'",
            paddingLeft: 5,
            fontSize: 10
        }
    },
    formControl: {
        textAlign: 'center'
    },
    input: {
        display: 'none',

    },
    listItemRoot: {
        marginTop: 0,
        marginBottom: 0,
    },
    listItemPrimary: {
        fontFamily: "'Source Sans Pro', sans-serif",
        color: '#2B2A29',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 600,
        lineHeight: 1
    },
    vk_class:{
        "&button":{
            backgroundColor: 'Transparent',
            backgroundRepeat:'no-repeat',
            border: 'none',
            cursor:'pointer',
            overflow: 'hidden',
            outline:'none'
        }
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
    rootSpase: {
        [theme.breakpoints.down('sm')]: {
            margin: "0px !important",
            padding: 0,
            width: "100% !important",
            // '& > .MuiGrid-item': {
            //     padding: 0,
            // },
        },
    },

});


const API_POLL_CREATE = "/profil/create-poll";
const API_CATEGORY = "profil/categories";
const API_SAVE_POLL = "profil/save-poll";
const API_EDIT_POLL = "profil/save-poll-data?id=";

const stateName = [
    'user_id',
    'type',
    'category_id',
    'visibility',
    'term',
    'status',
    'view_comment',
    'hashtags',
    'publications',
    'question',
    'imageFile',
    'variants_image'
]

class PollCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            step: 1,
            category: [],
            categorySelected: [],
            variants: [{variantNomer: 1}, {variantNomer: 2}, {variantNomer: 3}],
            showMoreActions: false,
            openSnakbar: false,

            user_id: null,
            type: null,
            category_id: null,
            visibility: 1,
            term: 4,
            status: null,
            view_comment: 1,
            hashtags: null,
            publications: null,
            question: null,
            imageFile: null,
            variants_image: [{
                id: null,
                variantNomer: null,
                text: null,
                image: null,
                imageUrl: null,
            }],
            hasErrorType: false,
            hasErrorImage: false,
            hasErrorCategory: false,
            imagemain: null

        };
        this.ToCreateForm = React.createRef();
    }

    loadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }
    selectFile = (e) => {
        this.setState({
            imageFile: e.target.files[0],
            hasErrorImage: false,
            imagemain: URL.createObjectURL(e.target.files[0])
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
    handleChangeCategory = (event) => {
        this.setState({category_id: event.target.value, hasErrorCategory: false});

    }

    showMore = () => {
        this.setState({
            showMoreActions: !this.state.showMoreActions ? true : false
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        this.setState({hasErrorQuestion: false});

    }

    changeStep = () => {
        this.setState({
            step: this.state.step === 1 ? 2 : 1
        })
    }
    addVariant = () => {
        if (this.state.variants_image.length === 6) {
            return;
        }
        this.setState({
            variants_image: this.state.variants_image.concat({
                id: null,
                variantNomer: null,
                text: null,
                image: null,
                imageUrl: null,
            })
        })
    }
    variantChange = (indexId) => (e) => {
        e.preventDefault();
        console.log(indexId);
        let variants = this.state.variants_image;
        variants[indexId].text = e.target.value;
        this.setState({
            variants_image: variants
        })
    }
    variantImage = (indexId) => (e) => {
        e.preventDefault();
        let variants = this.state.variants_image;
        variants[indexId].image = e.target.files[0];
        variants[indexId].imageUrl = URL.createObjectURL(e.target.files[0]);
        this.setState({
            variants_image: variants
        })

    }

    delVariant = (IndexID) => (e) => {
        e.preventDefault()
        let variants = this.state.variants_image.filter((item, indexItem) => indexItem !== IndexID);
        this.setState({
            variants_image: variants
        })
    }

    submit = (values, pristineValues) => {
        // get all values and pristineValues on form submission
    }

    componentDidMount() {
        this.getCoategorys();
        this.setState({submitTxt: "Создать опрос"})
        this.props.setTitle("Создать опрос");
        this.setState({submitTxtD: "Создать"})
        if (this.props.match.params.id !== undefined) {
            this.props.setTitle("Редактировать опрос");
            this.setState({submitTxt: "Редактировать опрос"})
            this.setState({submitTxtD: "Сохранить"})
            axios.get("/profil/edit-poll-data?id=" + this.props.match.params.id).then(res => {
                if (res.status === 200) {
                    Object.keys(res.data).map(item => {
                        this.setState({[item]: res.data[item]})
                        return;
                    })
                    // this.setState({category_id:this.state.category_id.map(Number)})
                }
            })

        }
        this.ToCreateForm.current.scrollIntoView({behavior: 'smooth', block: 'start'})


    }


    formSendServerPoll = () => {
        if (this.props.match.params.id !== undefined) {
            this.sendToServer(1, API_EDIT_POLL + this.props.match.params.id);
            return;
        }
        this.sendToServer(1, API_SAVE_POLL);
    }

    formSendServerPollDraft = () => {
        if (this.props.match.params.id !== undefined) {
            this.sendToServer(2, API_EDIT_POLL + this.props.match.params.id);
            return;
        }
        this.sendToServer(2, API_SAVE_POLL);
    }


    sendToServer = (status, url) => {
        const formData = new FormData();
        formData.append('category_id', this.state.category_id);
        formData.append('visibility', this.state.visibility);
        // formData.append('category_id', JSON.stringify(this.state.category_id));
        formData.append('term', this.state.term);
        formData.append('status', this.state.status);
        formData.append('type', this.state.type);
        formData.append('view_comment', this.state.view_comment);
        formData.append('hashtags', this.state.hashtags);
        formData.append('publications', this.state.publications);
        formData.append('question', this.state.question);
        formData.append('imageFile', this.state.imageFile);
        formData.append('status', status);
        formData.append('referal_id', this.props.match.params.referal_id!==undefined ? this.props.match.params.referal_id : null);
        this.state.variants_image.map((item, index) => {
            formData.append('variants_image[' + index + '][id]', item.id)
            formData.append('variants_image[' + index + '][text]', item.text)
            formData.append('variants_image[' + index + '][image]', item.image)
            return;
        })
        // formData.append('variants_image', JSON.stringify(this.state.variants_image));

        // stateName.map(item => {
        //     data[item] = this.state[item]
        // })
        this.loadingBar(true)
        this.openSnakbar('success', "Успешно");

        axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            this.loadingBar(false)
            if (res.status === 202) {
                this.openSnakbarAfterCreate('success', "Успешно")
                return;
                this.props.history.push("/");
            }

        }).catch(err => {
            this.loadingBar(false)
            if (err.response !== undefined) {
                if (err.response.status === 422) {
                    this.catchError(err.response)
                }
            }

        })
    }

    catchError = (response) => {
        let errTextAll = "";
        stateName.map(item => {
            this.setState({
                [item + 'Error']: false,
                [item + 'ErrorText']: null
            });
        })
        if (response !== undefined) {
            let erors = JSON.parse(response.data.message);
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
            this.openSnakbar('error', errTextAll)
        }

    }

    sendToServerValidate = () => {
        let data = {};
        stateName.map(item => {
            data[item] = this.state[item]
        })
        let re_turn = true;

        if (this.state.category_id === null) {
            this.setState({hasErrorCategory: true})
            re_turn=false;
        }

        if (this.state.question === null) {
            this.setState({hasErrorQuestion: true})
            re_turn=false;
        }
        if (this.state.type === null) {
            this.setState({hasErrorType: true})
            re_turn=false;
        }

        if (this.state.type === 2 && this.state.imageFile === null && this.state.mainimage === null) {
            this.setState({hasErrorImage: true})
            re_turn=false;
        }
        if(re_turn===false){
            return;
        }
        this.loadingBar(true)
        axios.post(API_POLL_CREATE, data).then(res => {
            this.loadingBar(false)
            if (res.status === 201) {
                this.changeStep();
            }
        }).catch(err => {
            this.loadingBar(false)
            if (err.response.status === 422) {
                this.catchError(err.response)
            }
        })
    }
    closeSnakbar = () => {
        this.setState({
            openSnakbar: false,
        })
    }

    openSnakbar = (snakbarVariant, snakbarMessage) => {
        this.setState({
            openSnakbar: true,
            snakbarVariant: snakbarVariant,
            snakbarMessage: snakbarMessage,
        })
    }

    openSnakbarAfterCreate = (snakbarVariant, snakbarMessage) => {
        this.setState({
            openSnakbar: true,
            snakbarVariant: snakbarVariant,
            snakbarMessage: snakbarMessage,
        })
        this.props.history.push("/");

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
                    open={this.state.openSnakbar}
                    autoHideDuration={6000}
                    onClose={this.closeSnakbar}
                >
                    <MySnackbarContentWrapper
                        variant={this.state.snakbarVariant}
                        message={this.state.snakbarMessage}
                    />
                </Snackbar>

                {this.state.step === 1 ? <React.Fragment>
                    <Typography classes={{root: classes.titleHead}}>
                        {this.state.submitTxt}
                    </Typography>
                    <Grid container spacing={2} direction={"row"}  classes={{root: classes.rootSpase}}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <Paper ref={this.ToCreateForm} classes={{root: classes.poperContent}}>
                                <ValidatorForm
                                    fullWidth
                                    ref="form"
                                    onSubmit={this.sendToServerValidate}
                                >
                                    <Grid container spacing={3} direction={"row"}>
                                        <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                            <Typography
                                                classes={{root: classes.titleFieldesetHeadKategory}}>Категория</Typography>
                                        </Grid>
                                        <Grid item md={9} sm={9} xs={9}>
                                            <FormControl className={classes.formControl} margin="dense" fullWidth
                                                         variant="outlined">
                                                {this.state.category_id === null ?
                                                    <InputLabel htmlFor="outlined-category"
                                                                classes={{root: classes.inLabel}} shrink={false}>
                                                        Выберите категорию
                                                    </InputLabel> : ""}
                                                <Select
                                                    classes={{root: classes.muiSeelctRoot}}
                                                    classes={{root: this.state.category_id === null ? classes.muiSeelctRoot : classes.muiSelectRootL}}
                                                    value={this.state.category_id}
                                                    onChange={this.handleChangeCategory}
                                                    MenuProps={MenuProps}

                                                    IconComponent={() => {
                                                        return "";
                                                    }}

                                                    input={<OutlinedInput name="category"
                                                                          id="outlined-kategory-select"/>}
                                                    renderValue={selected => {
                                                        // console.log(selected)
                                                        if (this.state.category.length > 0) {
                                                            return this.state.category.find(it => it.id == selected).name
                                                        }
                                                        return "";
                                                    }}
                                                    error={this.state.category_idError}
                                                    helperText={this.state.category_idErrorText}
                                                >
                                                    {this.state.category.map(item => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            <ListItemText classes={{
                                                                root: classes.listItemRoot,
                                                                primary: classes.listItemPrimary
                                                            }} primary={item.name}/>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {this.state.hasErrorCategory &&
                                                <FormHelperText error={true}>Это поле обязательно к
                                                    заполнению</FormHelperText>}
                                            </FormControl>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={3} direction={"row"}>
                                        <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                            <Typography
                                                classes={{root: classes.titleFieldesetHeadKategory}}>Вопрос</Typography>
                                        </Grid>
                                        <Grid item md={9} sm={9} xs={9}>
                                            <TextField

                                                name={"question"}
                                                // validators={['required']}
                                                // errorMessages={['Это поле обязательно к заполнению']}
                                                value={this.state.question}
                                                onChange={this.handleChange}
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                multiline
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                                error={this.state.hasErrorQuestion}
                                                helperText={this.state.hasErrorQuestion ? 'Это поле обязательно к заполнению' : "Введите ваши вопрос, например Какой любимый композиция"}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container spacing={3} direction={"row"}>
                                        <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                            <Typography
                                                classes={{root: classes.titleFieldesetHeadKategory}}>Тип:</Typography>
                                        </Grid>
                                        <Grid item md={9} sm={9} xs={9}>
                                            <FormControl className={classes.formControl} margin="dense" fullWidth
                                                         variant="outlined">
                                                {this.state.type === null ?
                                                    <InputLabel htmlFor="outlined-visibility"
                                                                classes={{root: classes.inLabel}} shrink={false}>
                                                        Выберите
                                                    </InputLabel> : ""}
                                                <Select
                                                    classes={{root: classes.muiSeelctRoot}}
                                                    name={"type"}
                                                    onChange={this.handleChange}
                                                    MenuProps={MenuProps}
                                                    input={<OutlinedInput id="outlined-visibility"/>}
                                                    IconComponent={() => {
                                                        return "";
                                                    }}
                                                    value={this.state.type}
                                                >
                                                    {Type.map(item => (
                                                        <MenuItem key={item.id + "srok"} value={item.id}>
                                                            <ListItemText classes={{
                                                                root: classes.listItemRoot,
                                                                primary: classes.listItemPrimary
                                                            }} primary={item.name}/>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {this.state.hasErrorType &&
                                                <FormHelperText error={true}>Это поле обязательно к
                                                    заполнению</FormHelperText>}
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                    {this.state.type===2 && <Grid container spacing={3} direction={"row"}>
                                        <Grid item md={8} sm={8} xs={8} classes={{root: classes.inlineTextVariant}}>
                                            <Typography classes={{root: classes.titleFile}}>Основное
                                                фото</Typography>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={4}>
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={this.selectFile}
                                            />
                                            <label htmlFor="contained-button-file" style={{width: '100%'}}>
                                                <Button color={"secondary"} variant="contained" component="span"
                                                        className={classes.button} fullWidth>
                                                    <AddAPhoto/>
                                                </Button>
                                            </label>
                                            <div>
                                                {this.state.hasErrorImage &&
                                                <FormHelperText error={true}>Это поле обязательно к
                                                    заполнению</FormHelperText>}
                                                <img style={{width: '100%'}} src={this.state.imagemain}/>
                                            </div>
                                        </Grid>

                                    </Grid>}


                                    <Typography classes={{root: classes.pHeader}} onClick={this.showMore}>Дополнительные
                                        параметры {!this.state.showMoreActions ? "▾" : "▴"}  </Typography>
                                    {this.state.showMoreActions ? <React.Fragment>
                                        <Grid container spacing={3} direction={"row"}>
                                            <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                                <Typography
                                                    classes={{root: classes.titleFieldesetHeadKategory}}>Видимость:</Typography>
                                            </Grid>
                                            <Grid item md={9} sm={9} xs={9}>
                                                <FormControl className={classes.formControl} margin="dense" fullWidth
                                                             variant="outlined">
                                                    {this.state.visibility === null ?
                                                        <InputLabel htmlFor="outlined-visibility"
                                                                    classes={{root: classes.inLabel}} shrink={false}>
                                                            Выберите
                                                        </InputLabel> : ""}
                                                    <Select
                                                        classes={{root: classes.muiSeelctRoot}}
                                                        name={"visibility"}
                                                        onChange={this.handleChange}
                                                        MenuProps={MenuProps}
                                                        input={<OutlinedInput id="outlined-visibility"/>}
                                                        IconComponent={() => {
                                                            return "";
                                                        }}
                                                        value={this.state.visibility}
                                                    >
                                                        {visiblity.map(item => (
                                                            <MenuItem key={item.id + "srok"} value={item.id}>
                                                                <ListItemText classes={{
                                                                    root: classes.listItemRoot,
                                                                    primary: classes.listItemPrimary
                                                                }} primary={item.name}/>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                        </Grid>

                                        <Grid container spacing={3} direction={"row"}>
                                            <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                                <Typography
                                                    classes={{root: classes.titleFieldesetHeadKategory}}>Комментарии:</Typography>
                                            </Grid>
                                            <Grid item md={9} sm={9} xs={9}>
                                                <FormControl className={classes.formControl} margin="dense" fullWidth
                                                             variant="outlined">
                                                    {this.state.view_comment === null ?
                                                        <InputLabel htmlFor="outlined-comments"
                                                                    classes={{root: classes.inLabel}} shrink={false}>
                                                            Выберите
                                                        </InputLabel> : ""}
                                                    <Select
                                                        classes={{root: classes.muiSeelctRoot}}
                                                        name={"view_comment"}
                                                        onChange={this.handleChange}
                                                        MenuProps={MenuProps}
                                                        input={<OutlinedInput id="outlined-comments"/>}
                                                        IconComponent={() => {
                                                            return "";
                                                        }}
                                                        value={this.state.view_comment}
                                                    >
                                                        {comment.map(item => (
                                                            <MenuItem key={item.id + "comment"} value={item.id}>
                                                                <ListItemText classes={{
                                                                    root: classes.listItemRoot,
                                                                    primary: classes.listItemPrimary
                                                                }} primary={item.name}/>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                        </Grid>

                                        <Grid container spacing={3} direction={"row"}>
                                            <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                                <Typography
                                                    classes={{root: classes.titleFieldesetHeadKategory}}>Срок:</Typography>
                                            </Grid>
                                            <Grid item md={9} sm={9} xs={9}>
                                                <FormControl className={classes.formControl} margin="dense" fullWidth
                                                             variant="outlined">
                                                    {this.state.term === null ?
                                                        <InputLabel htmlFor="outlined-term"
                                                                    classes={{root: classes.inLabel}} shrink={false}>
                                                            Выберите
                                                        </InputLabel> : ""}
                                                    <Select
                                                        classes={{root: classes.muiSeelctRoot}}
                                                        name={"term"}
                                                        onChange={this.handleChange}
                                                        MenuProps={MenuProps}
                                                        input={<OutlinedInput id="outlined-term"/>}
                                                        IconComponent={() => {
                                                            return "";
                                                        }}
                                                        value={this.state.term}
                                                    >
                                                        {deadline.map(item => (
                                                            <MenuItem key={item.id + "iddead"} value={item.id}>
                                                                <ListItemText classes={{
                                                                    root: classes.listItemRoot,
                                                                    primary: classes.listItemPrimary
                                                                }} primary={item.name}/>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                        </Grid>

                                        <Grid container spacing={3} direction={"row"}>
                                            <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                                <Typography
                                                    classes={{root: classes.titleFieldesetHeadKategory}}>Хэштэги:</Typography>
                                            </Grid>
                                            <Grid item md={9} sm={9} xs={9}>
                                                <TextField
                                                    margin="dense"
                                                    name={"hashtags"}
                                                    value={this.state.hashtags}
                                                    onChange={this.handleChange}
                                                    id="outlined-name"
                                                    fullWidth
                                                    placeholder={"..."}
                                                    className={classes.textField}
                                                    variant="outlined"
                                                />
                                            </Grid>

                                        </Grid>
                                    </React.Fragment> : ""}


                                    <Grid container spacing={3} direction={"row"} justify="flex-end"
                                          alignItems="flex-end">
                                        <Grid item md={4} sm={12} xs={12}>
                                            <Button fullWidth variant="contained" type={"submit"}
                                                    color={"secondary"}>Далее</Button>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            </Paper>
                            <Typography classes={{root: classes.CopyRight}} gutterBottom>
                                © 2015-{(new Date().getFullYear())} UMNENIE
                            </Typography>
                        </Grid>
                    </Grid></React.Fragment> : <React.Fragment>
                    <Typography classes={{root: classes.titleHead}}>
                        {this.state.submitTxt}
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <Paper classes={{root: classes.poperContent}}>
                                <ValidatorForm
                                    fullWidth
                                    ref="form1"
                                    onSubmit={this.formSendServerPoll}
                                >
                                    {this.state.variants_image.map((item, IndexItem) => {
                                        return (<Grid container spacing={3} direction={"row"}>
                                            <Grid item md={2} sm={2} xs={2} classes={{root: classes.inlineTextVariant}}>
                                                <Typography
                                                    classes={{root: classes.titleFieldesetHeadKategory}}>Вариант</Typography>
                                            </Grid>
                                            <Grid item md={7} sm={7} xs={7}>
                                                <TextValidator
                                                    margin="dense"
                                                    id="outlined-name"
                                                    fullWidth
                                                    multiline
                                                    name={"text"}
                                                    placeholder={"..."}
                                                    value={item.text}
                                                    onChange={this.variantChange(IndexItem)}
                                                    className={classes.textField}
                                                    variant="outlined"
                                                    validators={['required']}
                                                    errorMessages={['Это поле обязательно к заполнению']}
                                                />
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Button color={"secondary"} variant="contained"
                                                        style={{
                                                            marginLeft: '5px',

                                                            marginTop: '0.5rem',

                                                            marginBottom: '.5rem'
                                                        }}
                                                        onClick={this.delVariant(IndexItem)}>
                                                    <Clear/>
                                                </Button>
                                                {this.state.type === 1 &&
                                                <React.Fragment>
                                                    <input
                                                        accept="image/*"
                                                        className={classes.input}
                                                        id={"contained-button-file" + IndexItem}
                                                        onChange={this.variantImage(IndexItem)}
                                                        type="file"
                                                    />
                                                    <label htmlFor={"contained-button-file" + IndexItem}
                                                           style={{marginLeft: 5, marginTop: '.5rem'}}>
                                                        <Button color={"secondary"} variant="contained" component="span"
                                                                className={classes.button}><AddAPhoto/></Button>
                                                    </label>
                                                    <div>
                                                        <img style={{width: '100%'}} src={item.imageUrl}/>
                                                    </div>
                                                </React.Fragment>}

                                            </Grid>

                                        </Grid>);
                                    })}


                                    <Grid container spacing={3} direction={"row"} justify="flex-end"
                                          alignItems="flex-end">

                                        <Grid item md={5}>
                                            <div className={classes.inlineText}>
                                                <Typography classes={{root: classes.greyP}}>До 6 вариантов</Typography>
                                            </div>

                                        </Grid>
                                        <Grid item md={3}>

                                            <Button fullWidth variant="contained" onClick={() => {
                                                this.addVariant()
                                            }} color={"secondary"}>Добавить вариант
                                                +</Button>


                                        </Grid>

                                    </Grid>
                                    <Divider style={{margin: '15px 0px 15px'}}/>


                                    <Grid container spacing={3} direction={"row"}>
                                        <Grid item md={5}>
                                            <Button color="primary" className={classes.button}
                                                    onClick={this.formSendServerPollDraft}>
                                                Сохранить как черновик
                                            </Button>
                                        </Grid>
                                        <Grid item md={3}>
                                            <Button fullWidth variant="outlined" onClick={() => {
                                                this.changeStep()
                                            }} className={classes.button}>
                                                Назад
                                            </Button>
                                        </Grid>

                                        <Grid item md={4}>
                                            <Button fullWidth variant="contained" color={"secondary"}
                                                    type={"submit"}>{this.state.submitTxtD}</Button>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            </Paper>
                            <Typography classes={{root: classes.CopyRight}} gutterBottom>
                                © 2015-{(new Date().getFullYear())} UMNENIE
                            </Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>}
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



export default  connect(mapStateToProps, mapDispatch)(withStyles(styles)(withRouter(PollCreate)));