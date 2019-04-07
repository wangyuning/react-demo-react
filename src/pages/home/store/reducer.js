import { fromJS } from 'immutable'
const defaultState = fromJS({
    topicList: [
        {
            id: 1,
            title: '社会热点',
            imageUrl: '',
        },
        {
            id: 2,
            title: '手绘',
            imageUrl: '',
        }
    ]
});

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}