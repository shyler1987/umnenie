import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles, lighten} from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
import PieChart from 'react-minimal-pie-chart';
import LinearProgress from '@material-ui/core/LinearProgress';
import FloatActionButtun from "../tools/FloatActionButtun";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: '#fff',
        transform: 'rotate(180deg)'

    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#ff6c5c',
        //transform: "translateX(50%) !important"
    },
    determinate: {
        //transform: 'translateX(50%)'
    }
})(LinearProgress);


const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
        titleHead: {
            fontWeight: 600,
            fontSize: 30,
            margin: '25px 5px 10px 0px'
        }
    },
}))(InputBase);

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
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
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        //minHeight:500
    },
    paperStatisBox: {
        padding: "0px 10px 0px",
        color: theme.palette.text.secondary,
        //minHeight:500
    },
    paperStatisBoxCounter: {
        display: 'flex',
        padding: "0px 10px 0px",
        height: 95,
        color: theme.palette.text.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        cursor: "pointer",
        "&:hover": {
            border: 1,
            borderColor: theme.palette.YellowColor,

            borderStyle: "solid",
            "& p": {
                color: theme.palette.YellowColor,
            },
            "& svg": {
                fill: theme.palette.YellowColor,
            }
        }
        //minHeight:500
    },
    typoCount: {
        fontSize: 15,
        fontWeight: 400,
        color: theme.palette.mainBlackColor
    },
    imgCount: {
        margin: 3
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
    },
    ButtonGroup: {
        background: '#fff',
    },
    buttonGroupActive: {
        background: '#e35b1e',
        color: '#fff',
        border: '1px solid #e35b1e',
        '&:hover': {
            background: 'rgba(227, 91, 30, 0.08)',
            color: '#e35b1e',
        }
    },
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },
    inlineText: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& p': {
            fontWeight: 700,
            minWidth: '25%',
            textAlign: 'right'
        }
    },
    titleFieldesetHead: {
        fontWeight: 600,
        fontSize: 15,
    },
    ststisLineCount: {
        display: 'flex',
        position: 'relative'
    },
    lineBarColor1: {
        backgroundColor: '#3c5aff'
    },
    lineBarColor2: {
        backgroundColor: '#6ec549'
    },
    lineBarColor3: {
        backgroundColor: '#e05022'
    },
    lineBarColor4: {
        backgroundColor: '#ef7f1a'
    },
    lineBarColor5: {
        backgroundColor: '#e0da22'
    },
    lineBarColor6: {
        backgroundColor: '#2b9ce8'
    },
    rootLineText: {
        fontWeight: 600,
        fontSize: 15,
    },
    lineStatisP: {
        fontWeight: 600,
        fontSize: 15,
        padding: '10px 0px 10px',
        color: theme.palette.mainBlackColor,
        "& span": {
            display: 'inline-block',
            float: 'right',
            fontWeight: 600,
            fontSize: 12,
        }
    },
    lineSize: {
        padding: '6px 0px 6px 0px'
    },

    svgRoot: {
        width: 20,
        fill: theme.palette.mainBlackColor,
    },
    progressBarPoper: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    likesContioner: {
        display: 'inline-block', textAlign: 'center'
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


});

const API_STATIS = "polls/statistic?id=";
const API_POLL_ITEM = "polls/poll-item-names?id=";


class StatisPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selected: [],
            items:[],
            youthList: [],
            cityList: [],
            proffStatus: [],
            gender: [],
            likeCount: 0,
            totalAnswerCount: 0,
            chatCount: 0,
            shareCount: 0,
            qrCount: 0,
        }

    }

    getAllStatis = () => {
        axios.get(API_STATIS + this.props.match.params.id).then(res => {
            if (res.status === 200) {
                Object.keys(res.data).map(item => {
                    this.setState({[item]: res.data[item]})
                })
            }
        }).catch(err => {

        })
    }

    getAllStatisItemName = () => {
        axios.get(API_POLL_ITEM + this.props.match.params.id).then(res => {
            if (res.status === 200) {

                    this.setState({items: res.data})

            }
        }).catch(err => {

        })
    }
    getAllStatisItem = (item_id) => {
        axios.get(API_STATIS + this.props.match.params.id + "&item="+item_id).then(res => {
            if (res.status === 200) {
                Object.keys(res.data).map(item => {
                    this.setState({[item]: res.data[item]})
                })
            }
        }).catch(err => {

        })
    }

    componentDidMount() {
        this.getAllStatisItemName();
        this.getAllStatis();
    }


    handleChange = (event) => {
        this.setState({selected: event.target.value});
         this.getAllStatisItem(event.target.value);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <FloatActionButtun/>

                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Typography classes={{root: classes.titleHead}}>Статистика</Typography>
                <Grid container spacing={1} direction={"row"}>
                    <Grid item md={3} sm={3} xs={3} classes={{root: classes.inlineText}}>
                        <Typography classes={{root: classes.titleFieldesetHead}}>Варианты ответов:</Typography>
                    </Grid>
                    <Grid item md={9} sm={9} xs={9}>
                        <FormControl className={classes.formControl} fullWidth variant="outlined">
                            <Select
                                placeholder={"Выберите категорию"}
                                value={this.state.selected}
                                onChange={this.handleChange}
                                MenuProps={MenuProps}
                                input={<BootstrapInput name="age" id="age-customized-select"/>}
                                // input={<Input id="select-multiple" />}

                            >
                                {this.state.items.map(item => (
                                    <MenuItem key={item.item_id+"_dd"} value={item.item_id}>
                                        <ListItemText
                                            classes={{
                                                root: classes.listItemRoot,
                                                primary: classes.listItemPrimary
                                            }}
                                            primary={item.itemTitle}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>

                <br/>
                <Grid container spacing={0}>
                    <Grid md={12} sm={12} xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3} direction={"row"}>
                                <Grid md={2} sm={12} xs={12}>
                                    <Grid container justify="center"
                                          alignItems="center">
                                        <Grid sm={5} xs={5} md={9}>
                                            <div style={{padding: '8px 8px 8px'}}>
                                                <PieChart
                                                    data={this.state.youthList.map(item => {
                                                        return {title: item.youth, value: item.protsent, color: item.color};
                                                    })
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid md={10} sm={12} xs={12}>
                                    <div style={{padding: 10}}>
                                        {this.state.youthList.map((item, indexx) => {
                                            return (
                                                <div>
                                                    <Typography classes={{root: classes.lineStatisP}}>{item.youth} <span
                                                        style={{color: item.color}}>{item.value}</span></Typography>
                                                    {indexx!== (this.state.youthList.length-1) && <Divider/>}

                                                </div>
                                            );
                                        })}

                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={3} direction={"row"}>
                    <Grid md={4} item sm={12} xs={12}>
                        <Grid container spacing={1} alignItems="center" direction={"row"}>
                            <Grid md={3} sm={3} xs={3} item>
                                <Paper classes={{root: classes.paperStatisBoxCounter}}>
                                    <div className={classes.likesContioner}>
                                        <SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRoot}}>
                                            <path id="Path_1236" data-name="Path 1236"
                                                  d="M12.979,1.914a3.526,3.526,0,0,0-5.63.405A5.368,5.368,0,0,0,7,2.884a5.363,5.363,0,0,0-.348-.565,3.526,3.526,0,0,0-5.63-.405A4.244,4.244,0,0,0,0,4.733a5.2,5.2,0,0,0,1.431,3.41,31.865,31.865,0,0,0,3.582,3.347c.542.462,1.1.939,1.7,1.461l.018.016a.41.41,0,0,0,.54,0l.018-.016c.6-.522,1.157-1,1.7-1.461a31.861,31.861,0,0,0,3.582-3.347A5.2,5.2,0,0,0,14,4.733,4.244,4.244,0,0,0,12.979,1.914ZM8.454,10.865c-.467.4-.948.808-1.454,1.248-.507-.441-.987-.85-1.455-1.248C2.7,8.44.82,6.839.82,4.733a3.425,3.425,0,0,1,.817-2.276A2.738,2.738,0,0,1,3.719,1.52,2.765,2.765,0,0,1,5.982,2.794,4.863,4.863,0,0,1,6.61,4.042a.41.41,0,0,0,.78,0,4.863,4.863,0,0,1,.628-1.249,2.707,2.707,0,0,1,4.345-.337,3.425,3.425,0,0,1,.817,2.276C13.18,6.839,11.3,8.44,8.454,10.865Z"
                                                  transform="translate(0 -0.699)"></path>
                                        </SvgIcon>
                                        <Typography
                                            classes={{root: classes.typoCount}}>{this.state.likeCount}</Typography>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid md={3} sm={3} xs={3} item>
                                <Paper classes={{root: classes.paperStatisBoxCounter}}>
                                    <div className={classes.likesContioner}>
                                        <SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRoot}}>
                                            <defs>
                                                <clipPath id="clip-path2">
                                                    <rect id="Rectangle_76" data-name="Rectangle 76" width="14"
                                                          height="14" transform="translate(234 1407)" fill="#c22"/>
                                                </clipPath>
                                            </defs>
                                            <g id="Mask_Group_23" data-name="Mask Group 23"
                                               transform="translate(-234 -1407)" clip-path2="url(#clip-path2)">
                                                <g id="qr-code_4_" data-name="qr-code (4)"
                                                   transform="translate(234 1407)">
                                                    <g id="Group_1558" data-name="Group 1558">
                                                        <g id="Group_1557" data-name="Group 1557">
                                                            <path id="Path_1247" data-name="Path 1247"
                                                                  d="M5.879,0H.41A.41.41,0,0,0,0,.41V5.879a.41.41,0,0,0,.41.41H5.879a.41.41,0,0,0,.41-.41V.41A.41.41,0,0,0,5.879,0Zm-.41,5.469H.82V.82H5.469Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1560" data-name="Group 1560">
                                                        <g id="Group_1559" data-name="Group 1559">
                                                            <path id="Path_1248" data-name="Path 1248"
                                                                  d="M3.965,1.914H2.324a.41.41,0,0,0-.41.41V3.965a.41.41,0,0,0,.41.41H3.965a.41.41,0,0,0,.41-.41V2.324A.41.41,0,0,0,3.965,1.914Zm-.41,1.641h-.82v-.82h.82Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1562" data-name="Group 1562">
                                                        <g id="Group_1561" data-name="Group 1561">
                                                            <path id="Path_1249" data-name="Path 1249"
                                                                  d="M13.59,0H8.121a.41.41,0,0,0-.41.41V5.879a.41.41,0,0,0,.41.41H13.59a.41.41,0,0,0,.41-.41V.41A.41.41,0,0,0,13.59,0Zm-.41,5.469H8.531V.82H13.18Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1564" data-name="Group 1564">
                                                        <g id="Group_1563" data-name="Group 1563">
                                                            <path id="Path_1250" data-name="Path 1250"
                                                                  d="M11.676,1.914H10.035a.41.41,0,0,0-.41.41V3.965a.41.41,0,0,0,.41.41h1.641a.41.41,0,0,0,.41-.41V2.324A.41.41,0,0,0,11.676,1.914Zm-.41,1.641h-.82v-.82h.82Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1566" data-name="Group 1566">
                                                        <g id="Group_1565" data-name="Group 1565">
                                                            <path id="Path_1251" data-name="Path 1251"
                                                                  d="M5.879,7.711H.41a.41.41,0,0,0-.41.41V13.59A.41.41,0,0,0,.41,14H5.879a.41.41,0,0,0,.41-.41V8.121A.41.41,0,0,0,5.879,7.711Zm-.41,5.469H.82V8.531H5.469Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1568" data-name="Group 1568">
                                                        <g id="Group_1567" data-name="Group 1567">
                                                            <path id="Path_1252" data-name="Path 1252"
                                                                  d="M3.965,9.625H2.324a.41.41,0,0,0-.41.41v1.641a.41.41,0,0,0,.41.41H3.965a.41.41,0,0,0,.41-.41V10.035A.41.41,0,0,0,3.965,9.625Zm-.41,1.641h-.82v-.82h.82Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1570" data-name="Group 1570">
                                                        <g id="Group_1569" data-name="Group 1569">
                                                            <path id="Path_1253" data-name="Path 1253"
                                                                  d="M13.59,11.556H11.266V10.035a.41.41,0,0,0-.82,0v1.931a.41.41,0,0,0,.41.41H13.18v.8H10.855a.41.41,0,0,0,0,.82H13.59a.41.41,0,0,0,.41-.41V11.967A.41.41,0,0,0,13.59,11.556Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1572" data-name="Group 1572">
                                                        <g id="Group_1571" data-name="Group 1571">
                                                            <path id="Path_1254" data-name="Path 1254"
                                                                  d="M13.59,7.711a.41.41,0,0,0-.41.41v1.914a.41.41,0,0,0,.82,0V8.121A.41.41,0,0,0,13.59,7.711Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1574" data-name="Group 1574">
                                                        <g id="Group_1573" data-name="Group 1573">
                                                            <path id="Path_1255" data-name="Path 1255"
                                                                  d="M10.035,7.711H8.121a.41.41,0,0,0-.41.41v1.914a.41.41,0,0,0,.82,0v-1.5h1.5a.41.41,0,0,0,0-.82Z"/>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1576" data-name="Group 1576">
                                                        <g id="Group_1575" data-name="Group 1575">
                                                            <path id="Path_1256" data-name="Path 1256"
                                                                  d="M8.121,11.556a.41.41,0,0,0-.41.41V13.59a.41.41,0,0,0,.82,0V11.967A.41.41,0,0,0,8.121,11.556Z"/>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </SvgIcon>
                                        <Typography
                                            classes={{root: classes.typoCount}}>{this.state.qrCount}</Typography>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid md={3} sm={3} xs={3} item>
                                <Paper classes={{root: classes.paperStatisBoxCounter}}>
                                    <div className={classes.likesContioner}>
                                        <SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRoot}}>
                                            <defs>
                                                <clipPath id="clip-path1">
                                                    <rect id="Rectangle_48" data-name="Rectangle 48" width="14"
                                                          height="14" transform="translate(224 1409)" fill="#fff"
                                                          stroke="#707070" stroke-width="1"/>
                                                </clipPath>
                                            </defs>
                                            <g id="Mask_Group_3" data-name="Mask Group 3"
                                               transform="translate(-224 -1409)" clip-path1="url(#clip-path1)">
                                                <g id="upload" transform="translate(224 1409.513)">
                                                    <g id="Group_1046" data-name="Group 1046"
                                                       transform="translate(0 0)">
                                                        <path id="Path_1220" data-name="Path 1220"
                                                              d="M13.6,5.87a.4.4,0,0,0-.4.4V9.919a1.8,1.8,0,0,1-1.8,1.8H2.6a1.8,1.8,0,0,1-1.8-1.8V6.211a.4.4,0,0,0-.8,0V9.919a2.6,2.6,0,0,0,2.6,2.6h8.8a2.6,2.6,0,0,0,2.6-2.6V6.271A.4.4,0,0,0,13.6,5.87Z"
                                                              transform="translate(0 0.456)"/>
                                                        <path id="Path_1221" data-name="Path 1221"
                                                              d="M4.154,3.675,6.02,1.809V9.947a.4.4,0,0,0,.8,0V1.809L8.688,3.675a.4.4,0,0,0,.282.119.387.387,0,0,0,.282-.119.4.4,0,0,0,0-.567L6.7.558A.406.406,0,0,0,6.421.439a.388.388,0,0,0-.282.119L3.59,3.107a.4.4,0,0,0,.565.567Z"
                                                              transform="translate(0.579 -0.439)"/>
                                                    </g>
                                                </g>
                                            </g>

                                        </SvgIcon>
                                        <Typography
                                            classes={{root: classes.typoCount}}>{this.state.shareCount}</Typography>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid md={3} sm={3} xs={3} item>
                                <Paper classes={{root: classes.paperStatisBoxCounter}}>
                                    <div className={classes.likesContioner}>
                                        <SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRoot}}>
                                            <defs>
                                                <clipPath id="clip-path">
                                                    <rect id="Rectangle_73" data-name="Rectangle 73" width="14"
                                                          height="14" transform="translate(190 1409)" fill="none"/>
                                                </clipPath>
                                            </defs>
                                            <g id="Mask_Group_19" data-name="Mask Group 19"
                                               transform="translate(-190 -1409)" clip-path="url(#clip-path)">
                                                <g id="chat" transform="translate(190.003 1409)">
                                                    <g id="Group_1530" data-name="Group 1530" transform="translate(0)">
                                                        <path id="Path_1233" data-name="Path 1233"
                                                              d="M11.947,2.052A7,7,0,0,0,1.588,11.438a2.626,2.626,0,0,1-1.1,1.275.653.653,0,0,0,.188,1.231,3.33,3.33,0,0,0,.5.038h0a4.526,4.526,0,0,0,2.515-.815A7,7,0,0,0,11.947,2.052Zm-.56,9.336a6.21,6.21,0,0,1-7.531.964.394.394,0,0,0-.443.026,3.769,3.769,0,0,1-2.2.806,3.983,3.983,0,0,0,1.2-1.656.4.4,0,0,0-.067-.422,6.207,6.207,0,1,1,9.037.281Z"
                                                              transform="translate(-0.003)"/>
                                                    </g>
                                                </g>
                                            </g>

                                        </SvgIcon>
                                        <Typography
                                            classes={{root: classes.typoCount}}>{this.state.chatCount}</Typography>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid md={4} sm={12} xs={12} item>
                        <Paper className={classes.paperStatisBox}>
                            <Grid container direction={"row"}>
                                <Grid md={3} sm={3} xs={3} item>
                                    <div style={{padding: '8px 8px 8px'}}>
                                        <PieChart
                                            data={this.state.proffStatus.map(item => {
                                                return {title: item.profiTitle, value: item.protsent, color: item.color};
                                            })
                                            }
                                        />
                                    </div>
                                </Grid>
                                <Grid md={9} sm={9} xs={9} item>
                                    {this.state.proffStatus.map((item, indexx) => {
                                        return (
                                          <div>
                                            <Typography classes={{root: classes.lineStatisP}}>{item.profiTitle} <span
                                                style={{color: item.color}}>{item.protsent}%</span></Typography>
                                                {indexx!== (this.state.proffStatus.length-1) && <Divider/>}
                                            </div>
                                        );
                                    })
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid md={4} sm={12} xs={12} item>
                        <Paper className={classes.paperStatisBox}>
                            <Grid container direction={"row"}>
                                <Grid md={3} sm={3} xs={3} item>
                                    <div style={{padding: '8px 8px 8px'}}>
                                        <PieChart
                                            data={this.state.gender.map(item => {
                                                return {title: item.genderTitle, value: item.protsent, color: item.color};
                                            })
                                            }
                                        />
                                    </div>
                                </Grid>
                                <Grid md={9} sm={9} xs={9} item>
                                    {this.state.gender.map((item, indexx) => {
                                        return (<div>
                                                <Typography classes={{root: classes.lineStatisP}}>{item.genderTitle} <span
                                                    style={{color: item.color}}>{item.protsent}%</span></Typography>
                                                {indexx!== (this.state.gender.length-1) && <Divider/>}
                                            </div>
                                            );
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                <br/>

                <Grid container spacing={1} direction={"row"}>

                    <Grid item md={12} sm={12} xs={12}>
                        <Paper className={classes.progressBarPoper}>
                            <Table className={classes.table}>
                                <TableBody>
                                    {this.state.cityList.map(item => {
                                        return (<TableRow key={1}>
                                            <TableCell component="th" style={{width: '25%'}}>
                                                <Typography
                                                    classes={{root: classes.rootLineText}}> {item.cityname}</Typography>
                                            </TableCell>
                                            <TableCell component="th" classes={{root: classes.lineSize}}>
                                                <BorderLinearProgress
                                                    className={classes.margin}
                                                    classes={{barColorPrimary: {backgroundColor: item.color}}}
                                                    variant="determinate"
                                                    value={10}
                                                />
                                            </TableCell>
                                            <TableCell component="th" style={{width: '5%'}}>
                                                <Typography
                                                    classes={{root: classes.rootLineText}}> {item.count}</Typography>
                                            </TableCell>
                                        </TableRow>);
                                    })}

                                </TableBody>
                            </Table>


                        </Paper>
                        <br/>
                        <br/>
                    </Grid>

                </Grid>

            </div>
        );
    }

}

export default withStyles(styles)(StatisPage);