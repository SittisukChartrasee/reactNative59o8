import React from 'react'
import dot from './dotComponent'
import lineotp from './lineotp'
import headSpace from './headSpace'
import Headerotp from './headerotp'

export const HeadSpace = props => headSpace(props)
export const dotComponent = props => dot(props)
export const lineotpComponent = props => lineotp(props)
export const headerotp = props => <Headerotp {...props}/>