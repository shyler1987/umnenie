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
        marginBottom: 5
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
        color: theme.palette.mainBlackColor

    },
    inLabel: {
        left: '30%',
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.mainBlackColor
    },
    input: {
        display: 'none',
    },

});


const API_POLLS = "polls/list";


class PollCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            step: 2,
            categorySelected: [],
            variants: [{variantNomer: 1}, {variantNomer: 2}, {variantNomer: 3}]
        };
    }

    handleChangeCategory = (event) => {
        this.setState({categorySelected: event.target.value});

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
                                                value={this.state.categorySelected}
                                                onChange={this.handleChangeCategory}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput name="category" id="outlined-kategory-select"/>}
                                                renderValue={selected => {
                                                    return selected.join(', ');
                                                }}
                                                value={this.state.categorySelected}
                                            >
                                                {names.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        <ListItemText primary={name}/>
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
                                        <Typography classes={{root: classes.titleFile}}>Вы можете загрузить основное
                                            фото к вопросу или добавить фото к вариантам ответов</Typography>
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
                                                Загрузить основное изображение
                                            </Button>
                                        </label>
                                    </Grid>

                                </Grid>

                                <Typography classes={{root: classes.pHeader}}>Дополнительные параметры</Typography>

                                <Grid container spacing={3} direction={"row"}>
                                    <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                                        <Typography
                                            classes={{root: classes.titleFieldesetHeadKategory}}>Видимость:</Typography>
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
                                                value={this.state.categorySelected}
                                                onChange={this.handleChangeCategory}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput name="category" id="outlined-kategory-select"/>}
                                                renderValue={selected => {
                                                    return selected.join(', ');
                                                }}
                                                value={this.state.categorySelected}
                                            >
                                                {names.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        <ListItemText primary={name}/>
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
                                            {this.state.categorySelected.length === 0 ?
                                                <InputLabel htmlFor="outlined-category"
                                                            classes={{root: classes.inLabel}} shrink={false}>
                                                    Выберите категорию
                                                </InputLabel> : ""}
                                            <Select
                                                multiple
                                                classes={{root: classes.muiSeelctRoot}}
                                                value={this.state.categorySelected}
                                                onChange={this.handleChangeCategory}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput name="category" id="outlined-kategory-select"/>}
                                                renderValue={selected => {
                                                    return selected.join(', ');
                                                }}
                                                value={this.state.categorySelected}
                                            >
                                                {names.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        <ListItemText primary={name}/>
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
                                            {this.state.categorySelected.length === 0 ?
                                                <InputLabel htmlFor="outlined-category"
                                                            classes={{root: classes.inLabel}} shrink={false}>
                                                    Выберите категорию
                                                </InputLabel> : ""}
                                            <Select
                                                multiple
                                                classes={{root: classes.muiSeelctRoot}}
                                                value={this.state.categorySelected}
                                                onChange={this.handleChangeCategory}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput name="category" id="outlined-kategory-select"/>}
                                                renderValue={selected => {
                                                    return selected.join(', ');
                                                }}
                                                value={this.state.categorySelected}
                                            >
                                                {names.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        <ListItemText primary={name}/>
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
                                                        className={classes.button} fullWidth>Загрузить
                                                    изображение</Button>
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


                                <Grid container spacing={3} direction={"row"} justify="flex-end" alignItems="flex-end"
                                      style={{paddingBottom: 10}}>
                                    <Grid item md={10}>
                                        <TextField
                                            margin="dense"
                                            id="outlined-name"
                                            fullWidth
                                            multiline
                                            placeholder={"..."}
                                            className={classes.textField}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <a className={classes.editP}>
                                                            <SvgIcon viewBox="0 0 12 12" width={10} height={10}
                                                                     classes={{root: classes.svgRoot}}>
                                                                <defs>
                                                                    <clipPath id="clip-path-link">
                                                                        <rect id="Rectangle_81" data-name="Rectangle 81"
                                                                              width="12" height="12"
                                                                              transform="translate(914 1486)"
                                                                              fill="#fff" stroke="#707070"
                                                                              stroke-width="1"/>
                                                                    </clipPath>
                                                                </defs>
                                                                <g id="Mask_Group_24" data-name="Mask Group 24"
                                                                   transform="translate(-914 -1486)"
                                                                   clip-path="url(#clip-path-link)">
                                                                    <g id="link-symbol" transform="translate(914 1486)">
                                                                        <path id="Path_1257" data-name="Path 1257"
                                                                              d="M11.067,5.437,8.815,7.689a3.147,3.147,0,0,1-4.987-.642L4.874,6a.751.751,0,0,1,.17-.113,1.567,1.567,0,0,0,.393.676,1.594,1.594,0,0,0,2.252,0L9.941,4.311A1.593,1.593,0,0,0,7.689,2.059l-.8.8a4,4,0,0,0-2.032-.221L6.563.933a3.185,3.185,0,0,1,4.5,4.5ZM5.112,9.14l-.8.8A1.593,1.593,0,1,1,2.059,7.689L4.311,5.437a1.593,1.593,0,0,1,2.252,0,1.576,1.576,0,0,1,.393.675A.765.765,0,0,0,7.126,6L8.172,4.954a3.13,3.13,0,0,0-.484-.643,3.185,3.185,0,0,0-4.5,0L.933,6.563a3.185,3.185,0,0,0,4.5,4.5L7.144,9.361A3.993,3.993,0,0,1,5.112,9.14Z"
                                                                              fill="#2b2a29"/>
                                                                    </g>
                                                                </g>
                                                            </SvgIcon>
                                                        </a>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="outlined"
                                        />
                                        <Button fullWidth variant="contained" color={"secondary"}>Создать код (ctrl +
                                            enter)</Button>
                                    </Grid>
                                    <Grid item md={2}>
                                        <QRCode
                                            bgColor="#FFFFFF"
                                            fgColor="#000000"
                                            level="Q"
                                            style={{width: '65%', margin: '0px 10px 0px'}}
                                            value="some text"
                                        />
                                    </Grid>

                                </Grid>


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