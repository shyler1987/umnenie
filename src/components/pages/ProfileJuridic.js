import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';

import CoverImage from '../../media/back.jpg';
import PollCard from '../tools/PollCard'
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import ProfileHeadCover from "../tools/ProfileHeadCover";


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
        margin: '15px 0px 10px',
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
    bigAvatar: {
        margin: 5,
        width: 180,
        height: 180,
        border: '3px solid #fff',
    },
    cover: {
        position: 'absolute',
        bottom: -30,
        zIndex: 1000
    },
    timelineCover: {
        background: `url(${CoverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: 300,
        borderRadius: '0 0 4px 4px',
        position: 'relative',
    },
    timelineSocial: {
        background: "#fff",
        position: 'relative',
    },
    button: {
        margin: '15px 5px 15px'
    },
    ListButton: {
        textTransform: 'none'
    },
    ListButtonInActive: {
        textTransform: 'none',
        color:"#000"
    },

    buttonFollow: {
        color: "#ffffff",
        fontWeight: 600,
        borderColor: '#E6E6E6',
        margin: '0px 5px 0px 5px'
    },
    '&:hover': {
        borderColor: '#E6E6E6',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#E6E6E6',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
        color: 'outline: 5px auto #fff'
    },
    about:{
        fontSize:18,
        color:theme.palette.mainBlackColor
    },
    titleHead:{
        fontWeight: 600,
        fontSize:30,
        margin: '25px 5px 10px 0px'
    },
    buttonGroupActive:{
        background:theme.palette.YellowColor,
        color:"#ffffff",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#322c25",
            color:"#ffffff",
        }
    },
    buttonGroup:{
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "rgba(43, 42, 41, 0.5)",
            color:"#ffffff",
        },
        '&:active': {
            backgroundColor: "rgba(43, 42, 41, 0.5)",
            color:"#ffffff",
        },
        '&:focus': {
            backgroundColor: "rgba(43, 42, 41, 0.5)",
            color:"#ffffff",
        },
    }




});


const API_POLLS = "polls/list";


class ProfileJuridic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls:[],
            show:false,
            activeButton:0
        };
    }
    componentDidMount() {
        this.setState({
            show:true
        })
        axios.get(API_POLLS).then(res => {
            if(res.status===200 && res.data.count>0){

                this.setState({
                    polls:res.data.result

                })
            }
            this.setState({
                show:false
            })

        }).catch(err => {
            this.setState({
                show:false
            })
            console.log(err);
        })
    }
    setActive = (index) =>{
        console.log("sss")
        this.setState({
            activeButton:index
        })
    }

     getClass = (index) =>{
         let activeButton = this.state.activeButton;
         if(index===activeButton)
            return 'buttonGroupActive'
         return 'buttonGroup'
    }

    render() {
        const {classes} = this.props;



        return (
            <div>
                <ProfileHeadCover/>

                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Container>
                    <Typography classes={{root:classes.titleHead}} >
                        О себе
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid md={12}>
                            <Typography classes={{root:classes.about}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>

                        </Grid>
                    </Grid>

                    <Grid container spacing={0} style={{marginTop:20}}>
                        <Grid md={12}>
                            <ButtonGroup fullWidth aria-label="full width outlined button group" classes={{root:classes.ButtonGroup}}>
                                <Button onClick={()=>{this.setActive(0)}} classes={{root:classes[this.getClass(0)]}}>Мои опросы</Button>
                                <Button onClick={()=>{this.setActive(1)}}  classes={{root:classes[this.getClass(1)]}}>Избранное</Button>
                                <Button onClick={()=>{this.setActive(2)}}  classes={{root:classes[this.getClass(2)]}}>Реферальный</Button>
                                <Button onClick={()=>{this.setActive(3)}}  classes={{root:classes[this.getClass(3)]}}>Черновики</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                </Container>

                <Container>
                    <Typography classes={{root:classes.titleHead}} >
                        Опросы пользователя
                    </Typography>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                    >
                        <Masonry
                            columnsCount={3}
                            gutter={"10px"}
                        >
                            {this.state.polls.map((item, key) => {
                                return (
                                    <PollCard
                                        key={key}
                                        idPoll={item.pollId}
                                        imagePoll={item.pollImage}
                                        fullName={item.userName}
                                        contentPoll={item.pollQuestion}
                                        datePoll={item.pollEndDate}
                                        avatarUrl={item.userImage}
                                        pollType={item.pollType}
                                        pollItems={item.items}
                                    />
                                );
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </Container>

            </div>
        );
    }

}

export default withStyles(styles)(ProfileJuridic);