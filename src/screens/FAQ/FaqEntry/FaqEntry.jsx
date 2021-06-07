import React from 'react'
import PropTypes from 'prop-types'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Typography } from '@material-ui/core'

const FaqEntry = ({ question, answer }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h3">
        <b>{question}</b>
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>{answer}</Typography>
    </AccordionDetails>
  </Accordion>
)

FaqEntry.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.node.isRequired,
}

export default FaqEntry
