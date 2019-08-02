import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import {Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import logo from '../media/logo.png'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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


class Menu extends React.Component {
    constructor(props) {
        super(props);
    }


    render(){
        return (
            <Navbar bg="white" expand="lg">
                <Container>
                    <Link to={"/"}>
                        <Navbar.Brand >

                            <img
                                alt=""
                                src={logo}
                                style={{maxWidth: 200}}
                                className="d-inline-block align-top"
                            />

                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Col md={8}>
                            <Grid container spacing={1} alignItems="flex-end">

                                <Grid item md={2}></Grid>
                                <Grid item md={10}>
                                    <TextField
                                        placeholder={"Поиск"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                            disableUnderline: true,
                                        }}
                                        id="input-with-icon-grid"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Col>
                        <Nav className="ml-auto">
                            {/*<NavDropdown title="Ru" id="basic-nav-dropdown">*/}
                            {/*<NavDropdown.Item href="#action/3.1">Ru</NavDropdown.Item>*/}
                            {/*<NavDropdown.Item href="#action/3.2">Uz</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                            <Link to={"/account/profile/"} className={"nav-link"} style={{fontFamily:'SourceSansProRegular, sans-serif'}}>

                                <Image
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                    width="30"
                                    height="30" roundedCircle
                                />
                                {" "}
                                Исидатэ Тайти

                            </Link>

                        </Nav>



                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default (withStyles(styles)(withRouter(Menu)))