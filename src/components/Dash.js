import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from './tools/PollCard'
import axios from 'axios';

import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


import StackGrid from "react-stack-grid";

const initData = [
    {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:1
    },
    {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:1
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:1
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
    }, {
        imagePoll: "https://www.pwc.co.uk/human-resource-services/assets/images/hero-comms-and-engagement.jpg",
        fullName: "Исидатэ Тайти",
        contentPoll: "Lorem Ipsum Lorem I",
        datePoll: "22.06.2019",
        avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
        typePoll:2
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
    rootContainer: {
        backgroundColor: '#FAFAFA'
    },
    gridList: {
        // width: 500,
        // height: 450,
    },
});

const API_POLLS = "polls/list";


class Dash extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        axios.get(API_POLLS).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Typography variant="h4" fontWeight="fontWeightBold" component="h4">
                    Опрос
                </Typography>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry
                        columnsCount={3}
                        gutter={"10px"}
                    >
                        {initData.map((item, key) => {
                            return (
                                <PollCard
                                    key={key}
                                    imagePoll={item.imagePoll}
                                    fullName={item.fullName}
                                    contentPoll={item.contentPoll}
                                    datePoll={item.datePoll}
                                    avatarUrl={item.avatarUrl}
                                    typePoll={item.typePoll}
                                />
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        );
    }

}

export default withStyles(styles)(Dash);