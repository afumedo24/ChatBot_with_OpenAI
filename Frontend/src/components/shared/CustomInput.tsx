import { InputLabel, TextField } from '@mui/material'
import React from 'react'

type Props = {
    name: string,
    type: string,
    label: string,
}

export default function CustomInput(props: Props) {
  return (
    <TextField margin='normal' name={props.name} label={props.label} type={props.type} /> // slotProps look at min 2:58:17
  )
}
