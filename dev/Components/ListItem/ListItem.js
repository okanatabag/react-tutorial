import React from 'react';
export function ListItem(props) {
    propTypes: {
        prc: PropTypes.string.isRequired
        name: PropTypes.string.isRequired
        toggleFunc: PropTypes.function.isRequired
        delFunc: PropTypes.function.isRequired
    }
    return (<li><a className="text" href="javascript:void(0)" style={props.prc} onClick={props.toggleFunc}>{props.name}</a>
                <a className="del" href="javascript:void(0)" onClick={props.delFunc}><span>&times;</span></a>
            </li>);
}
