import React from 'react'

export default function FormContainer({title, children}) {
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}} className="container">
            <div className="card">
                <h5 className="card-header">{title}
                </h5>
                <div className="card-body">
                     {children}
                </div>
            </div>
        </div>
    )
}