import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';

import './card.css';

const spec = {
	beginDrag(props, monitor, component) {
		return {
		    id: props.item.id,
            index: props.index
		}
	},

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return
        }
    },
 
	canDrag(props, monitor) {
        return true;
	},

    isDragging(props, monitor) {
	    return (props.item.id === monitor.getItem().id)
    }
}
 
const collect = (connect, monitor) => {
    return ({
        // 这里返回一个对象，会将对象的属性都赋到组件的 props 中去。这些属性需要自己定义。
        connectDropSource: connect.dragSource(),
        items: monitor.getItem(),
        isDragging: monitor.isDragging()
    });
}

const targetSpec = {
    hover: (props, monitor, component) => {
        if(!component) {
            return null
        }

        if(monitor.getItem().id === props.item.id) {
            return null
        }

        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        const clientOffset = monitor.getClientOffset();
        const componentRect = findDOMNode(component).getBoundingClientRect();

        const middleY = (componentRect.bottom + componentRect.top) / 2;

        if(dragIndex > hoverIndex && clientOffset.y > middleY) {
            return null
        }

        if(dragIndex < hoverIndex && clientOffset.y < middleY) {
            return null
        }

        props.handleExchange(hoverIndex, dragIndex, props.type);

        monitor.getItem().index = hoverIndex;
    }
}

const targetCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

@DragSource('type', spec, collect)
@DropTarget('type', targetSpec, targetCollect)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.elementRef = React.createRef();
    }

    render() {
        const { item, connectDropSource, connectDropTarget, isDragging } = this.props;
        connectDropSource(this.elementRef);
        connectDropTarget(this.elementRef);

        return (
          <div className="card" ref={this.elementRef} style={{opacity: isDragging ? 0 : 1}}>
              {item.content}
          </div>
        )
  }
}

export default App;