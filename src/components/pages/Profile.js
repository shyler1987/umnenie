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
import {bindActionCreators} from "redux";
import setTitle from "../../redux/actions/setTitleAction";
import {connect} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

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


const USER_ME = "profil/me";
const MY_POLLS = "profil/my-polls";
const MY_FOVRITES = "profil/my-favorites";
const MY_DRAFTS = "profil/my-drafts";
const MY_REFERAL = "profil/my-referalls";
const MY_BLOCKED = "profil/my-blocked";
const API_DELETE = "profil/delete-poll";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            //infinity scrool
            hasMore: true,
            previous: null,
            next: null,
            //**//
            favorite: false,
            edit: false,
            activeButton: 0,
            subscribersCount: 0,
            subscriptionCount: 0,
            social_networks: [],
            userBackground: "",
            userComments: "",
            userFIO: "",
            userName: "",
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
                this.setState({
                    favorite: false,
                    edit: false,
                    polls: [],
                    hasMore: true,
                    previous: null,
                    next: null,
                })
                this.fetchDataPollsScroll(MY_POLLS);
                break;
            case 1 :
                this.setState({
                    favorite: true,
                    edit: false,
                    polls: [],
                    hasMore: true,
                    previous: null,
                    next: null,
                })
                this.fetchDataPollsScroll(MY_FOVRITES);
                break;
            case 2 :
                this.setState({
                    favorite: false,
                    edit: true,
                    polls: [],
                    hasMore: true,
                    previous: null,
                    next: null,
                })
                this.fetchDataPollsScroll(MY_DRAFTS);
                break;
            case 3 :
                this.setState({
                    favorite: false,
                    edit: false,
                    polls: [],
                    hasMore: true,
                    previous: null,
                    next: null,
                })
                this.fetchDataPollsScroll(MY_REFERAL);
                break;
            case 4 :
                this.setState({
                    favorite: false,
                    edit: false,
                    polls: [],
                    hasMore: true,
                    previous: null,
                    next: null,
                })
                this.fetchDataPollsScroll(MY_BLOCKED);
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

    deleteClick = (idPoll) => (e) => {
        e.preventDefault();

        this.showLoadingBar(true);
        axios.post(API_DELETE, {poll_id: idPoll}).then(res => {
            if (res.status === 210) {
                // this.setState({
                //     polls:res.data.polls,
                //     next:res.data.next,
                //     hasMore:res.data.next!==null? true : false
                // })
                let polls = this.state.polls.filter(item => item.pollId !== idPoll);
                this.setState({
                    polls: polls
                });
            }
            this.showLoadingBar(false);
        }).catch(err => {
            this.showLoadingBar(false);
        })
    }

    componentDidMount() {

        this.getUserMe();
        this.fetchDataPollsScroll(MY_POLLS);
    }

    getByUrl = (url) => {
        this.showLoadingBar(true)
        axios.get(url).then(res => {
            if (res.status === 200 && res.data.count > 0) {
                this.setState({
                    polls: res.data.result
                })
            } else {
                this.setState({polls: []})
            }
            this.showLoadingBar(false)
        }).catch(err => {
            this.showLoadingBar(false)
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
                    userName: res.data.userName,
                    userImage: res.data.userImage,
                    userRegistryDate: res.data.userRegistryDate,
                    userType: res.data.userType,
                })
                this.props.setTitle(res.data.userFIO);

            }

        }).catch(err => {
            console.log(err)
        })
    }

    fetchData = () => {
        this.fetchDataPollsScroll(this.state.next);
    }

    fetchDataPollsScroll = (url) => {
        this.setState({
            show: true
        })
        axios.get(url).then(res => {
            if (res.status === 200 && res.data.count > 0) {
                let polls = this.state.polls;
                polls.push(...res.data.result);
                this.setState({
                    polls: polls,
                    next: res.data.next,
                    hasMore: res.data.next !== null ? true : false,
                    show: false
                })
                return;
            }

                this.setState({
                    show: false,
                    hasMore: false
                })

        }).catch(err => {
            this.setState({
                show: false,
                hasMore: false
            })
        })
    }

    liked = (status, id) => {
        if (this.state.favorite) {
            let polls = this.state.polls.filter(x => x.pollId !== id);
            this.setState({
                polls: polls
            })
        }
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
                    userFIO={this.state.userName}
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
                                    <Button onClick={() => {
                                        this.setActive(4)
                                    }} classes={{root: classes[this.getClass(4)]}}>Заблокированные</Button>
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
                                    <Button onClick={() => {
                                        this.setActive(4)
                                    }} classes={{root: classes[this.getClass(4)]}}>Заблокированные</Button>

                                </ButtonGroup>
                            </React.Fragment>}

                        </Grid>
                    </Grid>
                </Container>

                <Container>
                    <Typography classes={{root: classes.titleHead}}>
                        {this.state.title}
                    </Typography>
                    {this.state.polls.length === 0 && !this.state.show && <h2>У вас нет опросов</h2>}
                    <InfiniteScroll
                        dataLength={this.state.polls.length}
                        next={this.fetchData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Загрузка...</h4>}
                        // endMessage={
                        //     <p style={{textAlign: 'center'}}>
                        //         <b>Ура! Вы видели все это</b>
                        //     </p>
                        // }
                        // below props only if you need pull down functionality
                        // refreshFunction={this.refresh}
                        // pullDownToRefresh
                        // pullDownToRefreshContent={
                        //     <h3 style={{textAlign: 'center'}}>&#8595; Потяните вниз, чтобы обновить</h3>
                        // }
                        // releaseToRefreshContent={
                        //     <h3 style={{textAlign: 'center'}}>&#8593; Обновить</h3>
                        // }
                    >
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
                                            userId={item.userId}
                                            idPoll={item.pollId}
                                            imagePoll={item.pollImage}
                                            fullName={item.userFIO}
                                            isCurrent={true}
                                            username={item.userName}
                                            contentPoll={item.pollQuestion}
                                            datePoll={item.pollEndDate}
                                            avatarUrl={item.userImage}
                                            pollType={item.pollType}
                                            pollItems={item.items}
                                            iconEdit={this.state.edit}
                                            iconFovrite={true}
                                            CrownSvg={item.pollCrown}
                                            like={item.like}
                                            pollLikeCount={item.pollLikeCount}
                                            pollAnswerCount={item.pollAnswerCount}
                                            isVouted={item.isVouted}
                                            clickOtvet={false}
                                            disableCard={item.disableCard}
                                            showLoading={this.showLoadingBar}
                                            favorite={this.state.favorite}
                                            liked={this.liked}
                                            disableClickCard={true}
                                            isDelete={item.isDelete}
                                            deleteItem={this.deleteClick}
                                        />
                                    );
                                })}
                            </Masonry>
                        </ResponsiveMasonry>
                    </InfiniteScroll>
                </Container>

            </div>
        );
    }

}

function mapDispatch(dispatch) {
    return bindActionCreators({setTitle}, dispatch);
}

function mapStateToProps(state) {
    return {};

}


export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Profile));