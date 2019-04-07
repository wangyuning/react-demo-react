import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import {actionCreators} from './store'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    Addition,
    Button,

} from './style'

class Header extends Component {

    getListArea() {
        const {list, focused, page, totalPage, onhandleMouseEnter, onhandleMouseLeave, mouseIn, onhandlePageChange} = this.props;
        const pagelist = [];
        const newList = list.toJS();
        const nowPageLength = page === (totalPage - 1) ? (10 * (totalPage - 1) + totalPage % newList.length) : (page + 1) * 10;
        if (newList.length) {
            for (let i = page * 10;i < nowPageLength;i ++) {
                pagelist.push(
                    <SearchInfoItem key={ newList[i] } >{newList[i]}</SearchInfoItem>
                );
            }
        }
        if(focused || mouseIn) {
            return(
                <SearchInfo
                    onMouseEnter={onhandleMouseEnter}
                    onMouseLeave={onhandleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={() => onhandlePageChange(page, totalPage, this.spinIcon)}
                        >
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <div>
                        {pagelist}
                    </div>
                </SearchInfo>
            );
        } else {
            return null;
        }
    }

    render(){
        const {focused, onhandleInputFocus, onhandleInputBlur, list} = this.props
        return (
            <HeaderWrapper>
                <Logo />
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载App</NavItem>
                    <NavItem className="right">
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <NavItem className="right">登录</NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames='slide'
                        >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={()=>onhandleInputFocus(list)}
                                onBlur={onhandleInputBlur}
                            ></NavSearch>
                        </CSSTransition>
                        <i
                            className={focused ? 'focused iconfont searchicon' : 'iconfont searchicon'}
                        >&#xe640;</i>
                        {this.getListArea()}
                    </SearchWrapper>
                    <Addition>
                        <Button className="writing">
                            <i className="iconfont">&#xe601;</i>
                            写文章
                        </Button>
                        <Button className="reg">注册</Button>
                    </Addition>
                </Nav>
            </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // focused: state.get('header').get('focused')
        focused: state.getIn(['header','focused']),
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        totalPage: state.getIn(['header','totalPage']),
        mouseIn: state.getIn(['header','mouseIn'])
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onhandleInputFocus(list) {
            (list.size === 0) && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        onhandleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        onhandleMouseEnter() {
            dispatch(actionCreators.searchInfoMouseEnter());
        },
        onhandleMouseLeave() {
            dispatch(actionCreators.searchInfoMouseLeave());
        },
        onhandlePageChange(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]ig/,'');
            if(originAngle) {
                originAngle = parseInt(originAngle,10);
            }else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
            if(page === (totalPage - 1)) {
                page = 0;
            }
            dispatch(actionCreators.pageChange(page + 1));
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);
