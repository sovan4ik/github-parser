import React, { Component } from 'react';

export default class Select extends Component {
    state = {
        sortTypes: [
            {
                type: 'stars',
                description: 'Stars (Default)'
            },
            {
                type: 'created',
                description: 'Created'
            },
            {
                type: 'updated',
                description: 'Updated'
            }]
    }
    render() {
        return(
            <div>
            <select 
            value={this.props.sortCurrent}
            className="form-select"
            onChange={(e) => {
                const selected = e.target.value;
                this.props.typeOfSortFunction(selected);   
            }}
            >
                {this.state.sortTypes.map((element, index) => {
                    return <option 
                    key={index} 
                    value={element.type}
                    disabled={this.props.sortCurrent === element.type}
                    >{element.description}</option>                    
                })}
            </select>
            </div>
        )
    }
}
