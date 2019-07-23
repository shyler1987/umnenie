import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import {Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//import 'bootstrap/dist/css/bootstrap.css';//
import {Button, Form, FormControl} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import logo from '../media/logo.png'
import  AuthDialog from '../components/pages/AuthDialog'
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
        //backgroundColor: '#FAFAFA'
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
        boxShadow: 'none',
        borderBottom: '1px solid',
        backgroundColor: '#ffffff'

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
        paddingBottom: 10
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
                <Navbar bg="white" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            <Link to={"/"}>
                                <img
                                    alt=""
                                    src={logo}
                                    // width="30"
                                    // height="30"
                                    className="d-inline-block align-top"
                                />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Col xs={8}>
                                <Form  inline className={"mr-auto"}>
                                    <Form.Group >

                                        <FormControl type="text" className={"w-100"} placeholder="Поиск" />

                                    </Form.Group>

                                </Form>
                            </Col>
                            <Nav className="ml-auto">
                                <NavDropdown title="Ru" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Ru</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Uz</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#link">
                                    <Image
                                        src="https://material-ui.com/static/images/avatar/1.jpg"
                                        width="30"
                                        height="30" roundedCircle
                                    />
                                    {" "}
                                    Исидатэ Тайти
                                </Nav.Link>

                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                    {
                        this.props.children // onClickAway={this.handleDrawerClose} onTouchStart={this.handleDrawerClose}
                    }

            </div>);
    }

}

export default (withStyles(styles)(withRouter(Profile)))