import React, {Component} from 'react';

import { withStyles } from '@material-ui/styles';
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

import DonutLarge from '@material-ui/icons/DonutLarge';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles  = theme => ({
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
});

class PollCard extends Component{

    constructor(props){
        super(props)
        const {avatarUrl, fullName, datePoll, imagePoll, contentPoll} = this.props;
        this.state = {
            avatarUrl:avatarUrl,
            fullName:fullName,
            datePoll:datePoll,
            contentPoll:contentPoll,
            imagePoll:imagePoll,
        }
    }


    render() {
        const classes = this.props;
        return(<Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" src={this.state.avatarUrl} className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="Settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={this.state.fullName}
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
                <img style={{ width: '100%'}} src={this.state.imagePoll}  />
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
                            <DonutLarge />
                        </ListItemIcon>
                        <ListItemText primary="Опросы за деньги" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DonutLarge />
                        </ListItemIcon>
                        <ListItemText primary="Опросы за деньги" />
                    </ListItem>
                </List>
            </CardContent>
        </Card>);
    }
}

export default withStyles(styles)(PollCard);