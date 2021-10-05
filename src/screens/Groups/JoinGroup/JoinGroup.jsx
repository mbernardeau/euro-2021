import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { useApplyInGroup } from '../../../hooks/groups'
import './JoinGroup.scss'

const JoinGroup = () => {
  const [code, setCode] = useState('')
  const [applyInGroup] = useApplyInGroup()

  const handleSelection = (event) => setCode(event.target.value)

  const apply = async () => {
    if (code) {
      await applyInGroup(code)
      setCode('')
    }
  }

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
            onChange={handleSelection}
          />
        </FormControl>
      </CardContent>

      <CardActions>
        <Button
          disabled={!code}
          onClick={apply}
          color="primary"
          variant="contained"
        >
          Envoyer la demande
        </Button>
      </CardActions>
    </Card>
  )
}

JoinGroup.propTypes = {}

export default JoinGroup
