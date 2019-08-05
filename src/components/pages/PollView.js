import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from '../tools/PollCard'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';

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
// import ReactSwipeEvents from 'react-swipe-events'
import FloatActionButtun from "../tools/FloatActionButtun";


import { useSwipeable, Swipeable } from 'react-swipeable'

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
    fixedFormSend:{
        position: 'fixed',
        /* top: 0; */
        bottom: 0,
        left: 0,
    }
});

const dataInit = {
    userId: 1,
    userName: "Исидатэ Тайти",
    userImage: "http://umnenie.foundrising.uz/uploads/user/foto/1.jpg",
    pollId: 4,
    pollUrl: "http://umnenie.foundrising.uz/api/polls/poll?pollId=4",
    pollType: 1,
    pollTypeText: "Вид с выбором фоновой картинки",
    pollCategory: "kategoriya2",
    pollVisibility: "Виден только по ссылке",
    pollTerm: "Неделя",
    pollViewComment: "Разрешены",
    pollHashtags: "fone image",
    pollPublications: "",
    pollEndDate: "15.11.19",
    pollQuestion: `dribbble A hand-made music player?!
@kellianderson making us at the Hang
Time stage `,
    pollImage: null,
    items: [{
        id: 13,
        option: "Опросы за деньги",
        percent: 0,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/1.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 14,
        option: "Опросы за деньги",
        percent: 0,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/3556468-Beautiful-big-white-clouds-in-front-of-blue-sky-background-Stock-Photo.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 15,
        option: "Опросы за деньги",
        percent: 0,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/background2056509340 — копия.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 16,
        option: "Опросы за деньги",
        percent: 100,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/Teaching-Awards-Background.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 17,
        option: "Опросы за деньги",
        percent: 50,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/Sun-Rays-Blue-Sky-Clouds-Beauty.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 18,
        option: "Опросы за деньги",
        percent: 100,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/software_update.png",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }]
};

const API_POLLS = "polls/poll/";


class PollView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            idPoll: this.props.match.params.id
        };
    }


    componentDidMount() {
        this.setState({
            show: true
        })
        axios.get(API_POLLS + this.state.idPoll).then(res => {
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
        })
    }

    nextPollGet = () => {
        alert('Next Poll')
    }

    prevPollGet = (q) => {
        alert('Prev Poll')
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

                <Grid
                    direction={"row"}
                    container
                    justify={"center"}
                    alignItems={"stretch"}
                    spacing={2}
                >
                    <Hidden smDown>
                        <Grid item md={1}>
                            <Link to={""}>
                                <Paper classes={{root: classes.arrowButton}}>


                                    <KeyboardArrowLeft/>


                                </Paper>
                            </Link>
                        </Grid>
                    </Hidden>
                    <Grid item md={7} sm={12} xs={12}>

                        <Swipeable onSwipedRight={this.nextPollGet} onSwipedLeft={this.prevPollGet}>

                            <PollCard

                                idPoll={dataInit.pollId}
                                imagePoll={dataInit.pollImage}
                                fullName={dataInit.userName}
                                contentPoll={dataInit.pollQuestion}
                                datePoll={dataInit.pollEndDate}
                                avatarUrl={dataInit.userImage}
                                pollType={dataInit.pollType}
                                pollItems={dataInit.items}
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
                            <Link to={""}>
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
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
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
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
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
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                        className="rounded-circle user_img_msg"/></Link>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start itemChat">
                                <div className="img_cont_msg">
                                    <Link to={""}><img
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
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
                            <div>

                            </div>


                        </Paper>


                    </Grid>
                    <Grid
                        container
                        justify={"center"}
                        alignItems={"stretch"}
                        spacing={2}
                        classes={{root:classes.fixedFormSend}}
                    >

                        <Grid item md={5} xs={12} sm={12}>
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
                                                    }
                                                }
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={3} sm={3}>
                                        <Button variant="contained" color="secondary" fullWidth
                                                className={classes.button}>
                                            Отправить
                                        </Button>
                                    </Grid>


                                </Grid>
                            </Paper>
                        </Grid>

                    </Grid>

                </Grid>



            </div>
        );
    }

}

export default withStyles(styles)(withRouter(PollView));