import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import './FaqEntry.scss'

const FaqEntry = ({ question, answer }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className="faqentry-question">{question}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography className="faqentry-answer">{answer}</Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

FaqEntry.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.node.isRequired,
}

export default FaqEntry
