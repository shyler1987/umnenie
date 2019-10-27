import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from '../tools/PollCard'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import {QRCode} from "react-qr-svg";
import { QRCode } from 'react-qrcode-logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../media/style.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import {Link} from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FloatActionButtun from "../tools/FloatActionButtun";
import MySnackbarContentWrapper from "../tools/MySnackbarContentWrapper";
import Snackbar from '@material-ui/core/Snackbar';
import DocumentMeta from 'react-document-meta';
import {Swipeable} from 'react-swipeable'
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import setTitle from "../../redux/actions/setTitleAction";
import logoQr from '../../media/logo_q.png'
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
    arrowButton: {
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'fixed',
        // paddingRight: 15,
        // paddingLeft: 15
    },
    multlineInput: {
        padding: 10
    },
    noPad: {
        padding: 0
    },
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },
    fixedFormSend: {
        position: 'sticky',
        /* top: 0; */
        bottom: 0,
        left: 0,
    },
    svgRoot: {
        width: '15px',
        height: '15px',
    }, svgRootP: {
        width: '15px',
        height: '15px',
        margin: 5
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    input: {
        display: 'none',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'inherit'
        },
    },
    labelCommentFile: {
        display: 'inline-block',
        marginBottom: 0
    },
    cell: {
        paddingBottom: 20
    },
    dialogConRoot:{
        padding:0
    },
    dialogTitleRoot:{
        padding:"5px 24px"
    },
    textPaddingBottom:{
        paddingBottom: 5
    },
        commentUser:{
            fontWeight: 600,
            fontSize: 14
        },
        disabeNavi:{
            color: 'currentColor',
            cursor: 'not-allowed',
            opacity: '0.5',
            textDecoration: 'none'
        }
}
);
const API_POLLS = "polls/item/?id=";
const API_TXT_COMMENT = "profil/text-comment-to-poll";
const API_PHOTO_COMMENT = "profil/comment-to-poll";
const JALBA = "profil/complaint";

