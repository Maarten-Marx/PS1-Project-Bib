import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

function Loading() {
    return <div className='loading'>
        <FontAwesomeIcon icon={solid('spinner')} spinPulse size='2xl' />
    </div>
}

export default Loading
