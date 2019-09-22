import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import PollCard from '../tools/PollCard'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import ProfileHeadCover from "../tools/ProfileHeadCover";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from "prop-types";

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


    ListButton: {
        textTransform: 'none'
    },
    ListButtonInActive: {
        textTransform: 'none',
        color: "#000"
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
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },
    textAbout: {
        fontSize: 18,
        fontWeight: 400
    },
    buttonGroupActive: {
        background: theme.palette.YellowColor,
        color: "#ffffff",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: theme.palette.YellowColor,
            color: "#ffffff",
        },
        [theme.breakpoints.down('md')
            ]:
            {
                border: 0,
                margin: '0px  !important',
                "&:not(:last-child)": {
                    borderBottom: 0
                },
                "&:first-child": {
                    borderTopRightRadius: '4px !important',
                    borderBottomRightRadius: '0px !important',
                    borderBottomLeftRadius: '0px !important',
                    borderTopLeftRadius: '4px !important',
                },
                "&:last-child": {
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '4px !important',
                    borderBottomLeftRadius: '4px !important',
                    borderTopLeftRadius: '0px',
                }
            }
    },
    buttonGroup: {
        backgroundColor: "rgb(255, 255, 255)",
        "&:not(:first-child)": {
            marginLeft: 0
        },
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "rgb(193, 193, 193)",
            color: "#ffffff",
        },
        '&:active': {
            backgroundColor: "rgb(193, 193, 193)",
            color: "#ffffff",
        },
        '&:focus': {
            backgroundColor: "rgb(193, 193, 193)",
            color: "#ffffff",
        },
        [theme.breakpoints.down('md')
            ]:
            {
                flexDirection: 'column',
                alignItems: 'flex-center',
                justifyContent: 'center',
                backgroundColor: "rgb(255, 255, 255)",
                borderLeftColor: '#E6E6E6 !important',
                borderColor: '#E6E6E6 !important',
                // "&:not(:first-child)": {
                //     borderBottom:0
                // },
                "&:not(:last-child)": {
                    borderBottom: 0
                },
                "&:first-child": {
                    borderTopRightRadius: '4px !important',
                    borderBottomRightRadius: '0px !important',
                    borderBottomLeftRadius: '0px !important',
                    borderTopLeftRadius: '4px !important',
                },
                "&:last-child": {
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '4px !important',
                    borderBottomLeftRadius: '4px !important',
                    borderTopLeftRadius: '0px',
                }

            }
    },


});


const API_POLLS = "polls/list";

const USER_ME = "profil/me";
const MY_POLLS = "profil/my-polls";
const MY_FOVRITES = "profil/my-favorites";
const MY_DRAFTS = "profil/my-drafts";
const MY_REFERAL = "profil/my-referalls";


class ProfileFollower extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            activeButton: 0,
            subscribersCount: 0,
            subscriptionCount: 0,
            social_networks: [],
            userBackground: "",
            userComments: "",
            userFIO: "",
            userId: null,
            userImage: "",
            userRegistryDate: null,
            userType: null,
            title: "Опросы пользователя",
        };
    }

    setActive = (index) => {
        switch (index) {
            case 0 :
                this.getByUrl(MY_POLLS);
                break;
            case 1 :
                this.getByUrl(MY_FOVRITES);
                break;
            case 2 :
                this.getByUrl(MY_DRAFTS);
                break;
            case 3 :
                this.getByUrl(MY_REFERAL);
                break;

        }
        this.setState({
            activeButton: index
        })
    }

    getClass = (index) => {

        let activeButton = this.state.activeButton;
        if (index === activeButton)
            return 'buttonGroupActive'
        return 'buttonGroup'
    }

    showLoadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }

    componentDidMount() {

        this.getUserMe();
        this.getByUrl(MY_POLLS);
    }

    getByUrl = (url) => {
        this.showLoadingBar(true)
        axios.get(url).then(res => {
            if (res.status === 200 && res.data.count > 0) {
                this.setState({
                    polls: res.data.result
                })
            }else{
                this.setState({polls:[]})
            }
            this.showLoadingBar(false)
        }).catch(err => {
            this.showLoadingBar(false)
            console.log(err);
        })
    }

    getUserMe = () => {
        axios.get(USER_ME).then(res => {
            if (res.status === 200) {
                this.setState({
                    subscribersCount: res.data.subscribersCount,
                    subscriptionCount: res.data.subscriptionCount,
                    social_networks: res.data.social_networks,
                    userBackground: res.data.userBackground,
                    userComments: res.data.userComments,
                    userFIO: res.data.userFIO,
                    userId: res.data.userId,
                    userImage: res.data.userImage,
                    userRegistryDate: res.data.userRegistryDate,
                    userType: res.data.userType,
                })
            }

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {
            classes,
        } = this.props;
        return (
            <div>
                <ProfileHeadCover
                    profilePhoto={true}
                    subscribersCount={this.state.subscribersCount}
                    subscriptionCount={this.state.subscriptionCount}
                    social_networks={this.state.social_networks}
                    userBackground={this.state.userBackground}
                    userFIO={this.state.userFIO}
                    userId={this.state.userId}
                    userImage={this.state.userImage}
                    userRegistryDate={this.state.userRegistryDate}
                    userType={this.state.userType}
                    showLoadingBar={this.showLoadingBar}
                />
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Container>

                    <Typography classes={{root: classes.titleHead}}>
                        О себе
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid md={12} item>
                            <Typography classes={{root: classes.textAbout}}>{this.state.userComments}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} style={{marginTop: 20}}>
                        <Grid md={12} xs={12} sm={12}>
                            {this.state.userType === 1 ? <React.Fragment>
                                <ButtonGroup fullWidth aria-label="full width outlined button group"
                                             classes={{root: classes.buttonGroup}}>
                                    <Button onClick={() => {
                                        this.setActive(0)
                                    }} classes={{root: classes[this.getClass(0)]}}>Мои опросы</Button>
                                    <Button onClick={() => {
                                        this.setActive(1)
                                    }} classes={{root: classes[this.getClass(1)]}}>Избранное</Button>

                                    <Button onClick={() => {
                                        this.setActive(2)
                                    }} classes={{root: classes[this.getClass(2)]}}>Черновики</Button>
                                </ButtonGroup>
                            </React.Fragment> : <React.Fragment>
                                <ButtonGroup fullWidth aria-label="full width outlined button group"
                                             classes={{root: classes.buttonGroup}}>
                                    <Button onClick={() => {
                                        this.setActive(0)
                                    }} classes={{root: classes[this.getClass(0)]}}>Мои опросы</Button>
                                    <Button onClick={() => {
                                        this.setActive(1)
                                    }} classes={{root: classes[this.getClass(1)]}}>Избранное</Button>
                                    <Button onClick={() => {
                                        this.setActive(3)
                                    }} classes={{root: classes[this.getClass(3)]}}>Реферальный</Button>
                                    <Button onClick={() => {
                                        this.setActive(2)
                                    }} classes={{root: classes[this.getClass(2)]}}>Черновики</Button>
                                </ButtonGroup>
                            </React.Fragment>}

                        </Grid>
                    </Grid>
                </Container>

                <Container>
                    <Typography classes={{root: classes.titleHead}}>
                        {this.state.title}
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
                                        iconFovrite={true}
                                        showLoading={this.showLoadingBar}
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

export default withStyles(styles)(ProfileFollower);