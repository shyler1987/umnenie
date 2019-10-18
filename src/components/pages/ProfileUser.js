import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import PollCard from '../tools/PollCard'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import ProfileHeadCover from "../tools/ProfileHeadCoverUser";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from "prop-types";
import MySnackbarContentWrapper from "../tools/MySnackbarContentWrapper";
import Snackbar from "@material-ui/core/Snackbar";
import {bindActionCreators} from "redux";
import setTitle from "../../redux/actions/setTitleAction";
import {connect} from "react-redux";

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


const USER_ME = "profil/user-info";
const USER_POLLS = "polls/user-polls";



class ProfileUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            previous: null,
            next: null,
            count: 0,
            hasMore: true,
            activeButton: 0,
            subscribersCount: 0,
            subscriptionCount: 0,
            social_networks: [],
            userBackground: "",
            userComments: "",
            userFIO: "",
            isBlocked: null,
            userId: null,
            userImage: "",
            userRegistryDate: null,
            userType: null,
            title: "Опросы пользователя",
        };
    }

    componentDidMount() {

        this.getUserMe();
        this.fetchDataPollsScroll(USER_POLLS);
    }

    showLoadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }

    fetchDataPollsScroll = (url) => {
        this.setState({
            show: true
        })
        axios.post(url, {
            username: this.props.match.params.username
        }).then(res => {
            if (res.status === 200 && res.data.count > 0) {
                let polls = this.state.polls;
                polls.push(...res.data.result);
                this.setState({
                    polls: polls,
                    next: res.data.next,
                    hasMore: res.data.next !== null ? true : false
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



    getUserMe = () => {
        axios.post(USER_ME, {
            username: this.props.match.params.username
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    subscribersCount: res.data.subscribersCount,
                    subscriptionCount: res.data.subscriptionCount,
                    social_networks: res.data.social_networks,
                    userBackground: res.data.userBackground,
                    userComments: res.data.userComments,
                    userFIO: res.data.userFIO,
                    userId: res.data.userId,
                    isBlocked: res.data.isBlocked,
                    isFollow: res.data.isFollow,
                    userImage: res.data.userImage,
                    userRegistryDate: res.data.userRegistryDate,
                    userType: res.data.userType,
                })
                this.props.setTitle(res.data.userFIO)
            }

        }).catch(err => {
            console.log(err)
        })
    }


    fetchData = ()=>{
        this.fetchDataPollsScroll(this.state.next);
    }

    refresh = ()=>{
        this.fetchDataPollsScroll(USER_POLLS);
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
                    isBlocked={this.state.isBlocked}
                    isFollow={this.state.isFollow}
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
                </Container>

                <Container>
                    <Typography classes={{root: classes.titleHead}}>
                        {this.state.title}
                    </Typography>
                    <InfiniteScroll
                        dataLength={this.state.polls.length}
                        next={this.fetchData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Загрузка...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>Ура! Вы видели все это</b>
                            </p>
                        }
                        // below props only if you need pull down functionality
                        refreshFunction={this.refresh}
                        pullDownToRefresh
                        pullDownToRefreshContent={
                            <h3 style={{textAlign: 'center'}}>&#8595; Потяните вниз, чтобы обновить</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{textAlign: 'center'}}>&#8593; Обновить</h3>
                        }>
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
                                            propsCard={this.props.match.params}
                                            fullName={item.userFIO}
                                            username={item.userName}
                                            contentPoll={item.pollQuestion}
                                            datePoll={item.pollEndDate}
                                            avatarUrl={item.userImage}
                                            pollType={item.pollType}
                                            pollItems={item.items}
                                            disableCard={item.disableCard}
                                            iconFovrite={true}
                                            iconEdit={false}
                                            showLoading={this.showLoadingBar}
                                            disableClickCard={true}
                                            clickOtvet={false}
                                            isVouted={item.isVouted}
                                            userId={item.userId}
                                            like={item.like}
                                            pollLikeCount={item.pollLikeCount}
                                            pollAnswerCount={item.pollAnswerCount}
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
    return {
    };

}



export default  connect(mapStateToProps, mapDispatch)(withStyles(styles)(ProfileUser));