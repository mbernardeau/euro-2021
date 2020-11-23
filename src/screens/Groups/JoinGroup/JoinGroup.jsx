import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'

import GroupApplyStatus from './GroupApplyStatus'

import './JoinGroup.scss'

class JoinGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
    }
  }

  handleSelection = (event) => {
    this.setState({
      code: event.target.value,
    })
  }

  applyInGroup = () => {
    if (this.state.code) {
      this.props.applyInGroup(this.state.code)
      this.setState({ code: '' })
    }
  }

  render() {
    const { code } = this.state

    return (
      <Card className="join-group-card">
        <Typography gutterBottom variant="h1">
          Rejoindre une tribu
        </Typography>
        <br />
        <Typography gutterBottom variant="h3">
          Rejoignez une tribu pour vous confrontez à vos amis, collègues,
          famille...
        </Typography>
        <br />
        <Typography variant="body2">
          Entrez le code qui vous a été fourni par l&apos;administrateur de la
          tribu.
        </Typography>

        <CardContent className="join-group-content">
          <FormControl>
            <TextField
              required
              id="join-group-code"
              label="Code"
              value={code}
              onChange={this.handleSelection}
            />
          </FormControl>
        </CardContent>

        <CardActions>
          <Button
            disabled={!this.state.code}
            onClick={this.applyInGroup}
            color="primary"
            variant="contained"
          >
            Envoyer la demande
          </Button>
        </CardActions>

        <GroupApplyStatus />
      </Card>
    )
  }
}

JoinGroup.propTypes = {
  applyInGroup: PropTypes.func.isRequired,
}

export default JoinGroup
