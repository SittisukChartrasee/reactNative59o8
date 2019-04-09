import React from 'react'
import Ch from './choice'
import Se from './select'
import buttonCard from './buttonCard'

export const Choice = props => <Ch {...props}/>
export const Select = (props, key) => <Se key={key} {...props}/>
export const ButtonCard = props => buttonCard({ ...props })