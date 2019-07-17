import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {red} from "@material-ui/core/colors";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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


import DonutLarge from '@material-ui/icons/DonutLarge';
import ListSubheader from '@material-ui/core/ListSubheader';
import '../../media/style.css';

const styles = theme => ({
        card: {
            maxWidth: "100%",
        },
        media: {
            paddingTop: '56.25%', // 16:9
            height: 140,
        },
        avatar: {
            backgroundColor: red[900],
        },
        dateColor: {
            color: "#E35B1E"
        },
        avatars: {
            display: 'inline-flex',
            flexDirection: 'row-reverse',
            paddingLeft: 50
        },
        avatarR: {
            marginLeft: -25,
            position: 'relative',
            border: '1px solid #fff',
            borderRadius: '50%',
            overflow: 'hidden',
            width: 50,
            height: 50
        },
        imgAvatar: {
            width: 20,
            height: 20
        },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },

    })
;

class PollCard extends Component {

    constructor(props) {
        super(props)
        const {avatarUrl, fullName, datePoll, imagePoll, contentPoll, typePoll} = this.props;

        this.state = {
            avatarUrl: avatarUrl,
            fullName: fullName,
            datePoll: datePoll,
            contentPoll: contentPoll,
            typePoll: typePoll,
            imagePoll: imagePoll,
        }
    }


    render() {
        const classes = this.props;
        console.log(this.state.typePoll)
        return (<Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" src={this.state.avatarUrl} className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="Settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
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
                    {this.state.typePoll===2 ?
                        <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader"  style={{ height: 'auto' }}>
                            <img style={{width: '100%'}} src={this.state.imagePoll}/>
                        </GridListTile>
                        <GridListTile key="Subheader" style={{ height: 'auto' }}>
                            <img style={{width: '100%'}} src={this.state.imagePoll}/>
                        </GridListTile>
                        <GridListTile key="Subheader" style={{ height: 'auto' }}>
                            <img style={{width: '100%'}} src={this.state.imagePoll}/>
                        </GridListTile>
                        <GridListTile key="Subheader"  style={{ height: 'auto' }}>
                            <img style={{width: '100%'}} src={this.state.imagePoll}/>
                        </GridListTile>

                    </GridList> : <img style={{width: '100%'}} src={this.state.imagePoll}/>}

                </CardMedia>

                <CardContent>
                    <List
                        component="nav"
                        aria-label="Main mailbox folders"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Ответы
                            </ListSubheader>
                        }
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <DonutLarge/>
                            </ListItemIcon>
                            <ListItemText primary="Опросы за деньги"/>
                            <ListItemIcon>
                                <div className={"avatars"}>
                                <span className={"avatar"}>
                                    <img src="https://picsum.photos/70"/>
                                </span><span className={"avatar"}>
                                    <img src="https://picsum.photos/70"/>
                                </span><span className={"avatar"}>
                                    <img src="https://picsum.photos/70"/>
                                </span>

                                </div>
                            </ListItemIcon>

                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DonutLarge/>
                            </ListItemIcon>
                            <ListItemText primary="Опросы за деньги"/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }
}


PollCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PollCard);