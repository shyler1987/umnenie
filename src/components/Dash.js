import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from './tools/PollCard'

import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import StackGrid from "react-stack-grid";

const initData = [
    {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg"
    },
];


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        // width: 500,
        // height: 450,
    },
});

class Dash extends Component {

    render() {
        const {classes} = this.props;
        return (<Container maxWidth="lg">
            <Typography variant="h4" gutterBottom component="h4">
                Опрос
            </Typography>
            <StackGrid
                columnWidth={'33.33%'}
            >
                {initData.map((item, key) => {
                    return (
                        <PollCard
                            imagePoll={item.imagePoll}
                            fullName={item.fullName}
                            contentPoll={item.contentPoll}
                            datePoll={item.datePoll}
                            avatarUrl={item.avatarUrl}
                        />
                    );
                })}

            </StackGrid>


            {/*<div className={classes.root}>*/}
                {/*<GridList cellHeight={"auto"} className={classes.gridList} spacing={20} cols={3}>*/}
                    {/*{initData.map((item, key) => {*/}
                        {/*return (*/}
                            {/*<GridListTile key={key}>*/}
                                {/*<PollCard*/}
                                    {/*imagePoll={item.imagePoll}*/}
                                    {/*fullName={item.fullName}*/}
                                    {/*contentPoll={item.contentPoll}*/}
                                    {/*datePoll={item.datePoll}*/}
                                    {/*avatarUrl={item.avatarUrl}*/}
                                {/*/>*/}
                            {/*</GridListTile>*/}
                        {/*);*/}
                    {/*})}*/}
                {/*</GridList>*/}
            {/*</div>*/}


        </Container>);
    }

}

export default withStyles(styles)(Dash);