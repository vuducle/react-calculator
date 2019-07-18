import React, { Component } from 'react';

export const ResultPanel = (props) => {
    return <input class={props.className} 
                  placeholder="ReactJS Calculator" 
                  value={props.calcValue} 
            />
}