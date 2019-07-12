import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import {Link, NavLink} from "react-router-dom";
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';

import Container from '@material-ui/core/Container';

const styles = theme => ({
    appBarBottom: {
        top: 'auto',
        bottom: 0,

    },
    toolbarBottom: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    root: {
        display: 'flex',
        backgroundColor:'#FAFAFA'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow:'none',
        borderBottom:'1px solid',
        backgroundColor:'#ffffff'

    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(1) * 3,
        height: '100vh',
        overflow: 'auto',
        paddingBottom:10
    },

});




class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (<div className={classes.root}>

            <AppBar
                position="absolute"
                className={classNames(classes.appBar, this.props.openBar && classes.appBarShift)}
            >
                <Toolbar>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="primary"
                        noWrap
                        className={classes.title}
                    >
                        UMNENIE
                    </Typography>
                    <Button color="primary">Exit</Button>

                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />


                {
                    this.props.children // onClickAway={this.handleDrawerClose} onTouchStart={this.handleDrawerClose}
                }
                <div className={classes.appBarSpacer} />

            </main>
        </div>);
    }

}
export default (withStyles(styles)(withRouter(Dashboard)))