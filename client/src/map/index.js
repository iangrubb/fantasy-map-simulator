import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

const determineMapHeight = store => null
const determineMapWidth = store => null

const msp = () => store => ({width: determineMapWidth(store), height: determineMapHeight(store)})

function Map(props) {
    return (
        <Container>

        </Container>
    )
}

export default connect(msp, null)(Map)

const Container = styled.div`
    width: 100%;
    height: 100%;
`