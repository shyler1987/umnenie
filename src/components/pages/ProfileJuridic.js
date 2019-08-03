import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Container from 'react-bootstrap/Container'
import CoverImage from '../../media/back.jpg';
import selenaAvatar from '../../media/selenaAvatar.jpg';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import PollCard from '../tools/PollCard'
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ProfileHeadCover from "../tools/ProfileHeadCover";
import ProfileHeadLine from "../tools/ProfileHeadLine";

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
        borderColor: '#ffffff',
        margin: '0px 5px 0px 5px'
    },
    '&:hover': {
        borderColor: '#ffffff',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#ffffff',
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
    }




});


const API_POLLS = "polls/list";


class ProfileJuridic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls:[],
            show:false
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

    render() {
        const {classes} = this.props;
        return (
            <div>


                <ProfileHeadCover/>
                <ProfileHeadLine/>

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
                                <Button classes={{root:classes.buttonGroupActive}}>Мои опросы</Button>
                                <Button  color="secondary" >Избранное</Button>
                                <Button>Реферальный</Button>
                                <Button>Черновики</Button>
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