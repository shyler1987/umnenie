import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

import Grid from '@material-ui/core/Grid';
import FovriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FovriteIcon from '@material-ui/icons/Favorite';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import '../../media/style.css';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import {QRCode} from "react-qr-svg";
import {QRCode} from 'react-qrcode-logo';
import check from '../../media/icons/check.svg'
import checkInLine from '../../media/icons/checkinline.svg'

import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import {Link, NavLink, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import setIsAuth from '../../redux/actions/setIsAuth'
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";

const styles = theme => ({
        avatars: {
            display: 'inline-flex',
            // paddingLeft: '50px'
        },
        avatarsContainer: {
            justifyContent: 'flex-end'
        },
        avatar: {
            marginLeft: '-15px',
            position: 'relative',
            border: '2px solid #fff',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '30px',
            height: '30px',
            '& img': {
                width: '30px',
                height: '30px'
            },
        },
        avatarMore: {
            marginLeft: '-15px',
            position: 'relative',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            '& img': {
                width: '30px',
                height: '30px'
            },
        },
        svgRoot: {
            width: '30px',
            height: '30px'
        },
        svgRootIcon: {
            width: '14px',
            height: '14px'
        },
        svgRootIconCrown: {
            width: '14px',
            height: '14px',
            margin:5
        },
        fovriteRed: {
            color: '#ec4956'
        },
        titleBar: {
            background: 'linear-gradient(to bottom, rgba(33, 32, 32, 0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0, 0, 0, 0) 80%)'
            //background:'transparent'
        },
        GridListTileRoot: {
            height: 'auto',
            '&:hover': {
                "& .imgTile": {
                    opacity: '.2',
                    cursor: 'pointer',
                    [theme.breakpoints.down('md')]: {
                        opacity: 'unset',
                    }

                },
                "& grid": {
                    background: 'transparent'
                },
                "& .MuiGridListTileBar-root": {
                    // background: 'transparent',
                },
            },
            '&:hover $tint': {
                background: '#e67043',
            },
            [theme.breakpoints.down('md')]: {
                '&:hover $tint': {
                    background: 'transparent'
                },
            }
        },

        Gridtile: {
            cursor: 'pointer',
            // backgroundColor: '#000 !important',
            '&:hover': {
                backgroundColor: '#000 !important',

            },
        },

        GridListTileRootDisabled: {
            height: 'auto',
        },
        GridtileDisabled: {

        },
        cardBar: {
            left: 0,
            right: 0,
            bottom: 0,
            height: 48,
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            background: 'linear-gradient(to top, rgba(33, 32, 32, 0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0, 0, 0, 0) 80%)',
            // background:'transparent'
        },
        pollBottomCircle: {
            padding: '0px 10px 0px'
        },
        CircularProgressbar: {
            width: '30px !important'
        },
        textRight: {
            textAlign: 'right'
        },
        procentP: {
            marginBottom: '0em',
            margin: '5px 5px 0px 5px',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600
        },
        percentPcontainer: {
            justifyContent: 'center',
            /* align-items: center; */
            display: 'flex'
        },
        tint: {
            overflow: 'hidden',
            margin: '0 20px 0px 0',
            background: '#000',
            width: '100%',
            height: 'inherit'
        },
        cardTileImg: {
            width: '100%',
            height: 'inherit',
            objectFit: 'contain'

        },
        clickCard: {
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        grey: {
            color: '#8f8f8f'
        },
        rootItem: {
            paddingLeft: 10,
            paddingRight: 10,
            '&:hover': {
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 9,
                paddingRight: 9,
                border: "1px solid #E6E6E6",
                borderRadius: 5,
                cursor: 'pointer',
                "& dot": {
                    borderRadius: '50%',
                    width: 5,
                    height: 5,
                    background: "#e67043",
                    right: 9,
                    top: 19,
                    position: 'absolute',
                }
            }
        },
        dot: {
            borderRadius: '50%',
            width: 5,
            height: 5,
            background: "#e67043",
            right: 10,
            top: 20,
            position: 'absolute',
            opacity: 0.7

        },
        imgIcons: {
            margin: 10,

        },
        imgIconsP: {
            padding: 10,

        }, imgIconsPTOP: {
            padding: 5,

        },
        ListItemTextRoot: {
            color: "#2B2A29",
            fontSize: 15,
            fontWeight: 600
        },
        ListItemIconRoot: {
            minWidth: 40,
            display: '-webkit-inline-box',
            //display: 'inline-flex'
        },
        cardContent: {
            color: "#2B2A29"
        },
        cardTitle: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: 'rgba(43, 42, 41)'
        },
        cardDateTitle: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 12,
            color: 'rgba(224, 80, 34)',
            "& img": {
                padding: "5px 5px 5px"
            }
        },
        cardContentText: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 15,
            color: theme.palette.mainBlackColor,
            fontWeight: 600

        },
        cardContentAnswers: {
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 12,
            color: "#D2D2D2",
            fontWeight: 400

        },
        tileText: {
            fontSize: 13,
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 600
        },
        disableCard: {
            backgroundColor: '#e6e6e6',
            opacity: 0.55
        },



    })
;


const API_VOICE = "/profil/answer-to-poll";
const API_Like = "/profil/like-to-poll";

class PollCard extends Component {

