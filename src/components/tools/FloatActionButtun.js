import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import { withRouter } from "react-router";
import {bindActionCreators} from "redux";
import setIsAuth from "../../redux/actions/setIsAuth";
import {connect} from "react-redux";

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
        if(this.props.isAuthenticated){
            this.props.history.push('/poll/create');
        }else{
            this.props.setIsAuth(true);
        }
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


function mapStateToProps(state) {
    return {
        isAuthenticated: state.mainData.isAuthenticated,
        user: state.mainData.user,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({setIsAuth}, dispatch)
}


export  default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)( withRouter(FloatActionButtun)));