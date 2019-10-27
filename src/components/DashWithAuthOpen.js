import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from './tools/PollCard'
import axios from 'axios';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import FloatActionButtun from "./tools/FloatActionButtun";
import InfiniteScroll from 'react-infinite-scroll-component';
import {bindActionCreators} from "redux";
import setTitle from "../redux/actions/setTitleAction";
import {connect} from "react-redux";
import setIsAuth from "../redux/actions/setIsAuth";


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
const API_POLLS_SEARCH = "polls/search?search=";


class DashWithAuthOpen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls:[],
            show:false,
            previous:null,
            next:null,
            count:0,
            hasMore:true
        };
        this.props.setIsAuth(true);
    }

    fetchDataPollsScroll = (url) =>{
        this.setState({
            show:true
        })
        axios.get(url).then(res => {
            if(res.status===200 && res.data.count>0){
                let polls = this.state.polls;
                polls.push(...res.data.result);
                this.setState({
                    polls:polls,
                    next:res.data.next,
                    hasMore:res.data.next!==null? true : false
                })
            }
            if(res.status===204){
                this.setState({
                    polls:[],
                    hasMore:false
                })
            }
            this.setState({
                show:false
            })

        }).catch(err => {
            this.setState({
                show:false,
                hasMore:false
            })
        })
    }


    componentDidMount() {
        if(this.props.match.params.search!==undefined){
            this.setState({polls:[]})
            this.props.setTitle("Поиск опросов");
            this.fetchDataPollsScroll(API_POLLS_SEARCH+this.props.match.params.search);
            return;
        }
        this.fetchDataPollsScroll(API_POLLS);
        this.props.setTitle("Главная");

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.match.params.search!==undefined){
            this.setState({polls:[]})
            this.fetchDataPollsScroll(API_POLLS_SEARCH+nextProps.match.params.search);
        }
    }

    fetchData = ()=>{
        this.fetchDataPollsScroll(this.state.next);
    }

    refresh = ()=>{
        this.fetchDataPollsScroll(API_POLLS);
    }
    showLoadingBar = (bool) =>{
        this.setState({
            show:bool
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
                {this.state.polls.length===0 && !this.state.show && <h2>Ничего не найдено</h2>}
                <InfiniteScroll
                    dataLength={this.state.polls.length}
                    next={this.fetchData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Загрузка...</h4>}
                    // endMessage={
                    //     <p style={{textAlign: 'center'}}>
                    //         <b>Ура! Вы видели все это</b>
                    //     </p>
                    // }
                    // below props only if you need pull down functionality
                    // refreshFunction={this.refresh}
                    // pullDownToRefresh
                    // pullDownToRefreshContent={
                    //     <h3 style={{textAlign: 'center'}}>&#8595; Потяните вниз, чтобы обновить</h3>
                    // }
                    // releaseToRefreshContent={
                    //     <h3 style={{textAlign: 'center'}}>&#8593; Обновить</h3>
                    // }
                >
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
                                        userId={item.userId}
                                        propsCard={this.props.match.params}
                                        idPoll={item.pollId}
                                        imagePoll={item.pollImage}
                                        pollLikeCount={item.pollLikeCount}
                                        pollAnswerCount={item.pollAnswerCount}
                                        fullName={item.userFIO}
                                        username={item.userName}
                                        contentPoll={item.pollQuestion}
                                        datePoll={item.pollEndDate}
                                        avatarUrl={item.userImage}
                                        pollType={item.pollType}
                                        pollItems={item.items}
                                        CrownSvg={item.pollCrown}
                                        disableCard={item.disableCard}
                                        iconEdit={false}
                                        like={item.like}
                                        iconFovrite={true}
                                        clickOtvet={false}
                                        disableClickCard={true}
                                        showLoading={this.showLoadingBar}
                                        isVouted={item.isVouted}
                                    />
                                );
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll>




            </div>
        );
    }

}
function mapDispatch(dispatch) {
    return bindActionCreators({setTitle, setIsAuth}, dispatch);
}

function mapStateToProps(state) {
    return {
    };

}
export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(DashWithAuthOpen));