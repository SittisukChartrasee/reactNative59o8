import React from 'react'
import Ch from './choice'
import Se from './select'

export const Choice = props => <Ch {...props}/>
export const Select = (props, key) => <Se key={key} {...props}/>