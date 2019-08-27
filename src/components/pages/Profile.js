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
    titleHead:{
        fontWeight: 600,
        fontSize:30,
        margin: '25px 5px 10px 0px'
    },
    textAbout:{
        fontSize:18,
        fontWeight:400
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


class ProfileFollower extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            activeButton:0
        };
    }
    setActive = (index) => {
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
    componentDidMount() {
        this.setState({
            show: true
        })
        axios.get(API_POLLS).then(res => {
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
            console.log(err);
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <ProfileHeadCover profilePhoto={true}/>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Container>

                    <Typography classes={{root:classes.titleHead}} >
                        О себе
                    </Typography>
                    <Grid container spacing={0} >
                        <Grid md={12} item>
                            <Typography classes={{root:classes.textAbout}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} style={{marginTop: 20}}>
                        <Grid md={12} xs={12} sm={12}>
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
                                }} classes={{root: classes[this.getClass(3)]}}>Черновики</Button>
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
                                        iconFovrite={true}
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