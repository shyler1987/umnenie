import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';
import {withRouter} from "react-router-dom";

import {red} from "@material-ui/core/colors";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

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


import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ListSubheader from '@material-ui/core/ListSubheader';
import '../../media/style.css';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SvgIcon from '@material-ui/core/SvgIcon';

import LaveSvg from '../../media/icons/lave.svg'
import ChatSvg from '../../media/icons/chat.svg'
import StatisSvg from '../../media/icons/statis.svg';
import ShareSvg from '../../media/icons/share.svg';
import AnouncedSvg from '../../media/icons/anounced.svg';
import EditSvg from '../../media/icons/edit.svg';
import CrownSvg from '../../media/icons/crown.svg';


import {Link, NavLink} from "react-router-dom";

const styles = theme => ({
        avatars: {
            display: 'inline-flex',
            paddingLeft: '50px'
        },
        avatar: {
            marginLeft: '-20px',
            position: 'relative',
            border: '1px solid #fff',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '30px',
            height: '30px',
            '& img': {
                width: '30px',
                height: '30px'
            },
        },
        titleBar: {
            background:
                'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ' +
                'rgba(0,0,0,0.1) 27%, rgba(0,0,0,0) 100%)',

        },
        GridListTileRoot: {
            height: 'auto',

        },
        Gridtile: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#000 !important',
            },
        },
        cardBar: {
            left: 0,
            right: 0,
            bottom: 0,
            height: 48,
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
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
            fontSize: '13px'
        },
        tint: {
            overflow: 'hidden',
            margin: '0 20px 20px 0',
            background: '#dc5b2b',
            width: '100%',
            height: 'inherit'
        },
        cardTileImg: {
            width: '100%',
            height: 'inherit',
            '&:hover': {
                opacity: '.2',
                cursor: 'pointer'
            },
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

            '&:hover': {
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 15,
                paddingRight: 15,
                border: "1px solid #eee",
                borderRadius: 5,
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


        },
        imgIcons:{
            margin:10,
            "& img":{
                padding:5
            }
        }


    })
;

class PollCard extends Component {

    constructor(props) {
        super(props)
        const {
            avatarUrl, fullName,datePoll,imagePoll,contentPoll,pollType,idPoll,pollItems,
            iconStatis, iconFovrite, iconShare, iconComment, iconAnonced, iconEdit, CrownSvg
        } = this.props;

        this.state = {
            avatarUrl: avatarUrl,
            fullName: fullName,
            datePoll: datePoll,
            contentPoll: contentPoll,
            pollType: pollType,
            imagePoll: imagePoll,
            idPoll: idPoll,
            pollItems: pollItems,
            iconStatis: iconStatis===null ? false : iconStatis,
            iconFovrite: iconFovrite===null ? false : iconFovrite,
            iconShare: iconShare===null ? false : iconShare,
            iconComment: iconComment===null ? false : iconComment,
            iconAnonced: iconAnonced===null ? false : iconAnonced,
            iconEdit: iconEdit===null ? false : iconEdit,
            CrownSvg: CrownSvg===null ? false : CrownSvg,
        }
    }


    render() {
        const {classes} = this.props;
        return (<Link to={"/polls/" + this.state.idPoll} className={classes.clickCard}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" src={this.state.avatarUrl}>
                                R
                            </Avatar>
                        }
                        action={<div><span style={{padding: 5, color: '#e46027'}}> {this.state.iconStatis ? <img src={StatisSvg}/> : ""} {this.state.CrownSvg ? <img src={CrownSvg}/> : ""} {this.state.iconEdit ? <img src={EditSvg}/> : ""}</span></div>}
                        classes={{title: classes.dateColor}}
                        title={this.state.fullName}
                        subheaderTypographyProps={{color: 'secondary'}}
                        subheader={this.state.datePoll}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.contentPoll}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        title={this.state.fullName}
                    >

