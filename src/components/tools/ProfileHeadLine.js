import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { withRouter } from 'react-router';
import Hidden from '@material-ui/core/Hidden';
import FaceSvg from '../../media/icons/facebook.svg';
import TelegramSvg from '../../media/icons/telegram.svg';
import InstagramSvg from '../../media/icons/instagram.svg';
import WebSvg from '../../media/icons/web.svg';


const styles = theme => ({
    button: {
        margin: '15px 5px 15px',
        [theme.breakpoints.down('md')]: {
            margin: '5px 5px 5px',
        }
    },
    socialIcons: {
        display: 'inline',
        margin: '0px 15px 0px',
        "& img": {
            margin: '0px 10px 0px',
            width: 20,
            height: 20
        },
        [theme.breakpoints.down('md')]: {
            display: 'block',
            margin: '10px 0px 10px',
            "& img": {
                margin: '0px 10px 0px',
                width: 20,
                height: 20
            },
        }
    },
    timelineSocial: {
        background: "#fff",
        position: 'relative',
    },


});

class ProfileHeadLine extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.timelineSocial}>

            <Container>

                            <Grid
                                direction={"row"}
                                container
                            >
                                <Hidden smUp>
                                    <Grid item md={12} sm={12} xs={12} style={{textAlign: 'center'}}>
                                        <div className={classes.socialIcons}>
                                            <a href={"#"}><img src={WebSvg}/></a>
                                            <a href={"#"}><img src={TelegramSvg}/></a>
                                            <a href={"#"}><img src={FaceSvg}/></a>
                                            <a href={"#"}><img src={InstagramSvg}/></a>

                                        </div>
                                    </Grid>
                                </Hidden>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Hidden mdDown>
                                        <div className={classes.socialIcons}>
                                            <a href={"#"}><img src={WebSvg}/></a>
                                            <a href={"#"}><img src={TelegramSvg}/></a>
                                            <a href={"#"}><img src={FaceSvg}/></a>
                                            <a href={"#"}><img src={InstagramSvg}/></a>

                                        </div>
                                    </Hidden>

                                    <Button variant="contained" size="meduim"  color="secondary" onClick={()=>{this.props.history.push('/account/profile-edit/')}}>
                                        Редактировать профиль
                                    </Button>
                                    <Button variant="contained" size="meduim"  color="secondary" >
                                        Заблокировать
                                    </Button>

                                    <Button variant="contained" size="meduim" color="secondary" >
                                        Написать
                                    </Button>
                                    <Button variant="contained" size="meduim" color="secondary" >
                                        Подписаться
                                    </Button>
                                </Grid>

                            </Grid>
                </Container>
                </div>

            </div>
        );
    }

}

export default withStyles(styles)(withRouter(ProfileHeadLine));