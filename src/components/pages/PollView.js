import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from '../tools/PollCard'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router-dom';

import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../media/style.css';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';

import FloatActionButtun from "../tools/FloatActionButtun";


import {useSwipeable, Swipeable} from 'react-swipeable'
import EditIcon from "./ProfileEdit";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    rootContainer: {
        backgroundColor: '#FAFAFA'
    },
    gridList: {
        // width: 500,
        // height: 450,
    },
    arrowButton: {
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'fixed',
        // paddingRight: 15,
        // paddingLeft: 15
    },
    multlineInput: {
        padding: 10
    },
    noPad: {
        padding: 0
    },
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },
    fixedFormSend: {
        position: 'sticky',
        /* top: 0; */
        bottom: 0,
        left: 0,
    },
    svgRoot: {
        width: '15px',
        height: '15px',
    }, svgRootP: {
        width: '15px',
        height: '15px',
        margin:5
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display:'inherit'
        },
    },
});
const API_POLLS = "polls/item/?id=";


class PollView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: {},
            show: false,
            idPoll: this.props.match.params.id
        };
        this.PollNavigate = this.PollNavigate.bind(this);
        this.fetchPoll = this.fetchPoll.bind(this);
    }

    PollNavigate = (url) => {
        if (url !== null) {
            this.props.history.push("/polls/" + url);

            this.fetchPoll(url);
        }
    }

    fetchPoll = (id) => {
        this.setState({
            show: true
        })
        axios.get(API_POLLS + id).then(res => {
            if (res.status === 200) {
                this.setState({
                    polls: res.data
                })
                this.forceUpdate();
            }
            this.setState({
                show: false
            })

        }).catch(err => {
            this.setState({
                show: false
            })
        })
    }


    componentDidMount() {

        this.fetchPoll(this.state.idPoll);
    }

    nextPollGet = () => {

        this.PollNavigate(this.state.polls.nextPoll);

    }

    prevPollGet = () => {

        this.PollNavigate(this.state.polls.prevPoll);
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
                <div style={{marginTop: 20}}>

                </div>
                {Object.keys(this.state.polls).length !== 0 ?
                    <div>
                        <Grid
                            direction={"row"}
                            container
                            justify={"center"}
                            alignItems={"stretch"}
                            spacing={2}
                        >
                            <Hidden smDown>
                                <Grid item md={1}>
                                    <Link onClick={() => {
                                        this.PollNavigate(this.state.polls.prevPoll)
                                    }}>
                                        <Paper classes={{root: classes.arrowButton}}>
                                            <KeyboardArrowLeft/>
                                        </Paper>
                                    </Link>
                                </Grid>
                            </Hidden>
                            <Grid item md={7} sm={12} xs={12}>

                                <Swipeable onSwipedRight={this.nextPollGet} onSwipedLeft={this.prevPollGet}>

                                    <PollCard

                                        idPoll={this.state.polls.pollId}
                                        imagePoll={this.state.polls.pollImage}
                                        fullName={this.state.polls.userName}
                                        contentPoll={this.state.polls.pollQuestion}
                                        datePoll={this.state.polls.pollEndDate}
                                        avatarUrl={this.state.polls.userImage}
                                        pollType={this.state.polls.pollType}
                                        pollItems={this.state.polls.items}
                                        iconFovrite={true}
                                        iconComment={true}
                                        iconShare={true}
                                        iconAnonced={true}
                                        iconStatis={true}
                                        iconEdit={true}
                                        QrCode={true}
                                        answerText={true}
                                        cellHeight={200}
                                    />
                                </Swipeable>
                            </Grid>
                            <Hidden smDown>
                                <Grid item md={1}>
                                    <Link onClick={() => {
                                        this.PollNavigate(this.state.polls.nextPoll)
                                    }}>
                                        <Paper classes={{root: classes.arrowButton}}>
                                            <KeyboardArrowRight/>
                                        </Paper>
                                    </Link>
                                </Grid>
                            </Hidden>
                        </Grid>


                        <Grid
                            direction={"row"}
                            container
                            justify={"center"}
                            alignItems={"stretch"}
                            spacing={2}
                        >

                            <Grid item md={7} xs={12} sm={12}>
                                <Typography classes={{root: classes.titleHead}}>
                                    Комментарии (658)
                                </Typography>
                                <Paper classes={{root: classes.noPad}}>
                                    <div className="d-flex justify-content-start itemChat">
                                        <div className="img_cont_msg">
                                            <Link to={""}><img
                                                src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                className="rounded-circle user_img_msg"/></Link>
                                        </div>
                                        <div className="msg_cotainer">
                                            Здравствуйте! Я могу Вам чем-то помочь? Если помощь не нужна,
                                            то закройте окно чата. Всегда буду рад ответить Вам.
                                            <div className="msg_time">8:40</div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start itemChat">
                                        <div className="img_cont_msg">
                                            <Link to={""}><img
                                                src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                className="rounded-circle user_img_msg"/></Link>
                                        </div>
                                        <div className="msg_cotainer">
                                            Вы не добавлены в участники раздачи Скинов, так как у вас нет
                                            ссылки на steam трейд. Указать.
                                            <div className="msg_time">8:40</div>
                                        </div>
                                    </div>


                                    <div className="d-flex justify-content-end itemChat">
                                        <div className="msg_cotainer_send">
                                            Здравствуйте
                                            <div className="msg_time_send">8:55</div>
                                        </div>
                                        <div className="img_cont_msg">
                                            <Link to={""}><img
                                                src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                className="rounded-circle user_img_msg"/></Link>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start itemChat">
                                        <div className="img_cont_msg">
                                            <Link to={""}><img
                                                src="http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"
                                                className="rounded-circle user_img_msg"/></Link>
                                        </div>
                                        <div className="msg_cotainer">
                                            Вы не добавлены в участники раздачи Скинов, так как у вас нет
                                            ссылки на steam трейд. Указать.
                                            <div className="msg_time">8:40</div>
                                        </div>
                                    </div>


                                    <br/>
                                    <br/>
                                    <br/>
                                    <Grid
                                        container
                                        justify={"center"}
                                        alignItems={"stretch"}
                                        spacing={2}
                                        classes={{root: classes.fixedFormSend}}
                                    >

                                        <Grid item md={12} xs={12} sm={12}>
                                            <Paper>
                                                <Grid
                                                    direction={"row"}
                                                    container
                                                    spacing={2}
                                                    style={{padding: 10}}
                                                >
                                                    <Grid item md={9} xs={9} sm={9}>
                                                        <TextField
                                                            id="standard-multiline-flexible"
                                                            fullWidth
                                                            multiline
                                                            variant="outlined"
                                                            className={classes.textField}
                                                            InputProps={
                                                                {
                                                                    classes: {
                                                                        root: classes.multlineInput
                                                                    },
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <SvgIcon viewBox="0 0 16 16"
                                                                                     classes={{root: classes.svgRoot}}>
                                                                                <defs>
                                                                                    <clipPath id="clip-path-send">
                                                                                        <rect
                                                                                            id="brooke-cagle-609873-unsplash"
                                                                                            width="16" height="16"/>
                                                                                    </clipPath>
                                                                                </defs>
                                                                                <g id="Mask_Group_28"
                                                                                   data-name="Mask Group 28"
                                                                                   opacity="0.35"
                                                                                   clip-path="url(#clip-path-send)">
                                                                                    <path id="paperclip"
                                                                                          d="M1.016,9.861,2.2,8.678,7.524,3.353a2.51,2.51,0,0,1,3.55,3.55L5.749,12.229a.558.558,0,0,1-.789-.789l5.325-5.326A1.394,1.394,0,0,0,8.313,4.142L2.987,9.467,1.8,10.65A2.511,2.511,0,1,0,5.355,14.2l.986-.986,5.522-5.522.395-.394A3.626,3.626,0,0,0,7.129,2.17L1.213,8.086A.558.558,0,1,1,.424,7.3L6.341,1.381a4.741,4.741,0,0,1,6.705,6.705L7.129,14l-.987.986A3.626,3.626,0,0,1,1.016,9.861Zm0,0"
                                                                                          transform="translate(0.785)"/>
                                                                                </g>
                                                                            </SvgIcon>
                                                                        </InputAdornment>
                                                                    ),
                                                                }
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item md={3} xs={3} sm={3}>
                                                        <Button variant="contained" color="secondary" fullWidth
                                                                className={classes.sectionDesktop}>
                                                            Отправить
                                                        </Button>
                                                        <Button variant="contained" color="secondary" fullWidth
                                                                className={classes.sectionMobile}>
                                                            <SvgIcon viewBox="0 0 16 16"
                                                                     classes={{root: classes.svgRootP}}>
                                                                <defs>
                                                                    <clipPath id="clip-path-sendTg">
                                                                        <rect id="brooke-cagle-609873-unsplash"
                                                                              width="16" height="16"
                                                                              transform="translate(750 1484)"
                                                                              fill="#fff"/>
                                                                    </clipPath>
                                                                </defs>
                                                                <g id="Mask_Group_27" data-name="Mask Group 27"
                                                                   transform="translate(-750 -1484)"
                                                                   clip-path="url(#clip-path-sendTg)">
                                                                    <g id="paper-plane" transform="translate(750 1484)">
                                                                        <path id="Path_1260" data-name="Path 1260"
                                                                              d="M15.863.139a.461.461,0,0,0-.508-.1L.277,6.651A.466.466,0,0,0,0,7.05a.458.458,0,0,0,.232.423l5.257,2.981,3.121,5.311a.464.464,0,0,0,.4.229h.027a.461.461,0,0,0,.4-.276L15.962.647A.455.455,0,0,0,15.863.139Zm-2.4,1.736L5.749,9.541,1.488,7.125ZM8.945,14.518,6.4,10.189l7.761-7.709Z"
                                                                              fill="#fff"/>
                                                                    </g>
                                                                </g>
                                                            </SvgIcon>
                                                        </Button>

                                                    </Grid>


                                                </Grid>
                                            </Paper>
                                        </Grid>

                                    </Grid>


                                </Paper>


                            </Grid>


                        </Grid>
                    </div> : ""}


            </div>
        );
    }

}

export default withStyles(styles)(withRouter(PollView));