    constructor(props) {
        super(props)
        const {
            avatarUrl, fullName, datePoll, imagePoll, contentPoll, pollType, idPoll, pollItems,
            iconStatis, iconFovrite, iconShare, iconComment, iconAnonced, iconEdit, CrownSvg, QrCode,
            cellHeight,
            answerText,
            disableCard,
            like,
            pollAnswerCount,
            pollLikeCount,
            clickOtvet,
            disableClickCard,
            propsCard,
            isVouted,
            favorite,
            userId,
            isCurrent
        } = this.props;

        this.state = {
            avatarUrl: avatarUrl,
            fullName: fullName,
            datePoll: datePoll,
            contentPoll: contentPoll,
            favorite: favorite,

            pollType: pollType,
            imagePoll: imagePoll,
            idPoll: idPoll,
            show: false,
            dialogopen: false,
            pollItems: pollItems,
            propsCard: propsCard,
            disableCard: disableCard === null ? false : disableCard,
            disableClickCard: disableClickCard === null ? false : disableClickCard,
            clickOtvet: clickOtvet === null ? false : clickOtvet,
            iconStatis: iconStatis === null ? false : iconStatis,
            iconFovrite: iconFovrite === null ? false : iconFovrite,
            iconShare: iconShare === null ? false : iconShare,
            iconComment: iconComment === null ? false : iconComment,
            iconAnonced: iconAnonced === null ? false : iconAnonced,
            iconEdit: iconEdit === null ? false : iconEdit,
            CrownSvg: CrownSvg === null ? false : CrownSvg,
            QrCode: QrCode === null ? false : QrCode,
            answerText: answerText === null ? false : answerText,
            cellHeight: cellHeight === null ? 180 : cellHeight,
            liked: like,
            userId: userId,
            pollAnswerCount: pollAnswerCount,
            pollLikeCount: pollLikeCount,
            isVouted: isVouted === null ? false : isVouted,
            isCurrent: isCurrent === null ? false : isCurrent,

        }

        this.changeRoute = this.changeRoute.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {
            avatarUrl, fullName, datePoll, imagePoll, contentPoll, pollType, idPoll, pollItems,
            iconStatis, iconFovrite, iconShare, iconComment, iconAnonced, iconEdit, CrownSvg, QrCode,
            cellHeight,
            answerText,
            like,
            pollAnswerCount,
            clickOtvet,
            disableClickCard,
            propsCard,
            pollLikeCount,
            disableCard,
            isVouted,
            userId,
            favorite,
            isCurrent,

        } = nextProps;

        this.setState({
            avatarUrl: avatarUrl,
            isVouted: isVouted === null ? false : isVouted,
            fullName: fullName,
            datePoll: datePoll,
            contentPoll: contentPoll,
            pollType: pollType,
            propsCard: propsCard,
            imagePoll: imagePoll,
            pollLikeCount: pollLikeCount,
            idPoll: idPoll,
            userId: userId,
            favorite: favorite,
            pollItems: pollItems,
            iconStatis: iconStatis === null ? false : iconStatis,
            clickOtvet: clickOtvet === null ? false : clickOtvet,
            iconFovrite: iconFovrite === null ? false : iconFovrite,
            liked: like,
            pollAnswerCount: pollAnswerCount,
            iconShare: iconShare === null ? false : iconShare,
            iconComment: iconComment === null ? false : iconComment,
            iconAnonced: iconAnonced === null ? false : iconAnonced,
            iconEdit: iconEdit === null ? false : iconEdit,
            CrownSvg: CrownSvg === null ? false : CrownSvg,
            QrCode: QrCode === null ? false : QrCode,
            answerText: answerText === null ? false : answerText,
            cellHeight: cellHeight === null ? 180 : cellHeight,
            disableCard: disableCard === null ? false : disableCard,
            disableClickCard: disableClickCard === null ? false : disableClickCard,
            isCurrent: isCurrent === null ? false : isCurrent,

        });
    }

    changeRoute(e) {
        e.preventDefault();
        const {history} = this.props;
        history.push('/statis/' + this.state.idPoll)
    }

    clickItem = (poll_id, item_id) => (e) => {
        e.preventDefault();
        if(!this.state.disableCard){
            return;
        }
        if (this.props.clickOtvet === false) {
            this.props.history.push('/polls/'+poll_id);
            return;
        }
        if (this.state.isVouted) {
            return;
        }

        if (this.props.isAuthenticated === false) {
            this.props.setIsAuth(true);
            return;
        }


        this.props.showLoading(true);
        axios.post(API_VOICE, {
            poll_item_id: item_id,
            poll_id: poll_id
        }).then(res => {
            if (res.status === 202) {
                this.setState({
                    pollItems: res.data.pollItems,
                    isVouted: res.data.isVouted,
                    pollAnswerCount: res.data.pollAnswerCount,
                })
            }
            this.props.showLoading(false);
        }).catch(err => {
            this.props.showLoading(false);
        })
    }

    likedClick = (poll_id) => (e) => {
        e.preventDefault();
        if (this.props.isAuthenticated === false) {
            this.props.setIsAuth(true)
            return;
        }
        this.props.showLoading(true);
        axios.post(API_Like, {
            poll_id: poll_id
        }).then(res => {
            if (res.status === 202) {
                this.setState({
                    pollLikeCount: res.data.pollLikeCount
                })
                this.props.liked(res.status, poll_id);
            }
            if (res.status === 203) {
                if(this.props.liked!==undefined){
                    this.props.liked(res.status, poll_id);
                }
                this.setState({
                    pollLikeCount: res.data.pollLikeCount
                })
            }
            this.props.showLoading(false);
        }).catch(err => {
            this.props.showLoading(false);
        })
        this.setState({
            liked: !this.state.liked
        });
        e.preventDefault();
    }

