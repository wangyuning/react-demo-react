import React, { Component } from 'react';
import icon from '../../../statics/icon.png';
import { connect } from 'react-redux';
import {
    TopicWrapper,
    TopicItem,
} from '../style';


class Topic extends Component {
    render() {
        const {topicList} = this.props;
        return (
            <TopicWrapper>
                {
                    topicList.map(item => {
                        return (
                            <TopicItem key={item.get('id')}>
                                {item.get('title')}
                                <img className="topic-pic" src={icon} alt=""/>
                            </TopicItem>
                        )
                    })
                }
            </TopicWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topicList: state.getIn(['home','topicList'])
    }
};

export default connect(mapStateToProps,null)(Topic);