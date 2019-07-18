import React, { Component } from 'react';


const Button = (props)  => {
    return <input type="button" 
                class={props.className} 
                onClick={props.onClick} 
                onKeyDown={props.onKeyDown}
                value={props.value}
                tabindex="-1"
            />
}

export default Button;