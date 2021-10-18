import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { memo } from 'react'

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

export default memo(FaqEntry)