    editPath = (e) => {
        e.preventDefault()
        this.props.history.push("/poll/edit/" + this.state.idPoll);
    }


    handleClose = () => {
        this.setState({
            dialogopen: false
        })
    }

    countClick = (url) => {
        this.props.showLoading(true);
        axios.post(url, {id: this.state.idPoll}).then(res => {
            if (res.status === 202) {

            }
            this.props.showLoading(false);
        }).catch(err => {
            this.props.showLoading(false);
        })
    }

    render() {
        const {classes} = this.props;
        let urlCard = "/polls/" + this.state.idPoll;

        if(this.state.propsCard!==undefined && this.state.propsCard.username !== undefined){
            urlCard = "/polls/" + this.state.propsCard.username + "/" + this.state.idPoll;
        }

        if(this.state.isCurrent){
            urlCard = "/polls/" + this.props.user.userName + "/" + this.state.idPoll;
        }

        let urlProfile =  "/profile/" + this.props.username;
        if(this.props.user.userId!==null && this.props.user.userId===this.state.userId){
            urlProfile = '/account/profile';
        }
        if (this.props.isAuthenticated) {

        }


        const cardContent = <Card className={this.state.disableCard ? "" : classes.disableCard}>
            <CardHeader
                avatar={
                    <Link to={urlProfile}>
                        <Avatar aria-label="Recipe" src={this.state.avatarUrl}>
                            R
                        </Avatar>
                    </Link>
                }
                action={
                    <div>
                                <span className={classes.cardDateTitle}>
                                    {this.props.isAuthenticated && this.state.iconStatis &&
                                        <IconButton
                                            aria-haspopup="true"
                                            color="inherit"
                                            classes={{root: classes.imgIconsPTOP}}
                                            onClick={this.changeRoute}
                                        >
                                            <SvgIcon viewBox="0 0 15 15" classes={{root: classes.svgRootIcon}}>
                                                <path id="Path_1223" data-name="Path 1223"
                                                      d="M13.975,13.828V4.453H10.459v9.375H9.287V0H5.771V13.828H4.6V6.8H1.084v7.031H0V15H15V13.828Zm-10.547,0H2.256V10.313H3.428Zm0-4.687H2.256V7.969H3.428Zm4.688,4.688H6.943V10.313H8.115Zm0-4.687H6.943V1.172H8.115ZM12.8,13.828H11.631V10.313H12.8Zm0-4.687H11.631V5.625H12.8Z"
                                                      fill="#2b2a29"/>
                                            </SvgIcon>
                                        </IconButton>}
                                    {this.state.CrownSvg &&
                                            <SvgIcon viewBox="0 0 15 15" classes={{root: classes.svgRootIconCrown}}>
                                                <defs>
                                                    <clipPath id="clip-path-crown">
                                                        <rect id="Rectangle_100" data-name="Rectangle 100" width="15"
                                                              height="15" transform="translate(440 1002)" fill="#fff"
                                                              stroke="#707070" stroke-width="1"/>
                                                    </clipPath>
                                                </defs>
                                                <g id="Mask_Group_29" data-name="Mask Group 29"
                                                   transform="translate(-440 -1002)" clip-path="url(#clip-path-crown)">
                                                    <g id="crown" transform="translate(440 1004)">
                                                        <path id="Path_1261" data-name="Path 1261"
                                                              d="M12.283,9.144H2.717a.442.442,0,0,1-.365-.193C1.09,7.1.993,2.54.986,2.012c0-.021,0-.042,0-.062a.442.442,0,0,1,.441-.442h0a.442.442,0,0,1,.442.44s0,.029,0,.075a2.341,2.341,0,0,0,4.681-.074.442.442,0,0,1,.442-.442H8.007a.442.442,0,0,1,.442.442,2.341,2.341,0,0,0,4.681.07c0-.044,0-.069,0-.072a.442.442,0,0,1,.442-.44h0a.442.442,0,0,1,.441.442c0,.021,0,.042,0,.063-.007.528-.1,5.089-1.366,6.939a.442.442,0,0,1-.365.193Zm0,0"
                                                              fill="#ef7f1a"/>
                                                        <path id="Path_1262" data-name="Path 1262"
                                                              d="M13.574,1.507h0a.442.442,0,0,0-.442.44s0,.028,0,.072a2.341,2.341,0,0,1-4.681-.07.442.442,0,0,0-.442-.442H7.5V9.144h4.783a.442.442,0,0,0,.365-.193C13.91,7.1,14.007,2.54,14.014,2.012c0-.021,0-.042,0-.062a.442.442,0,0,0-.441-.442Zm0,0"
                                                              fill="#e05022"/>
                                                        <path id="Path_1263" data-name="Path 1263"
                                                              d="M7.5,0A1.427,1.427,0,1,0,8.927,1.427,1.429,1.429,0,0,0,7.5,0Zm0,0"
                                                              fill="#e05022"/>
                                                        <path id="Path_1264" data-name="Path 1264"
                                                              d="M7.5,0V2.855A1.427,1.427,0,0,0,7.5,0Zm0,0"
                                                              fill="#ef7f1a"/>
                                                        <path id="Path_1265" data-name="Path 1265"
                                                              d="M1.427,1.1A1.427,1.427,0,1,0,2.855,2.529,1.429,1.429,0,0,0,1.427,1.1Zm0,0"
                                                              fill="#e05022"/>
                                                        <path id="Path_1266" data-name="Path 1266"
                                                              d="M13.573,1.1A1.427,1.427,0,1,0,15,2.529,1.429,1.429,0,0,0,13.573,1.1Zm0,0"
                                                              fill="#ef7f1a"/>
                                                        <path id="Path_1267" data-name="Path 1267"
                                                              d="M12.283,9.593H2.717a.442.442,0,0,1-.442-.442V7.834H12.724V9.151a.442.442,0,0,1-.442.442Zm0,0"
                                                              transform="translate(0 1)" fill="#e05022"/>
                                                        <path id="Path_1268" data-name="Path 1268"
                                                              d="M7.5,9.593h4.783a.442.442,0,0,0,.442-.442V7.834H7.5Zm0,0"
                                                              transform="translate(0 1)" fill="#ef7f1a"/>
                                                    </g>
                                                </g>
                                            </SvgIcon>}
                                    {this.state.iconEdit ?
                                        <IconButton
                                            aria-haspopup="true"
                                            color="inherit"
                                            classes={{root: classes.imgIconsPTOP}}
                                            onClick={this.editPath}
                                        >
                                            <SvgIcon viewBox="0 0 15 15" classes={{root: classes.svgRootIcon}}>
                                                <path id="Path_1222" data-name="Path 1222"
                                                      d="M9.328,3.792l3.051,3.066L4.656,14.62l-3.05-3.066Zm5.367-.74L13.334,1.685a1.346,1.346,0,0,0-1.908,0l-1.3,1.31,3.051,3.066,1.52-1.528A1.049,1.049,0,0,0,14.695,3.053ZM.009,15.864a.348.348,0,0,0,.42.415l3.4-.828L.78,12.384Z"
                                                      transform="translate(-0.001 -1.289)" fill="#2b2a29"/>
                                            </SvgIcon>
                                        </IconButton> : ""}
                                </span>
                    </div>}
                classes={{title: classes.cardTitle}}
                title={this.state.fullName}

                subheaderTypographyProps={{color: 'secondary'}}
                subheader={this.state.datePoll}
            />
            <CardContent>
                <Typography component="p" classes={{root: classes.cardContentText}}>
                    {this.state.contentPoll}
                </Typography>
                {this.state.pollType === 1 &&
                <Typography component="p" classes={{root: classes.cardContentAnswers}}>
                    Ответы {this.state.pollAnswerCount !== 0 ? "(" + this.state.pollAnswerCount + ")" : ""}
                </Typography>}

            </CardContent>
            <CardMedia
                className={classes.media}
                title={this.state.fullName}
                key={"pollcard" + this.state.pollId}
            >

                {this.state.pollType === 1 ?
                    <GridList key={"grid" + this.state.pollId} cellHeight={this.state.cellHeight}
                              className={classes.gridList}>
                        {
                            this.state.pollItems !== undefined ? this.state.pollItems.map((item, Key) => {
                                return (
                                    <GridListTile
                                        key={"SubItem" + Key}
                                        classes={{
                                            root: this.state.disableCard ? classes.GridListTileRoot : classes.GridListTileRootDisabled,
                                            tile: this.state.disableCard ? classes.Gridtile : classes.GridtileDisabled
                                        }}
                                        onClick={this.clickItem(this.props.idPoll, item.id)}
                                        cols={this.state.pollItems.length % 2 && (this.state.pollItems.length - 1) === Key ? 2 : 1}
                                    >

                                        <figure className={classes.tint}>
                                            <img src={item.image} className={classes.cardTileImg + ' imgTile'}/>
                                        </figure>
                                        <GridListTileBar
                                            title={item.option}
                                            titlePosition="top"
                                            actionPosition="left"
                                            classes={{
                                                root: classes.titleBar, title: classes.tileText
                                            }}

                                        />
                                        <div className={classes.cardBar}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={3} sm={3} xs={3}>
                                                    <div className={classes.pollBottomCircle}>
                                                        <Progress
                                                            type="circle"
                                                            percent={this.state.isVouted && item.percent}
                                                            width={30}
                                                            strokeWidth={10}
                                                            theme={{
                                                                default: {
                                                                    symbol: ' ',
                                                                    trailColor: '#d6d6d6',
                                                                    color: '#fff'
                                                                },

                                                                full: {
                                                                    symbol: <img src={check} width={8}
                                                                                 height={6.13}/>,
                                                                    trailColor: '#d6d6d6',
                                                                    color: '#fff'
                                                                },
                                                            }}
                                                            status={item.isVoutedMe === true ? "full" : "default"}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sm={6} xs={6} className={classes.textRight}>
                                                    <div className={classes.avatars}>
                                                        {item.avatars.map((avatarItem, key) => {
                                                            return (
                                                                <span key={"avatar-" + key} className={classes.avatar}>
                                                                <img src={avatarItem}/>
                                                            </span>
                                                            );
                                                        })}
                                                        <span className={classes.avatarMore}>
                                                                    <SvgIcon viewBox="0 0 20 20"
                                                                             classes={{root: classes.svgRoot}}>
                                                                      <defs>
                                                                            <clipPath id="clip-path-more">
                                                                              <rect width="20" height="20" fill="none"/>
                                                                            </clipPath>
                                                                            <linearGradient id="linear-gradient"
                                                                                            x1="0.5" x2="0.5" y2="1"
                                                                                            gradientUnits="objectBoundingBox">
                                                                              <stop offset="0" stop-color="#e05022"/>
                                                                              <stop offset="1" stop-color="#ef7f1a"/>
                                                                            </linearGradient>
                                                                          </defs>
                                                                          <g id="Component_20_1"
                                                                             data-name="Component 20 – 1"
                                                                             clip-path-more="url(#clip-path-more)">
                                                                            <circle id="brooke-cagle-609873-unsplash"
                                                                                    cx="9.5" cy="9.5" r="9.5"
                                                                                    transform="translate(0.5 0.5)"
                                                                                    stroke="#fff"
                                                                                    stroke-linejoin="bevel"
                                                                                    stroke-width="1"
                                                                                    fill="url(#linear-gradient)"/>
                                                                            <g id="brooke-cagle-609873-unsplash-2"
                                                                               data-name="brooke-cagle-609873-unsplash"
                                                                               transform="translate(9 9)" fill="#e05022"
                                                                               stroke="#fff" stroke-width="1">
                                                                              <circle cx="1" cy="1" r="1"
                                                                                      stroke="none"/>
                                                                              <circle cx="1" cy="1" r="0.5"
                                                                                      fill="none"/>
                                                                            </g>
                                                                            <g id="brooke-cagle-609873-unsplash-3"
                                                                               data-name="brooke-cagle-609873-unsplash"
                                                                               transform="translate(6.158 9)"
                                                                               fill="#e05022" stroke="#fff"
                                                                               stroke-width="1">
                                                                              <circle cx="1" cy="1" r="1"
                                                                                      stroke="none"/>
                                                                              <circle cx="1" cy="1" r="0.5"
                                                                                      fill="none"/>
                                                                            </g>
                                                                            <g id="brooke-cagle-609873-unsplash-4"
                                                                               data-name="brooke-cagle-609873-unsplash"
                                                                               transform="translate(11.842 9)"
                                                                               fill="#e05022" stroke="#fff"
                                                                               stroke-width="1">
                                                                              <circle cx="1" cy="1" r="1"
                                                                                      stroke="none"/>
                                                                              <circle cx="1" cy="1" r="0.5"
                                                                                      fill="none"/>
                                                                            </g>
                                                                          </g>
                                                                    </SvgIcon>
                                                </span>
                                                    </div>

                                                </Grid>
                                                <Grid item xs={3} sm={3} xs={3}
                                                      classes={{root: classes.percentPcontainer}}>
                                                    <Typography className={classes.procentP}>
                                                        {this.state.isVouted && item.percent + '%'}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </div>
                                    </GridListTile>);
                            }) : ""
                        }

                    </GridList> : <img style={{width: '100%'}} src={this.state.imagePoll}/>}

            </CardMedia>
            {this.state.pollType === 2 ?
                <CardContent>
                    <List
                        component="nav"
                        aria-label="Main mailbox folders"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Ответы {this.state.pollAnswerCount !== undefined ? "(" + this.state.pollAnswerCount + ")" : ""}
                            </ListSubheader>
                        }
                    >
                        {this.state.pollItems !== undefined ? this.state.pollItems.map((itemOption, Key) => {
                            return (<ListItem key={"ListItem" + Key} classes={{root: classes.rootItem}}
                                              onClick={this.clickItem(this.props.idPoll, itemOption.id)}>

                                <ListItemIcon classes={{root: classes.ListItemIconRoot}}>

                                    <Progress
                                        type="circle"
                                        percent={this.state.isVouted && itemOption.percent}
                                        width={30}
                                        strokeWidth={10}
                                        theme={{
                                            default: {
                                                symbol: ' ',
                                                trailColor: '#d6d6d6',
                                                color: '#e67043'
                                            },

                                            full: {
                                                symbol: <img src={checkInLine} width={8}
                                                             height={6.13}/>,
                                                trailColor: '#d6d6d6',
                                                color: '#e67043'
                                            },
                                        }}
                                        status={itemOption.isVoutedMe === true ? "full" : "default"}
                                    />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.ListItemTextRoot}}
                                              primary={itemOption.option}/>

                                <ListItemIcon classes={{root: classes.avatarsContainer}}>
                                    <div className={classes.avatars}>
                                        {itemOption.avatars.map((avatarItem, key) => {
                                            return (
                                                <span key={"ava-" + key} className={classes.avatar}>
                                                            <img src={avatarItem}/>
                                                        </span>
                                            );
                                        })}
                                        <span className={classes.avatarMore}>
                                                            <SvgIcon viewBox="0 0 20 20"
                                                                     classes={{root: classes.svgRoot}}>
                                                              <defs>
                                                                    <clipPath id="clip-path-more">
                                                                      <rect width="20" height="20" fill="none"/>
                                                                    </clipPath>
                                                                    <linearGradient id="linear-gradient" x1="0.5"
                                                                                    x2="0.5" y2="1"
                                                                                    gradientUnits="objectBoundingBox">
                                                                      <stop offset="0" stop-color="#e05022"/>
                                                                      <stop offset="1" stop-color="#ef7f1a"/>
                                                                    </linearGradient>
                                                                  </defs>
                                                                  <g id="Component_20_1" data-name="Component 20 – 1"
                                                                     clip-path-more="url(#clip-path-more)">
                                                                    <circle id="brooke-cagle-609873-unsplash" cx="9.5"
                                                                            cy="9.5" r="9.5"
                                                                            transform="translate(0.5 0.5)" stroke="#fff"
                                                                            stroke-linejoin="bevel" stroke-width="1"
                                                                            fill="url(#linear-gradient)"/>
                                                                    <g id="brooke-cagle-609873-unsplash-2"
                                                                       data-name="brooke-cagle-609873-unsplash"
                                                                       transform="translate(9 9)" fill="#e05022"
                                                                       stroke="#fff" stroke-width="1">
                                                                      <circle cx="1" cy="1" r="1" stroke="none"/>
                                                                      <circle cx="1" cy="1" r="0.5" fill="none"/>
                                                                    </g>
                                                                    <g id="brooke-cagle-609873-unsplash-3"
                                                                       data-name="brooke-cagle-609873-unsplash"
                                                                       transform="translate(6.158 9)" fill="#e05022"
                                                                       stroke="#fff" stroke-width="1">
                                                                      <circle cx="1" cy="1" r="1" stroke="none"/>
                                                                      <circle cx="1" cy="1" r="0.5" fill="none"/>
                                                                    </g>
                                                                    <g id="brooke-cagle-609873-unsplash-4"
                                                                       data-name="brooke-cagle-609873-unsplash"
                                                                       transform="translate(11.842 9)" fill="#e05022"
                                                                       stroke="#fff" stroke-width="1">
                                                                      <circle cx="1" cy="1" r="1" stroke="none"/>
                                                                      <circle cx="1" cy="1" r="0.5" fill="none"/>
                                                                    </g>
                                                                  </g>
                                                            </SvgIcon>
                                                </span>
                                    </div>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <div style={{
                                        textAlign: 'center',
                                        color: "#dc5b2b",
                                        marginLeft: 5
                                    }}>{this.state.isVouted && itemOption.percent + '%'}
                                    </div>
                                    <span className={classes.dot}></span>
                                </ListItemIcon>


                            </ListItem>)
                        }) : ""}


                    </List>
                </CardContent> : ""

            }
            <Grid container spacing={0} direction={"row"}>
                <Grid item md={6} sm={6} xs={6}>
                    <div className={classes.imgIcons}>
                        {this.state.iconComment ? <IconButton
                            aria-haspopup="true"
                            color="inherit"
                            disabled={!this.state.disableCard}
                            classes={{root: classes.imgIconsP}}
                            onClick={this.props.commentClick}
                        >
                            <SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRootIcon}}>
                                <defs>
                                    <clipPath id="clip-path-chat">
                                        <rect id="Rectangle_46" data-name="Rectangle 46" width="14" height="14"
                                              transform="translate(190 1409)" fill="#fff" stroke="#707070"
                                              stroke-width="1"/>
                                    </clipPath>
                                </defs>
                                <g id="Mask_Group_2" data-name="Mask Group 2" transform="translate(-190 -1409)"
                                   clip-path="url(#clip-path-chat)">
                                    <g id="chat" transform="translate(190.003 1409)">
                                        <g id="Group_1045" data-name="Group 1045" transform="translate(0)">
                                            <path id="Path_1219" data-name="Path 1219"
                                                  d="M11.947,2.052A7,7,0,0,0,1.588,11.438a2.626,2.626,0,0,1-1.1,1.275.653.653,0,0,0,.188,1.231,3.33,3.33,0,0,0,.5.038h0a4.526,4.526,0,0,0,2.515-.815A7,7,0,0,0,11.947,2.052Zm-.56,9.336a6.21,6.21,0,0,1-7.531.964.394.394,0,0,0-.443.026,3.769,3.769,0,0,1-2.2.806,3.983,3.983,0,0,0,1.2-1.656.4.4,0,0,0-.067-.422,6.207,6.207,0,1,1,9.037.281Z"
                                                  transform="translate(-0.003)"/>
                                        </g>
                                    </g>
                                </g>
                            </SvgIcon>
                        </IconButton> : ""}
                        {this.state.QrCode ?
                            <IconButton
                                aria-haspopup="true"
                                color="inherit"
                                disabled={!this.state.disableCard}
                                onClick={() => {
                                    this.countClick("polls/qr-code");
                                    this.props.dialogOpenClick('qrcode')
                                }}
                                classes={{root: classes.imgIconsP}}
                            >
                                <SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRootIcon}}>
                                    <defs>
                                        <clipPath id="clip-path-qrcode">
                                            <rect id="Rectangle_72" data-name="Rectangle 72" width="14"
                                                  height="14" transform="translate(234 1407)" fill="#fff"
                                                  stroke="#707070" stroke-width="1"/>
                                        </clipPath>
                                    </defs>
                                    <g id="Mask_Group_22" data-name="Mask Group 22"
                                       transform="translate(-234 -1407)" clip-path="url(#clip-path-qrcode)">
                                        <g id="qr-code_4_" data-name="qr-code (4)"
                                           transform="translate(234 1407)">
                                            <g id="Group_1538" data-name="Group 1538">
                                                <g id="Group_1537" data-name="Group 1537">
                                                    <path id="Path_1237" data-name="Path 1237"
                                                          d="M5.879,0H.41A.41.41,0,0,0,0,.41V5.879a.41.41,0,0,0,.41.41H5.879a.41.41,0,0,0,.41-.41V.41A.41.41,0,0,0,5.879,0Zm-.41,5.469H.82V.82H5.469Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1540" data-name="Group 1540">
                                                <g id="Group_1539" data-name="Group 1539">
                                                    <path id="Path_1238" data-name="Path 1238"
                                                          d="M3.965,1.914H2.324a.41.41,0,0,0-.41.41V3.965a.41.41,0,0,0,.41.41H3.965a.41.41,0,0,0,.41-.41V2.324A.41.41,0,0,0,3.965,1.914Zm-.41,1.641h-.82v-.82h.82Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1542" data-name="Group 1542">
                                                <g id="Group_1541" data-name="Group 1541">
                                                    <path id="Path_1239" data-name="Path 1239"
                                                          d="M13.59,0H8.121a.41.41,0,0,0-.41.41V5.879a.41.41,0,0,0,.41.41H13.59a.41.41,0,0,0,.41-.41V.41A.41.41,0,0,0,13.59,0Zm-.41,5.469H8.531V.82H13.18Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1544" data-name="Group 1544">
                                                <g id="Group_1543" data-name="Group 1543">
                                                    <path id="Path_1240" data-name="Path 1240"
                                                          d="M11.676,1.914H10.035a.41.41,0,0,0-.41.41V3.965a.41.41,0,0,0,.41.41h1.641a.41.41,0,0,0,.41-.41V2.324A.41.41,0,0,0,11.676,1.914Zm-.41,1.641h-.82v-.82h.82Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1546" data-name="Group 1546">
                                                <g id="Group_1545" data-name="Group 1545">
                                                    <path id="Path_1241" data-name="Path 1241"
                                                          d="M5.879,7.711H.41a.41.41,0,0,0-.41.41V13.59A.41.41,0,0,0,.41,14H5.879a.41.41,0,0,0,.41-.41V8.121A.41.41,0,0,0,5.879,7.711Zm-.41,5.469H.82V8.531H5.469Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1548" data-name="Group 1548">
                                                <g id="Group_1547" data-name="Group 1547">
                                                    <path id="Path_1242" data-name="Path 1242"
                                                          d="M3.965,9.625H2.324a.41.41,0,0,0-.41.41v1.641a.41.41,0,0,0,.41.41H3.965a.41.41,0,0,0,.41-.41V10.035A.41.41,0,0,0,3.965,9.625Zm-.41,1.641h-.82v-.82h.82Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1550" data-name="Group 1550">
                                                <g id="Group_1549" data-name="Group 1549">
                                                    <path id="Path_1243" data-name="Path 1243"
                                                          d="M13.59,11.556H11.266V10.035a.41.41,0,0,0-.82,0v1.931a.41.41,0,0,0,.41.41H13.18v.8H10.855a.41.41,0,0,0,0,.82H13.59a.41.41,0,0,0,.41-.41V11.967A.41.41,0,0,0,13.59,11.556Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1552" data-name="Group 1552">
                                                <g id="Group_1551" data-name="Group 1551">
                                                    <path id="Path_1244" data-name="Path 1244"
                                                          d="M13.59,7.711a.41.41,0,0,0-.41.41v1.914a.41.41,0,0,0,.82,0V8.121A.41.41,0,0,0,13.59,7.711Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1554" data-name="Group 1554">
                                                <g id="Group_1553" data-name="Group 1553">
                                                    <path id="Path_1245" data-name="Path 1245"
                                                          d="M10.035,7.711H8.121a.41.41,0,0,0-.41.41v1.914a.41.41,0,0,0,.82,0v-1.5h1.5a.41.41,0,0,0,0-.82Z"/>
                                                </g>
                                            </g>
                                            <g id="Group_1556" data-name="Group 1556">
                                                <g id="Group_1555" data-name="Group 1555">
                                                    <path id="Path_1246" data-name="Path 1246"
                                                          d="M8.121,11.556a.41.41,0,0,0-.41.41V13.59a.41.41,0,0,0,.82,0V11.967A.41.41,0,0,0,8.121,11.556Z"/>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </SvgIcon>

                            </IconButton> : ""}
                        {this.state.iconShare ?
                            <IconButton
                                aria-haspopup="true"
                                color="inherit"
                                disabled={!this.state.disableCard}
                                onClick={() => {
                                    this.countClick("polls/share-link");
                                    this.props.dialogOpenClick('share')
                                }}
                                classes={{root: classes.imgIconsP}}
                            >
                                <SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRootIcon}}>
                                    <defs>
                                        <clipPath id="clip-path-share">
                                            <rect id="Rectangle_48" data-name="Rectangle 48" width="14" height="14"
                                                  transform="translate(224 1409)" fill="#fff" stroke="#707070"
                                                  stroke-width="1"/>
                                        </clipPath>
                                    </defs>
                                    <g id="Mask_Group_3" data-name="Mask Group 3" transform="translate(-224 -1409)"
                                       clip-path="url(#clip-path-share)">
                                        <g id="upload" transform="translate(224 1409.513)">
                                            <g id="Group_1046" data-name="Group 1046" transform="translate(0 0)">
                                                <path id="Path_1220" data-name="Path 1220"
                                                      d="M13.6,5.87a.4.4,0,0,0-.4.4V9.919a1.8,1.8,0,0,1-1.8,1.8H2.6a1.8,1.8,0,0,1-1.8-1.8V6.211a.4.4,0,0,0-.8,0V9.919a2.6,2.6,0,0,0,2.6,2.6h8.8a2.6,2.6,0,0,0,2.6-2.6V6.271A.4.4,0,0,0,13.6,5.87Z"
                                                      transform="translate(0 0.456)"/>
                                                <path id="Path_1221" data-name="Path 1221"
                                                      d="M4.154,3.675,6.02,1.809V9.947a.4.4,0,0,0,.8,0V1.809L8.688,3.675a.4.4,0,0,0,.282.119.387.387,0,0,0,.282-.119.4.4,0,0,0,0-.567L6.7.558A.406.406,0,0,0,6.421.439a.388.388,0,0,0-.282.119L3.59,3.107a.4.4,0,0,0,.565.567Z"
                                                      transform="translate(0.579 -0.439)"/>
                                            </g>
                                        </g>
                                    </g>
                                </SvgIcon>
                            </IconButton> : ""}
                        {this.props.isAuthenticated && this.state.iconAnonced &&
                        <IconButton
                            aria-haspopup="true"
                            color="inherit"
                            disabled={!this.state.disableCard}

                            onClick={() => {
                                this.props.dialogOpenClick('jalba')
                            }}
                            classes={{root: classes.imgIconsP}}
                        ><SvgIcon viewBox="0 0 14 14" classes={{root: classes.svgRootIcon}}>
                            <defs>
                                <clipPath id="clip-path-ad">
                                    <rect id="Rectangle_72" data-name="Rectangle 72" width="14" height="14"
                                          transform="translate(234 1407)" fill="#fff" stroke="#707070"
                                          stroke-width="1"/>
                                </clipPath>
                            </defs>
                            <g id="Mask_Group_33" data-name="Mask Group 33" transform="translate(-234 -1407)"
                               clip-path="url(#clip-path-ad)">
                                <g id="megaphone" transform="translate(234 1407)">
                                    <g id="Group_1652" data-name="Group 1652">
                                        <path id="Path_1288" data-name="Path 1288"
                                              d="M12.291,3.764V1.511a.693.693,0,0,0-1.032-.6A16.111,16.111,0,0,1,4.538,2.926c-.018,0-2.17.011-2.17.011a1.058,1.058,0,0,0-1.049.932H.877A.878.878,0,0,0,0,4.746V6.673a.878.878,0,0,0,.877.877h.442a1.059,1.059,0,0,0,.623.842L3.514,12.73a.688.688,0,0,0,.645.451H5.736a.686.686,0,0,0,.645-.92L5.03,8.536a16.089,16.089,0,0,1,6.229,1.974.688.688,0,0,0,.69-.007.685.685,0,0,0,.341-.6V7.654a1.961,1.961,0,0,0,0-3.89ZM1.311,6.873H.877a.2.2,0,0,1-.2-.2V4.746a.2.2,0,0,1,.2-.2h.434Zm.9.9a.381.381,0,0,1-.225-.347V3.993h0a.381.381,0,0,1,.38-.38H4.209V7.806H2.344A.355.355,0,0,1,2.213,7.772Zm3.532,4.72a.008.008,0,0,1,0,.009.008.008,0,0,1-.008,0H4.158a.01.01,0,0,1-.009-.006L2.694,8.482h1.6Zm5.87-2.586a.012.012,0,0,1-.007.013.016.016,0,0,1-.018,0,16.767,16.767,0,0,0-6.7-2.077V3.576a16.772,16.772,0,0,0,6.7-2.077.016.016,0,0,1,.018,0,.012.012,0,0,1,.007.013Zm.676-2.937V4.449a1.286,1.286,0,0,1,0,2.521Z"/>
                                    </g>
                                </g>
                            </g>
                        </SvgIcon> </IconButton>}
                    </div>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>

                    {this.state.iconFovrite ? <React.Fragment>
                        <div style={{textAlign: 'right', padding: 10}}><span
                            style={{fontSize: 12}}>{this.state.pollLikeCount} </span>
                            <IconButton
                                onClick={this.likedClick(this.props.idPoll)}
                                aria-haspopup="true"
                                // disabled={!this.state.disableCard}
                                color="inherit"
                                classes={{root: classes.imgIconsP}}
                            > {this.state.liked ? <FovriteIcon classes={{root: classes.fovriteRed}}/> :
                                <FovriteBorderIcon/>}</IconButton></div>
                    </React.Fragment> : ""}


                </Grid>
            </Grid>

        </Card>;


        return this.state.disableClickCard ? <React.Fragment>
            <Dialog onClose={this.handleClose} aria-labelledby="dialogQR" open={this.state.dialogopen}>
                <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{width: '65%', margin: '0px 10px 0px'}}
                    value="some text"
                />
            </Dialog>
            <Link
                to={urlCard}
                className={classes.clickCard}>
                {cardContent}
            </Link> </React.Fragment> : <React.Fragment>
            <Dialog onClose={this.handleClose} aria-labelledby="dialogQR" open={this.state.dialogopen}>
                <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{width: '65%', margin: '0px 10px 0px'}}
                    value="some text"
                />


            </Dialog>
            {cardContent}
        </React.Fragment>

    }
}

//
PollCard.propTypes = {
    classes: PropTypes.object.isRequired,
    disableClickCard: PropTypes.bool,
};


function mapStateToProps(state) {

    return {
        isAuthenticated: state.mainData.isAuthenticated,
        user: state.mainData.user,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({setIsAuth}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(PollCard)));