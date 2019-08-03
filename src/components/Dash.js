import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from './tools/PollCard'
import axios from 'axios';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import FloatActionButtun from "./tools/FloatActionButtun";


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
    titleHead:{
    fontWeight: 600,
    fontSize:30,
    margin: '25px 5px 10px 0px'
}
});

const API_POLLS = "polls/list";


class Dash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls:[],
            show:false
        };
    }


    componentDidMount() {
        this.setState({
            show:true
        })
        axios.get(API_POLLS).then(res => {
            if(res.status===200 && res.data.count>0){

                this.setState({
                    polls:res.data.result

                })
            }
            this.setState({
                show:false
            })

        }).catch(err => {
            this.setState({
                show:false
            })
            console.log(err);
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <FloatActionButtun/>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Typography classes={{root:classes.titleHead} }>
                    Опрос
                </Typography>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry
                        columnsCount={3}
                        gutter={"10px"}
                        gutterTop={"0px"}
                    >
                        {this.state.polls.map((item, key) => {
                            return (
                                <PollCard
                                    key={key}
                                    idPoll={item.pollId}
                                    imagePoll={item.pollImage}
                                    fullName={item.userName}
                                    contentPoll={item.pollQuestion}
                                    datePoll={item.pollEndDate}
                                    avatarUrl={item.userImage}
                                    pollType={item.pollType}
                                    pollItems={item.items}
                                    iconFovrite={true}
                                    CrownSvg={true}
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