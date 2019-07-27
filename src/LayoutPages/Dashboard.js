import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import  AuthDialog from '../components/pages/AuthDialog'
import MenuBar from './Menu';



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
        console.log(classes);
        return (
            <div className={classes.root}>
                <AuthDialog dialogBool={false}/>
                <MenuBar/>
            <Container>
                {
                    this.props.children // onClickAway={this.handleDrawerClose} onTouchStart={this.handleDrawerClose}
                }
            </Container>
        </div>);
    }

}

export default (withStyles(styles)(withRouter(Dashboard)))