                        {this.state.pollType === 1 ?
                            <GridList cellHeight={180} className={classes.gridList}>
                                {
                                    this.state.pollItems !== undefined ? this.state.pollItems.map((item, Key) => {
                                        return (
                                            <GridListTile
                                                key="Subheader1"
                                                classes={{
                                                    root: classes.GridListTileRoot,
                                                    tile: classes.Gridtile
                                                }}
                                                cols={this.state.pollItems.length % 2 && (this.state.pollItems.length - 1) === Key ? 2 : 1}
                                            >

                                                <figure className={classes.tint}>
                                                    <img src={item.image} className={classes.cardTileImg}/>
                                                </figure>
                                                <GridListTileBar
                                                    title={item.option}
                                                    titlePosition="top"
                                                    actionPosition="left"
                                                    classes={{root: classes.titleBar,}}

                                                />
                                                <grid className={classes.cardBar}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={3}>
                                                            <div className={classes.pollBottomCircle}>
                                                                <CircularProgressbar
                                                                    value={item.percent}
                                                                    text={``}
                                                                    strokeWidth={10}
                                                                    className={classes.CircularProgressbar}
                                                                    styles={
                                                                        {
                                                                            path: {
                                                                                stroke: `rgba(255, 255, 255, 100)`,
                                                                            }
                                                                        }
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6} className={classes.textRight}>
                                                            <div className={classes.avatars}>
                                                                {item.avatars.map((avatarItem) => {
                                                                    return (
                                                                        <span className={classes.avatar}>
                                                                <img src={avatarItem}/>
                                                            </span>
                                                                    );
                                                                })}
                                                            </div>

                                                        </Grid>
                                                        <Grid item xs={3} alignItems={'center'}>
                                                            <Typography className={classes.procentP}>
                                                                {item.percent}%
                                                            </Typography>

                                                        </Grid>
                                                    </Grid>
                                                </grid>
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
                                        Ответы (258)
                                    </ListSubheader>
                                }
                            >
                                {this.state.pollItems !== undefined ? this.state.pollItems.map((itemOption, Key) => {
                                    return (<ListItem classes={{root: classes.rootItem}}>
                                        <ListItemIcon>
                                            <CircularProgressbar
                                                value={itemOption.percent}
                                                text={``}
                                                className={classes.CircularProgressbar}
                                                strokeWidth={10}
                                                styles={
                                                    {
                                                        path: {
                                                            stroke: `rgba(222, 98, 42, 100)`,
                                                        }
                                                    }
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={itemOption.option}/>
                                        <ListItemIcon>
                                            <div className={classes.avatars}>
                                                {itemOption.avatars.map((avatarItem) => {
                                                    return (
                                                        <span className={classes.avatar}>
                                                            <img src={avatarItem}/>
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </ListItemIcon>
                                        <ListItemIcon>
                                            <div style={{
                                                textAlign: 'center',
                                                color: "#dc5b2b",
                                                marginLeft: 5
                                            }}>{itemOption.percent}%
                                            </div>
                                            <dot className={classes.dot}></dot>
                                        </ListItemIcon>

                                    </ListItem>)
                                }) : ""}


                            </List>
                        </CardContent> : ""

                    }
                    <Grid container spacing={0} direction={"row"}>
                        <Grid item md={6}>
                            <div className={classes.imgIcons} >
                                {this.state.iconComment ? <img  src={ChatSvg}/> : ""}
                                {this.state.iconShare ? <img  src={ShareSvg}/> : ""}
                                {this.state.iconAnonced ? <img  src={AnouncedSvg}/> : ""}
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div style={{textAlign: 'right', padding: 10}}><span style={{fontSize: 12}}>255 </span>
                                {this.state.iconFovrite ? <img  src={LaveSvg}/> : ""}

                            </div>
                        </Grid>
                    </Grid>

                </Card>
            </Link>
        );
    }
}

//
PollCard.propTypes = {
    classes: PropTypes.object.isRequired,
    iconFovrite: PropTypes.bool.isRequired,
    iconComment: PropTypes.bool.isRequired,
    iconShare: PropTypes.bool.isRequired,
    iconAnonced: PropTypes.bool.isRequired,
    iconStatis: PropTypes.bool.isRequired,
};
export default withStyles(styles)(PollCard);