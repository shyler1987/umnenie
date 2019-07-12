import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import DashboardLayoutRoute from './layouts/DashboardLayout';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Test from './components/Dash'
import {green, orange, grey} from '@material-ui/core/colors';

const outerTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
    },
});


class App extends Component {
    constructor(props) {
        super(props);

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




