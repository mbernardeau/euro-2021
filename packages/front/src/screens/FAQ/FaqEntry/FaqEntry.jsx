import React from 'react'
import PropTypes from 'prop-types'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import './FaqEntry.scss'

const FaqEntry = ({ question, answer }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      {question}
    </AccordionSummary>
    <AccordionDetails>{answer}</AccordionDetails>
  </Accordion>
)

FaqEntry.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.node.isRequired,
}

export default FaqEntry
