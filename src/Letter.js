import React from 'react';
import PropTypes from 'prop-types'

import './Letter.css'

const Letter = ({className, letter, onClick}) => (
    <div className={className} onClick={() => onClick(letter)}>
        {letter}
    </div>
)

Letter.propTypes = {
    className: PropTypes.oneOf([
        'letter',
        'letter used-letter',
    ]).isRequired,
    letter: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Letter