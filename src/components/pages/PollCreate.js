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
import LeftMenu from '../tools/LeftMenu';
import Divider from '@material-ui/core/Divider';

import {QRCode} from "react-qr-svg";


import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {FilePond, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddAPhoto from '@material-ui/icons/AddAPhoto'
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);
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
            //maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
        width:'15px',
        height:'15px'
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
    pHeader: {
        color: '#e35b1e',
        fontWeight: 600,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 5,
        cursor:'pointer',
        "&:hover":{
            cursor:'pointer'
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
        fontSize: 15,
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

    },
    muiSelectRootL:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor,
        "&::after":{
            content: "'▾'",
            paddingLeft:5,
            fontSize: 10
        }
    },
    inLabel:{
        fontSize: 15,
        fontWeight: 600,
        width:'100%',
        left: '-15px',
        color: theme.palette.mainBlackColor,
        "&::after":{
            content: "'▾'",
            paddingLeft:5,
            fontSize: 10
        }
    },
        formControl:{
            textAlign:'center'
        },
    input: {
        display: 'none',

    },
    listItemRoot:{
        marginTop:0,
        marginBottom:0,

    },
    listItemPrimary:{
        fontFamily: "'Source Sans Pro', sans-serif",
        color: '#2B2A29',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 600
    }


});


const API_POLLS = "polls/list";


class PollCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            step: 1,
            categorySelected: [],
            visibility:null,
            variants: [{variantNomer: 1}, {variantNomer: 2}, {variantNomer: 3}],
            showMoreActions:false
        };
    }

    handleChangeCategory = (event) => {
        this.setState({categorySelected: event.target.value});

    }

    showMore = () =>{
        this.setState({
            showMoreActions:!this.state.showMoreActions ? true : false
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});

    }

    changeStep = () => {
        this.setState({
            step: this.state.step === 1 ? 2 : 1
        })
    }
    addVariant = () => {

        this.setState({
            variants: this.state.variants.concat({variantNomer: null})
        })
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
                {this.state.step === 1 ? <React.Fragment>
                    <Typography classes={{root: classes.titleHead}}>
                        Создать опрос
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <Paper classes={{root: classes.poperContent}}>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                        <Typography
                                            classes={{root: classes.titleFieldesetHeadKategory}}>Категория</Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={9}>
                                        <FormControl className={classes.formControl} margin="dense" fullWidth
                                                     variant="outlined">
                                            {this.state.categorySelected.length === 0 ?
                                                <InputLabel htmlFor="outlined-category"
                                                            classes={{root: classes.inLabel}} shrink={false}>
                                                    Выберите категорию
                                                </InputLabel> : ""}
                                            <Select
                                                multiple
                                                classes={{root: classes.muiSeelctRoot}}
                                                classes={{root: this.state.categorySelected.length===0 ? classes.muiSeelctRoot : classes.muiSelectRootL}}
                                                value={this.state.categorySelected}
                                                onChange={this.handleChangeCategory}
                                                MenuProps={MenuProps}
                                                IconComponent={()=>{
                                                    return "";
                                                }}
                                                floatingLabelStyle={{ textAlign: 'center', width: '100%', transformOrigin: 'center top 0px' }}
                                                input={<OutlinedInput name="category" id="outlined-kategory-select"/>}
                                                renderValue={selected => {
                                                    return selected.join(', ');
                                                }}
                                                value={this.state.categorySelected}
                                            >
                                                {names.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        <ListItemText classes={{root:classes.listItemRoot, primary:classes.listItemPrimary}} primary={name}/>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                        <Typography
                                            classes={{root: classes.titleFieldesetHeadKategory}}>Вапрос</Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={9}>
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
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={8} sm={8} xs={8} classes={{root: classes.inlineText}}>
                                        <Typography classes={{root: classes.titleFile}}>Основное
                                            фото</Typography>
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="contained-button-file" style={{width: '100%'}}>
                                            <Button color={"secondary"} variant="contained" component="span"
                                                    className={classes.button} fullWidth>
                                                <AddAPhoto/>
                                            </Button>
                                        </label>
                                    </Grid>

                                </Grid>

                                <Typography classes={{root: classes.pHeader}} onClick={this.showMore}>Дополнительные параметры {!this.state.showMoreActions ? "▾" : "▴"}  </Typography>
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
                                                    input={<OutlinedInput  id="outlined-visibility"/>}
                                                    IconComponent={()=>{
                                                        return "";
                                                    }}
                                                    value={this.state.visibility}
                                                >
                                                    {names.map(name => (
                                                        <MenuItem key={name} value={name} >
                                                            <ListItemText classes={{root:classes.listItemRoot, primary:classes.listItemPrimary}} primary={name}/>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={3} direction={"row"}>
                                        <Grid item md={3} sm={12} xs={12} classes={{root: classes.inlineText}}>
                                            <Typography
                                                classes={{root: classes.titleFieldesetHeadKategory}}>Комментарии:</Typography>
                                        </Grid>
                                        <Grid item md={9} sm={12} xs={12}>
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
                                                    input={<OutlinedInput  id="outlined-visibility"/>}
                                                    IconComponent={()=>{
                                                        return "";
                                                    }}
                                                    value={this.state.visibility}
                                                >
                                                    {names.map(name => (
                                                        <MenuItem key={name} value={name} >
                                                            <ListItemText classes={{root:classes.listItemRoot, primary:classes.listItemPrimary}} primary={name}/>
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
                                                    input={<OutlinedInput  id="outlined-visibility"/>}
                                                    IconComponent={()=>{
                                                        return "";
                                                    }}
                                                    value={this.state.visibility}
                                                >
                                                    {names.map(name => (
                                                        <MenuItem key={name} value={name} >
                                                            <ListItemText classes={{root:classes.listItemRoot, primary:classes.listItemPrimary}} primary={name}/>
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
                                                id="outlined-name"
                                                fullWidth
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </Grid>

                                    </Grid>
                                </React.Fragment> : ""}



                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">
                                    <Grid item md={4} sm={12} xs={12}>
                                        <Button fullWidth variant="contained" onClick={() => {
                                            this.changeStep()
                                        }} color={"secondary"}>Далее</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid></React.Fragment> : <React.Fragment>
                    <Typography classes={{root: classes.titleHead}}>
                        Создать опрос
                    </Typography>
                    <Grid container spacing={2} direction={"row"}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LeftMenu/>
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <Paper classes={{root: classes.poperContent}}>
                                {this.state.variants.map(variant => {
                                    return (<Grid container spacing={3} direction={"row"}>
                                        <Grid item md={2} sm={2} xs={2} classes={{root: classes.inlineText}}>
                                            <Typography
                                                classes={{root: classes.titleFieldesetHeadKategory}}>Вариант {variant.variantNomer}</Typography>
                                        </Grid>
                                        <Grid item md={7} sm={7} xs={7}>
                                            <TextField
                                                margin="dense"
                                                id="outlined-name"
                                                fullWidth
                                                multiline
                                                placeholder={"..."}
                                                className={classes.textField}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="contained-button-file"
                                                   style={{width: '100%', marginTop: '.5rem'}}>
                                                <Button color={"secondary"} variant="contained" component="span"
                                                        className={classes.button} fullWidth><AddAPhoto/></Button>
                                            </label>
                                        </Grid>

                                    </Grid>);
                                })}


                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end">

                                    <Grid item md={5}>
                                        <div className={classes.inlineText}>
                                            <Typography classes={{root: classes.greyP}}>До 6 вариантов</Typography>
                                        </div>

                                    </Grid>
                                    <Grid item md={3}>

                                        <Button fullWidth variant="contained" onClick={() => {
                                            this.addVariant()
                                        }} color={"secondary"}>Дабовить варианть
                                            +</Button>


                                    </Grid>

                                </Grid>
                                <Divider style={{margin: '15px 0px 15px'}}/>





                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={5}>
                                        <Button color="primary" className={classes.button}>
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
                                        <Button fullWidth variant="contained" color={"secondary"}>Создать</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </React.Fragment>}
            </div>
        );
    }

}

export default withStyles(styles)(PollCreate);