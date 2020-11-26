import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { useCreateGroup } from '../../../hooks'
import './CreateGroup.scss'
import CurrencyFormat from './CurrencyFormat'

const CreateGroup = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const createGroup = useCreateGroup()

  const errorMessage =
    name.length > 0 && name.length < 5 ? '5 caractères minimum' : undefined

  const isFormValid = () => name && !errorMessage

  const handleNameChange = (e) => setName(e.target.value)

  const handlePriceChange = (e) => setPrice(e.target.value)

  return (
    <Card className="create-group-card">
      <Typography gutterBottom variant="h1">
        Créer une tribu
      </Typography>
      <br />
      <Typography gutterBottom variant="h3">
        Créez une tribu pour vous confrontez à vos amis, collègues, famille...
      </Typography>
      <br />
      <Typography variant="body2">
        Le prix des tribus est libre. Pour une tribu gratuite, laissez le champ
        &quot;Prix à payer par personne&quot; vide.
      </Typography>

      <CardContent className="create-group-content">
        <FormControl className="create-group-field" error={!!errorMessage}>
          <TextField
            required
            label="Nom de la tribu"
            value={name}
            onChange={handleNameChange}
          />
          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>

        <FormControl className="create-group-field">
          <TextField
            label="Prix à payer par personne"
            value={price}
            onChange={handlePriceChange}
            InputProps={{
              inputComponent: CurrencyFormat,
            }}
          />
        </FormControl>
      </CardContent>

      <CardActions>
        <Button
          disabled={!isFormValid()}
          onClick={async () => {
            await createGroup({ name, price: Number(price) })
            setName('')
            setPrice('')
          }}
          color="primary"
          variant="contained"
        >
          Envoyer la demande
        </Button>
      </CardActions>
    </Card>
  )
}

CreateGroup.propTypes = {}

export default CreateGroup
