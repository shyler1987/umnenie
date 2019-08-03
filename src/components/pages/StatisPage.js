import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import Divider from '@material-ui/core/Divider';

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
        padding: "0px 10px 0px",
        height:85,
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
    }


});

const API_POLLS = "polls/list";


class StatisPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selected: []
        }
    }

    handleChange = (event) => {
        this.setState({selected: event.target.value});

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Typography classes={{root: classes.titleHead}}>Статистика (357)</Typography>
                <Grid container spacing={1} direction={"row"}>
                    <Grid item md={3} classes={{root: classes.inlineText}}>
                        <Typography classes={{root: classes.titleFieldesetHead}}>Варианты ответов:</Typography>
                    </Grid>
                    <Grid item md={9}>
                        <FormControl className={classes.formControl} fullWidth variant="outlined">
                            <Select
                                placeholder={"Выберите категорию"}
                                multiple
                                value={this.state.selected}
                                onChange={this.handleChange}
                                MenuProps={MenuProps}
                                input={<BootstrapInput name="age" id="age-customized-select"/>}
                                // input={<Input id="select-multiple" />}
                                renderValue={selected => {
                                    if (selected.length === 0) {
                                        return <em>Placeholder</em>;
                                    }

                                    return selected.join(', ');
                                }}
                                value={this.state.selected}


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

                <br/>
                <Grid container spacing={0}>
                    <Grid md={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3} direction={"row"}>
                                <Grid md={3}>
                                    diagramma
                                </Grid>
                                <Grid md={9}>
                                    <div style={{padding: 10}}>
                                        <Typography classes={{root: classes.lineStatisP}}>25-34 <span
                                            style={{color: "#3E4DD5"}}>37347</span></Typography>
                                        <Divider/>
                                        <Typography classes={{root: classes.lineStatisP}}>18-24 <span
                                            style={{color: "#81BB29"}}>33333</span></Typography>
                                        <Divider/>
                                        <Typography classes={{root: classes.lineStatisP}}>45-54 <span
                                            style={{color: "#E05022"}}>347347</span></Typography>
                                        <Divider/>
                                        <Typography classes={{root: classes.lineStatisP}}>Младше 18<span
                                            style={{color: "#EF7F1A"}}>347743</span></Typography>

                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={3} direction={"row"}>
                    <Grid md={4} item>
                        <Grid container spacing={1}  alignItems="center" direction={"row"}>
                            <Grid md={3} item>
                                <Paper >
                                    ss
                                </Paper>
                            </Grid>
                            <Grid md={3} item>
                                <Paper classes={{root:classes.paperStatisBoxCounter}}>
                                    ss
                                </Paper>
                            </Grid>
                            <Grid md={3} item>
                                <Paper>
                                    ss
                                </Paper>
                            </Grid>
                            <Grid md={3} item>
                                <Paper>
                                    ss
                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid md={4} item>
                        <Paper className={classes.paperStatisBox}>
                            <Grid container direction={"row"}>
                                <Grid md={4} item>
                                    diagr
                                </Grid>
                                <Grid md={8} item>
                                    <Typography classes={{root: classes.lineStatisP}}>Специалист <span
                                        style={{color: "#EE7F1A"}}>37%</span></Typography>
                                    <Divider/>
                                    <Typography classes={{root: classes.lineStatisP}}>Не специалист <span
                                        style={{color: "#EE7F1A"}}>63%</span></Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid md={4} item>
                        <Paper className={classes.paperStatisBox}>
                            <Grid container direction={"row"}>
                                <Grid md={4} item>
                                    diagr
                                </Grid>
                                <Grid md={8} item>
                                    <Typography classes={{root: classes.lineStatisP}}>Мужчина <span
                                        style={{color: "#EE7F1A"}}>37%</span></Typography>
                                    <Divider/>
                                    <Typography classes={{root: classes.lineStatisP}}>Женщина <span
                                        style={{color: "#EE7F1A"}}>63%</span></Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }

}

export default withStyles(styles)(StatisPage);