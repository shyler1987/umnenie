import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import DashboardLayoutRoute from './layouts/DashboardLayout';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Test from './components/Dash'
import {green, orange, grey} from '@material-ui/core/colors';
import axios from "axios"

const outerTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary:{
            main:"#e35b1e"
        }
    },
});


class App extends Component {
    constructor(props) {
        super(props);


    }
    componentWillMount(){
        axios.defaults.baseURL ="http://umnenie.foundrising.uz/api/";

    }
    render() {
        return (
            <ThemeProvider theme={outerTheme}>
                <Router>
                    <Switch>
                        <DashboardLayoutRoute exact path="/" component={Test}/>
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }

}

export default App;




