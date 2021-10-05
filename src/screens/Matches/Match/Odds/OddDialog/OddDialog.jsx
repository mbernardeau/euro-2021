import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { Button, DialogActions, IconButton, Typography } from '@mui/material'
import './OddDialog.scss'

const OddDialog = ({ odds, name_teamA, name_teamB }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function FormOddColumn({ odds }) {
    return (
      <>
        {Object.keys(odds)
          .sort((a, b) => {
            return odds[a] - odds[b]
          })
          .map((key) => (
            <Paper className="paper-odd-container">
              <div className="odd-string">{key[1] + '-' + key[2]}</div>
              <div className="odd-value">{odds[key]}</div>
            </Paper>
          ))}
      </>
    )
  }

  // Filter Odds
  let OddA, OddB, OddAutreValue, OddDraw

  const keys = Object.keys(odds)
  const keysLength = keys.length

  for (let i = 0; i < keysLength; i++) {
    const key = keys[i]
    if (key === 'Pautre') {
      OddAutreValue = odds[key]
    } else if (key[2] > key[1]) {
      OddB = { ...OddB, [key]: odds[key] }
    } else if (key[2] === key[1]) {
      OddDraw = { ...OddDraw, [key]: odds[key] }
    } else {
      OddA = { ...OddA, [key]: odds[key] }
    }
  }

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="upload picture"
        onClick={handleClickOpen}
        component="span"
        style={{ padding: 3 }}
        size="large"
      >
        <AddCircleIcon></AddCircleIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title" id="alert-dialog-title">
          <Typography variant="h2">Côte par score exact</Typography>
        </DialogTitle>
        {/*Padding = Fix pour ne pas afficher la scroll bar */}
        <DialogContent style={{ padding: 12 }}>
          <div className="columns-container">
            <div className="columns-box">
              <div className="column-container">
                <Typography variant="h3">{name_teamA}</Typography>
                <FormOddColumn odds={OddA}></FormOddColumn>
              </div>
              <div className="column-container">
                <Typography variant="h3">Match nul</Typography>
                <FormOddColumn odds={OddDraw}></FormOddColumn>
              </div>
              <div className="column-container">
                <Typography variant="h3">{name_teamB}</Typography>
                <FormOddColumn odds={OddB}></FormOddColumn>
              </div>
            </div>
          </div>
          <div className="odd-autre-container">
            <Paper className="paper-odd-container">
              <div className="odd-string">Autre</div>
              <div className="odd-value">{OddAutreValue}</div>
            </Paper>
          </div>
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
  name_teamA: PropTypes.string.isRequired,
  name_teamB: PropTypes.string.isRequired,
}

export default OddDialog
