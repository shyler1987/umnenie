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

    ButtonGroup:{
        background: '#fff',
    },
    buttonGroupActive:{
        background: '#e35b1e',
        color: '#fff',
        border: '1px solid #e35b1e',
        '&:hover':{
            background:'rgba(227, 91, 30, 0.08)',
            color: '#e35b1e',
        }
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
                <div className={classes.timelineCover}>
                    <Container>
                        <Grid
                            direction={"row"}
                            container
                            alignItems="flex-end"
                        >
                            <Grid item md={6}>

                                <div className={classes.cover}>

                                    <Avatar alt="Remy Sharp" src={selenaAvatar} className={classes.bigAvatar}/>
                                    <div style={{
                                        bottom: 55,
                                        left: 210,
                                        width: '100%',
                                        position: "absolute"
                                    }}>
                                        <Typography variant="caption" display="block" style={{
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}>
                                            22.06.19
                                        </Typography>
                                        <Typography variant="h5" fontWeight="fontWeightBold" component="h5" style={{
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}>
                                            Исидатэ Тайти Тайти
                                        </Typography>
                                    </div>


                                </div>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item md={6} style={{textAlign: "right"}} xsDown>

                                    <div style={{

                                        top: 210,
                                        // width: '100%',
                                        position: "relative"
                                    }}>
                                        <Button variant="outlined" className={classes.button}
                                                classes={{root: classes.buttonFollow}} color="secondary1" size="large">
                                            Подписчиков <span style={{marginLeft: 20, color: '#e35b1e'}}>255</span>
                                        </Button>
                                        <Button variant="outlined" className={classes.button}
                                                classes={{root: classes.buttonFollow}} color="secondary1" size="large">
                                            Подписки <span style={{marginLeft: 20, color: '#e35b1e'}}>255</span>
                                        </Button>


                                    </div>
                                </Grid>
                            </Hidden>

                        </Grid>
                    </Container>
                </div>

                <div className={classes.timelineSocial}>
                    <Container>
                        <Grid
                            direction={"row"}
                            container
                            alignItems="flex-end"
                        >
                            <Grid item md={6}>

                            </Grid>
                            <Grid item md={6} style={{textAlign: 'right'}}>

                                <Button variant="contained" size="meduim" color="secondary" className={classes.button}>
                                    Заблокировать
                                </Button>
                                <Button variant="contained" size="meduim" color="secondary" className={classes.button}>
                                    Написать
                                </Button>
                                <Button variant="contained" size="meduim" color="secondary" className={classes.button}>
                                    Подписаться
                                </Button>

                            </Grid>

                        </Grid>
                    </Container>
                </div>

                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Container>
                    <Typography variant="h4" fontWeight="fontWeightBold" component="h4" style={{
                        fontWeight: 700,
                        margin: '25px 5px 10px 0px'
                    }}>
                        О себе
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid md={12}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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
                    <Typography variant="h4" fontWeight="fontWeightBold" component="h4" style={{
                        fontWeight: 700,
                        margin: '25px 5px 10px 0px'
                    }}>
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