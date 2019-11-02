import React from 'react';
import { bindActionCreators } from 'redux';

import { DropTarget } from 'react-dnd'
import * as actions from '../../actions/lists';

import Draging from "./card";

import { connect } from 'react-redux';

const spec = {
    drop(props, monitor, component){
        const { type, list } = props;

        const newList = list.map(item => {
            if(item.id === monitor.getItem().id) {
                item.isDone = (type === 'to')
            }
            return item;
        })

        props.setList(newList);
    },
    hover(props, monitor, component){
    },
    canDrop(props, monitor){
        return true;
    }
}


const collect = (connect, monitor) => {
    return ({
        connectDropTarget: connect.dropTarget()
    })
}

const mapStateToProps = (state) => {
    return {
        list: state.todoList.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DropTarget('type', spec, collect)
class Content extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const list = [
            {id: '标题1', title: '标题1', content: '我是第一个任务', isDone: true},
            {id: '标题2', title: '标题2', content: '我是第二个任务', isDone: true},
            {id: '标题3', title: '标题3', content: '我是第三个任务', isDone: true},
            {id: '标题4', title: '标题4', content: '我是第四个任务', isDone: true},
            {id: '标题5', title: '标题5', content: '我是第五个任务', isDone: true},
        ];

        this.props.setList(list);
    }

    handleExchange = (hoverIndex, dragIndex, type) => {
        const list = JSON.parse(JSON.stringify(this.props.list));

        const temp = list[hoverIndex];
        list[hoverIndex] = list[dragIndex];
        list[hoverIndex].isDone = (type === 'from' ? false : true);

        list[dragIndex] = temp;

        this.props.setList(list);
    }

    render() {
        const { type, list } = this.props;

        return (
            <div
                className="content"
                ref={this.props.connectDropTarget}
                style={{ overflow: 'hidden', width: '100%', height: '100%'}}
            >
                {
                    type === "from"
                        ? (
                            list && list.map((item, index) => {
                                if(item.isDone === false) {
                                    return (
                                        <Draging
                                            key={item.id}
                                            type={type}
                                            item={item}
                                            index={index}
                                            handleExchange={this.handleExchange}
                                        />
                                    )
                                }
                            })
                        )
                        : (
                            list && list.map((item, index) => {
                                if(item.isDone === true) {
                                    return (
                                        <Draging
                                            item={item}
                                            type={type}
                                            key={item.id}
                                            index={index}
                                            handleExchange={this.handleExchange}
                                        />
                                    )
                                }
                            })
                        )
                }
            </div>
        )
    }
}

export default Content