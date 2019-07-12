import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from './tools/PollCard'

import Container from '@material-ui/core/Container';

const styles  = theme => ({

});

class Dash extends Component{

    render() {
        const {classes} = this.props;
        return (<Container maxWidth="lg">
            <Typography variant="h4" gutterBottom component="h4">
                Опрос
            </Typography>
            <Grid container spacing={5}>
                <Grid item md={4}>
                    <PollCard
                        imagePoll={"https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg"}
                        fullName={"Исидатэ Тайти"}
                        contentPoll={"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"}
                        datePoll={"22.06.2019"}
                        avatarUrl={"https://material-ui.com/static/images/avatar/1.jpg"}
                    />
                </Grid>
                <Grid item md={4}>
                    <PollCard
                        imagePoll={"https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg"}
                        fullName={"Исидатэ Тайти"}
                        contentPoll={"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"}
                        datePoll={"22.06.2019"}
                        avatarUrl={"https://material-ui.com/static/images/avatar/1.jpg"}
                    />
                </Grid>
                <Grid item md={4}>
                    <PollCard
                        imagePoll={"https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg"}
                        fullName={"Исидатэ Тайти"}
                        contentPoll={"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"}
                        datePoll={"22.06.2019"}
                        avatarUrl={"https://material-ui.com/static/images/avatar/1.jpg"}
                    />
                </Grid>


            </Grid>

        </Container>);
    }

}

export default withStyles(styles)(Dash);