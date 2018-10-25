import React from 'react'

export const Input = ({type, className,id='',name,value,handleChange,validate})=>{
    return(
        <input
            type={type}
            className={className}
            id={id}
            name={name}
            onChange={(e) =>handleChange(e,validate)}
            value={value}
        />
    )
}