import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from '../components/tools/TopMenu'


const styles = theme => ({
    root: {
        //backgroundColor: '#FAFAFA'
    },
});


class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <TopMenu/>

                    {
                        this.props.children // onClickAway={this.handleDrawerClose} onTouchStart={this.handleDrawerClose}
                    }

            </div>);
    }

}

export default (withStyles(styles)(withRouter(Profile)))