class PollView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: {},
            show: false,
            openSnakbar: false,
            dialogopen: false,
            idPoll: this.props.match.params.id,
            metaDesc:"",
            metaTag:"",
        };
        this.commentAdd = React.createRef();
        this.PollNavigate = this.PollNavigate.bind(this);
        this.fetchPoll = this.fetchPoll.bind(this);
    }

    PollNavigate = (id) => {
        if (id !== null) {
            if(this.props.match.params.username!==undefined){
                this.props.history.push("/polls/"+this.props.match.params.username + "/" + id);
                this.fetchPoll(id);
            }else{
                this.props.history.push("/polls/" + id);
                this.fetchPoll(id);
            }

        }
    }


    handleClose = () => {
        this.setState({
            dialogopen: false,
        })
    }

    dialogOpen = (type) => {
        this.setState({
            dialogopen: true,
            dialogType: type,
        })
    }


    fetchPoll = (id) => {
        let url = API_POLLS + id;
        if(this.props.match.params.username!==undefined){
            url = API_POLLS +  id + "&username="+this.props.match.params.username;
        }
        this.setState({
            show: true
        })
        axios.get(url).then(res => {
            if (res.status === 200) {
                this.setState({
                    polls: res.data.data,
                    metaTag: res.data.data.pollHashtags,
                    metaDesc: res.data.data.pollQuestion
                })
                this.forceUpdate();
            }
            this.setState({
                show: false
            })

        }).catch(err => {
            this.setState({
                show: false
            })
        })
    }


    componentDidMount() {
        this.fetchPoll(this.state.idPoll);
        this.props.setTitle("Просмотр опроса");

    }

    nextPollGet = () => {
        this.PollNavigate(this.state.polls.nextPoll);
    }

    prevPollGet = () => {
        this.PollNavigate(this.state.polls.prevPoll);
    }


    commentAddClick = () => {
        if(this.commentAdd.current===null){
            return;
        }
        this.commentAdd.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }

    showLoadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }

    handleSendPhoto = (e) => {
        this.sendToCommentFile(e.target.files[0]);
    }

    sendToCommentFile = (file) => {
        this.showLoadingBar(true);
        var bodyFormData = new FormData();
        bodyFormData.append('chat_image', file);
        bodyFormData.append('poll_id', this.state.polls.pollId);

        axios.post(
            API_PHOTO_COMMENT,
            bodyFormData
        ).then(res => {
            if (res.status === 202) {
                let polls = this.state.polls;
                polls.comments = res.data.comments;
                this.setState({
                    polls: polls
                })
            }
            this.showLoadingBar(false);
        }).catch(err => {
            console.log(err)
            this.showLoadingBar(false);
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendToCommentText = (e) => {
        axios.post(
            API_TXT_COMMENT,
            {
                poll_id: this.state.polls.pollId,
                text: this.state.textComment
            }
        ).then(res => {
            if (res.status === 202) {
                let polls = this.state.polls;
                polls.comments = res.data.comments;
                this.setState({
                    polls: polls,
                    textComment: ""
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    openSnakbar = (snakbarVariant, snakbarMessage) =>{
        this.setState({
            openSnakbar:true,
            snakbarVariant:snakbarVariant,
            snakbarMessage:snakbarMessage,
        })
    }

    closeSnakbar =() =>{
        this.setState({
            openSnakbar: false,
        })
    }

    onSubmitFormJalba = () => {
        this.showLoadingBar(true)
        axios.post(
            JALBA,
            {
                poll_id: this.state.polls.pollId,
                text: this.state.jalba
            }
        ).then(res => {
            this.showLoadingBar(false)
            if (res.status === 201) {
                this.setState({
                    jalba: "",
                    dialogopen:false,
                })
                this.openSnakbar('success', 'Успешно отправлено');
            }
        }).catch(err => {
            console.log(err)
            this.openSnakbar('error', 'error sent');
            this.showLoadingBar(false)
        })
    }

    onCopied = (text, bo) =>{
        if(bo){
            this.setState({
                dialogopen:false,
            })
            this.openSnakbar('info', 'Ссылка скопирована в буфер обмена');
        }
    }

    clickToClipboard = (txt) => (e) =>{
        e.preventDefault();
        var textField = document.createElement('textarea')
        textField.innerText = 'foo bar baz'
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    render() {
        const {classes} = this.props;
        const comments = this.state.polls.comments;
        const jalba = <React.Fragment>
            <DialogTitle classes={{root:classes.dialogTitleRoot}} id="simple-dialog-title">Жалоба на опрос</DialogTitle>
            <DialogContent>
                <ValidatorForm
                    fullWidth
                    ref="form"
                    onSubmit={this.onSubmitFormJalba}
                >
                    <TextValidator
                        fullWidth
                        classes={{root:classes.textPaddingBottom}}
                        id="outlined-bare"
                        multiline
                        rows={2}
                        placeholder={"..."}
                        name={"jalba"}
                        value={this.state.jalba}
                        onChange={this.handleChange}
                        validators={['required']}
                        errorMessages={['Это поле обязательно к заполнению']}
                        margin="dense"
                        variant="outlined"
                    />

                    <Button
                        disabled={this.state.show}
                        variant="contained" color="secondary" type={"submit"}
                        fullWidth>Отправить жалобу</Button>
                </ValidatorForm>
            </DialogContent>
        </React.Fragment>;
        const QR_CODE = <React.Fragment>
            <DialogContent classes={{root:classes.dialogConRoot}}>
                <QRCode
                    logoImage={logoQr}
                    size={250}
                    logoWidth={80}
                    value={"https://creators.uz"+this.props.match.url} />
            </DialogContent>
        </React.Fragment>;

        const SHARE_LINK = <React.Fragment>
            <DialogContent>
                <TextField
                    id="standard-multiline-flexible"
                    fullWidth
                    name={"text"}
                    ref="input"
                    value={"http://creators.uz"+this.props.match.url}
                    variant="outlined"
                    className={classes.textField}
                    margin={"denses"}
                    InputProps={
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CopyToClipboard onCopy={this.onCopied} text={"http://creators.uz"+this.props.match.url}>
                                    <IconButton  classes={{root: classes.fileSendIcon}}>
                                            <LinkIcon/>
                                        </IconButton>
                                    </CopyToClipboard>
                                </InputAdornment>
                            ),
                        }
                    }

                />
            </DialogContent>
        </React.Fragment>;

        const meta = {
            description: this.state.metaDesc,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: this.state.metaTag
                }
            }
        };
        return (
            <div>
                <DocumentMeta {...meta}/>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title"

                    maxWidth={"xs"}
                    open={this.state.dialogopen}>

                    {this.state.dialogType==='jalba' && jalba }
                    {this.state.dialogType==='qrcode' && QR_CODE}
                    {this.state.dialogType==='share' && SHARE_LINK}
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.openSnakbar}
                    autoHideDuration={6000}
                    onClose={this.closeSnakbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnakbar}
                        variant={this.state.snakbarVariant}
                        message={this.state.snakbarMessage}
                    />
                </Snackbar>
                <FloatActionButtun/>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <div style={{marginTop: 20}}>

                </div>
                {Object.keys(this.state.polls).length !== 0 ?
                    <div>
                        <Grid
                            direction={"row"}
                            container
                            justify={"center"}
                            alignItems={"stretch"}
                            spacing={2}
                        >
                            <Hidden smDown>
                                <Grid item md={1}>
                                    <Link className={this.state.polls.nextPoll===null && classes.disabeNavi} onClick={() => {
                                        this.PollNavigate(this.state.polls.nextPoll)
                                    }}>
                                        <Paper classes={{root: classes.arrowButton}}>
                                            <KeyboardArrowLeft/>
                                        </Paper>
                                    </Link>
                                </Grid>
                            </Hidden>
                            <Grid item md={7} xl={7} sm={12} xs={12}>

                                <Swipeable onSwipedRight={this.nextPollGet} onSwipedLeft={this.prevPollGet}>

                                    <PollCard
                                        idPoll={this.state.polls.pollId}
                                        propsCard={this.props.match.params}
                                        imagePoll={this.state.polls.pollImage}
                                        fullName={this.state.polls.userFIO}
                                        username={this.state.polls.userName}
                                        userId={this.state.polls.userId}
                                        contentPoll={this.state.polls.pollQuestion}
                                        datePoll={this.state.polls.pollEndDate}
                                        avatarUrl={this.state.polls.userImage}
                                        pollType={this.state.polls.pollType}
                                        pollItems={this.state.polls.items}
                                        like={this.state.polls.like}
                                        pollAnswerCount={this.state.polls.pollAnswerCount}
                                        pollLikeCount={this.state.polls.pollLikeCount}
                                        iconFovrite={true}
                                        iconComment={true}
                                        iconShare={true}
                                        iconAnonced={true}
                                        iconStatis={this.state.polls.viewStatistic}
                                        isVouted={this.state.polls.isVouted}
                                        iconEdit={false}
                                        disableCard={this.state.polls.disableCard}
                                        QrCode={true}
                                        answerText={true}
                                        cellHeight={200}
                                        commentClick={this.commentAddClick}
                                        showLoading={this.showLoadingBar}
                                        dialogOpenClick={this.dialogOpen}
                                        clickOtvet={true}
                                        disableClickCard={false}
                                        CrownSvg={this.state.polls.pollCrown}
                                    />
                                </Swipeable>
                            </Grid>
                            <Hidden smDown>
                                <Grid item md={1}>
                                    <Link  className={this.state.polls.prevPoll===null && classes.disabeNavi} onClick={() => {
                                        this.PollNavigate(this.state.polls.prevPoll)
                                    }}>
                                        <Paper classes={{root: classes.arrowButton}}>
                                            <KeyboardArrowRight/>
                                        </Paper>
                                    </Link>
                                </Grid>
                            </Hidden>
                        </Grid>

                        {this.state.polls.pollViewComment ? <Grid
                            direction={"row"}
                            container
                            justify={"center"}
                            alignItems={"stretch"}
                            spacing={2}
                        >

                            <Grid item md={7} xs={12} sm={12}>
                                <Typography classes={{root: classes.titleHead}}>
                                    Комментарии ({comments.count})
                                </Typography>
                                <Paper classes={{root: classes.noPad}}>
                                    {comments.items.map(itemComment => {
                                        let url_User = `/profile/${itemComment.user_name}`;
                                        if(this.props.user.userId!==null && this.props.user.userId===itemComment.user_id){
                                            url_User = '/account/profile';
                                        }
                                        return (<div
                                            className={itemComment.rtl === "left" ? "d-flex justify-content-start itemChat" : "d-flex justify-content-end itemChat"}>
                                            <div className="img_cont_msg">
                                                <Link to={url_User}><img
                                                    src={itemComment.avatar}
                                                    className="rounded-circle user_img_msg"/></Link>
                                            </div>
                                            <div className="msg_cotainer">
                                                {itemComment.user_name !== null && <h5 className={classes.commentUser}>{itemComment.user_name}</h5>}
                                                {itemComment.text !== null ? itemComment.text :
                                                    <img style={{width: '100%'}} src={itemComment.file}/>}
                                                <div className="msg_time">{itemComment.date_cr}</div>
                                            </div>
                                        </div>);
                                    })}

                                    <br/>
                                    <br/>
                                    <br/>
                                    {this.props.isAuthenticated && <Grid
                                        container
                                        justify={"center"}
                                        alignItems={"stretch"}
                                        spacing={2}
                                        classes={{root: classes.fixedFormSend}}
                                    >

                                        <Grid item md={12} xs={12} sm={12}>
                                            <Paper ref={this.commentAdd}>
                                                <ValidatorForm onSubmit={this.sendToCommentText}>
                                                    <Grid
                                                        direction={"row"}
                                                        container
                                                        spacing={2}
                                                        style={{padding: 10}}
                                                    >
                                                        <Grid item md={9} xs={9} sm={9}>
                                                            <TextValidator
                                                                id="standard-multiline-flexible"
                                                                fullWidth
                                                                multiline
                                                                validators={['required']}
                                                                errorMessages={['Это поле обязательно к заполнению']}
                                                                variant="outlined"
                                                                name={"textComment"}
                                                                value={this.state.textComment}
                                                                onChange={this.handleChange}
                                                                className={classes.textField}
                                                                InputProps={
                                                                    {
                                                                        classes: {
                                                                            root: classes.multlineInput
                                                                        },
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <input
                                                                                    accept="image/*"
                                                                                    className={classes.input}
                                                                                    id="contained-button-file"
                                                                                    onChange={this.handleSendPhoto}
                                                                                    type="file"
                                                                                />
                                                                                <label htmlFor="contained-button-file"
                                                                                       className={classes.labelCommentFile}>
                                                                                    <IconButton variant="contained"
                                                                                                component="span"
                                                                                                className={classes.button}>
                                                                                        <SvgIcon viewBox="0 0 16 16"
                                                                                                 classes={{root: classes.svgRoot}}>
                                                                                            <defs>
                                                                                                <clipPath
                                                                                                    id="clip-path-send">
                                                                                                    <rect
                                                                                                        id="brooke-cagle-609873-unsplash"
                                                                                                        width="16"
                                                                                                        height="16"/>
                                                                                                </clipPath>
                                                                                            </defs>
                                                                                            <g id="Mask_Group_28"
                                                                                               data-name="Mask Group 28"
                                                                                               opacity="0.35"
                                                                                               clip-path="url(#clip-path-send)">
                                                                                                <path id="paperclip"
                                                                                                      d="M1.016,9.861,2.2,8.678,7.524,3.353a2.51,2.51,0,0,1,3.55,3.55L5.749,12.229a.558.558,0,0,1-.789-.789l5.325-5.326A1.394,1.394,0,0,0,8.313,4.142L2.987,9.467,1.8,10.65A2.511,2.511,0,1,0,5.355,14.2l.986-.986,5.522-5.522.395-.394A3.626,3.626,0,0,0,7.129,2.17L1.213,8.086A.558.558,0,1,1,.424,7.3L6.341,1.381a4.741,4.741,0,0,1,6.705,6.705L7.129,14l-.987.986A3.626,3.626,0,0,1,1.016,9.861Zm0,0"
                                                                                                      transform="translate(0.785)"/>
                                                                                            </g>
                                                                                        </SvgIcon>
                                                                                    </IconButton>
                                                                                </label>

                                                                            </InputAdornment>
                                                                        ),
                                                                    }
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item md={3} xs={3} sm={3}>
                                                            <Button variant="contained"
                                                                    color="secondary" fullWidth
                                                                    className={classes.sectionDesktop}
                                                                    type={"submit"}
                                                            >
                                                                Отправить
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                fullWidth
                                                                className={classes.sectionMobile}
                                                                type={"submit"}
                                                            >
                                                                <SvgIcon viewBox="0 0 16 16"
                                                                         classes={{root: classes.svgRootP}}>
                                                                    <defs>
                                                                        <clipPath id="clip-path-sendTg">
                                                                            <rect id="brooke-cagle-609873-unsplash"
                                                                                  width="16" height="16"
                                                                                  transform="translate(750 1484)"
                                                                                  fill="#fff"/>
                                                                        </clipPath>
                                                                    </defs>
                                                                    <g id="Mask_Group_27" data-name="Mask Group 27"
                                                                       transform="translate(-750 -1484)"
                                                                       clip-path="url(#clip-path-sendTg)">
                                                                        <g id="paper-plane"
                                                                           transform="translate(750 1484)">
                                                                            <path id="Path_1260" data-name="Path 1260"
                                                                                  d="M15.863.139a.461.461,0,0,0-.508-.1L.277,6.651A.466.466,0,0,0,0,7.05a.458.458,0,0,0,.232.423l5.257,2.981,3.121,5.311a.464.464,0,0,0,.4.229h.027a.461.461,0,0,0,.4-.276L15.962.647A.455.455,0,0,0,15.863.139Zm-2.4,1.736L5.749,9.541,1.488,7.125ZM8.945,14.518,6.4,10.189l7.761-7.709Z"
                                                                                  fill="#fff"/>
                                                                        </g>
                                                                    </g>
                                                                </SvgIcon>
                                                            </Button>

                                                        </Grid>


                                                    </Grid>
                                                </ValidatorForm>
                                            </Paper>
                                        </Grid>

                                    </Grid>}



                                </Paper>


                            </Grid>
                        </Grid> : ""}


                    </div> : ""}


            </div>
        );
    }

}

function mapDispatch(dispatch) {
    return bindActionCreators({setTitle}, dispatch);
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.mainData.isAuthenticated,
        user: state.mainData.user,
    }
}



export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(withRouter(PollView)));