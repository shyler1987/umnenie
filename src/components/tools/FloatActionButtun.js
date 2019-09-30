import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import { withRouter } from "react-router";

const styles = theme => ({
    fab:{
        margin: 0,
        top: 'auto',
        right: 'auto',
        bottom: 100,
        left: 'auto',
        position: 'fixed',
        // width:70,
        // height:70
    },
    fabContainer:{
        position:'relative',
        zIndex: 1000
    },
    fabBox:{
        position:'absolute', right: 70
    }
});

class FloatActionButtun extends Component{


    onRouteChange = () =>{
        this.props.history.push('/poll/create');
    }

    render() {
        const {classes} = this.props;
        return(
            <div className={classes.fabContainer}>
                <div className={classes.fabBox}>
                    <Fab onClick={this.onRouteChange} className={classes.fab} color="secondary" size="large"><AddIcon/></Fab>
                </div>
            </div>
        );
    }

}

export  default withStyles(styles)( withRouter(FloatActionButtun));