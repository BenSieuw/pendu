import React from 'react';
import PropTypes from 'prop-types'

import './Letter.css'

const Letter = ({className, letter, onClick}) => (
    <div className={className} onClick={() => onClick(letter)}>
        {letter}
    </div>
)

export default Letter