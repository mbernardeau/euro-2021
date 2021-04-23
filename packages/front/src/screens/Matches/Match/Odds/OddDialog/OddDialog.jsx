import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import {
  Button,
  DialogActions,
  IconButton,
  Typography,
} from '@material-ui/core'
import './OddDialog.scss'

const OddDialog = ({ odds }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function FormRow({ odds }) {
    return (
      <>
        {Object.keys(odds)
          .sort()
          .map((key) => (
            <Grid key={key} item xs={4}>
              <Paper className="paper-odd-container">
                <div className="odd-string">
                  {key === 'Pautre' ? 'Autre' : key[1] + '-' + key[2]}
                </div>
                <div className="odd-value">{odds[key]}</div>
              </Paper>
            </Grid>
          ))}
      </>
    )
  }

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="upload picture"
        onClick={handleClickOpen}
        component="span"
        style={{ padding: 3 }}
      >
        <AddCircleIcon></AddCircleIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title" id="alert-dialog-title">
          <Typography variant="h2">Côte par score exact</Typography>
        </DialogTitle>
        {/*Padding = Fix pour ne pas afficher la scroll bar */}
        <DialogContent style={{ padding: 12 }}>
          <Grid container item xs={12} spacing={3}>
            <FormRow odds={odds}></FormRow>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

OddDialog.propTypes = {
  odds: PropTypes.exact({
    P00: PropTypes.number.isRequired,
    P01: PropTypes.number.isRequired,
    P02: PropTypes.number.isRequired,
    P03: PropTypes.number.isRequired,
    P04: PropTypes.number.isRequired,
    P05: PropTypes.number.isRequired,
    P06: PropTypes.number.isRequired,
    P10: PropTypes.number.isRequired,
    P11: PropTypes.number.isRequired,
    P12: PropTypes.number.isRequired,
    P13: PropTypes.number.isRequired,
    P14: PropTypes.number.isRequired,
    P15: PropTypes.number.isRequired,
    P20: PropTypes.number.isRequired,
    P21: PropTypes.number.isRequired,
    P22: PropTypes.number.isRequired,
    P23: PropTypes.number.isRequired,
    P24: PropTypes.number.isRequired,
    P30: PropTypes.number.isRequired,
    P31: PropTypes.number.isRequired,
    P32: PropTypes.number.isRequired,
    P33: PropTypes.number.isRequired,
    P40: PropTypes.number.isRequired,
    P41: PropTypes.number.isRequired,
    P42: PropTypes.number.isRequired,
    P50: PropTypes.number.isRequired,
    P51: PropTypes.number.isRequired,
    P60: PropTypes.number.isRequired,
    Pautre: PropTypes.number.isRequired,
  }),
}

export default OddDialog
