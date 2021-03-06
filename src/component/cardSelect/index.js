import React from 'react'
import Ch from './choice'
import Se from './select'
import buttonCard from './buttonCard'
import selectCard from './selectCard'
import linkCard from './linkCard'

export const Choice = props => <Ch {...props}/>
export const Select = (props, key) => <Se key={key} {...props}/>
export const ButtonCard = props => buttonCard({ ...props })
export const SelectCard = props => selectCard({ ...props })
export const LinkCard = props => linkCard({ ...props })