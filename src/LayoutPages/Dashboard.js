import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Container from 'react-bootstrap/Container'
import Container from '@material-ui/core/Container';


import TopMenu from '../components/tools/TopMenu'


const styles = theme => ({
    root: {
        //backgroundColor: '#FAFAFA'
    },
});


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <TopMenu/>
            <Container maxWidth="lg">
                {
                    this.props.children // onClickAway={this.handleDrawerClose} onTouchStart={this.handleDrawerClose}
                }
            </Container>
        </div>);
    }

}

export default (withStyles(styles)(withRouter(Dashboard)))