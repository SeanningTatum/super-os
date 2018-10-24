import React, {Fragment} from 'react'
import styled from 'styled-components'

import securePage from '../../hocs/securePage'

const dashboard = ({loggedUser}) => <h5>Active Todos</h5>

export default securePage(dashboard)
