import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import FloatActionButtun from "../tools/FloatActionButtun";

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
    textField: {

    },
    inputHeight:{
        height:100
    },
    textP:{
        fontSize: 14,
        textAlign: 'justify',
        paddingTop: 10
    },
    callCenter:{
        textAlign: 'right',
    },
    copyright:{
        textAlign: 'left',
    },
    titleHead:{
        fontWeight: 600,
        fontSize:30,
        margin: '25px 5px 10px 0px'
    },
    TextP:{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize:18,
        fontWeight: 400,
        color:theme.palette.mainBlackColor,
        textAlign: 'justify'
    },
    textPFoot:{
        fontSize: 15,
        textAlign: 'center !important',
        padding: '10px 10px 10px',
        fontWeight: 600,
        color:"#2b2a29"
    },


});

const API_POLLS = "polls/list";


class License extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show:false,
            title:"",
            con:"",
        }
    }

    componentDidMount() {
        this.setState({
            show:true
        })
        axios.get("polls/privacy").then(res=>{
            this.setState({
                title:res.data.title,
                con:res.data.text
            })
            this.setState({
                show:false
            })
        }).catch(err=>{
            this.setState({
                show:false
            })
        })
    }


    render() {
        const {classes} = this.props;
        return (
            <div style={{margin: '0px 20px 20px 15px'}}>
                <FloatActionButtun/>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Typography classes={{root:classes.titleHead}} >
                    {this.state.title}
                </Typography>
                <Grid container spacing={0}>

                    <Typography className={classes.TextP}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.con }} />
                    </Typography>


                </Grid>
                <Typography classes={{root:classes.textPFoot}}>© 2015-2019 UMNENIE </Typography>


            </div>
        );
    }

}

export default withStyles(styles)(License);