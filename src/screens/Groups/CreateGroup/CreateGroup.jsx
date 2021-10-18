import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { useCreateGroup } from '../../../hooks/groups'
import './CreateGroup.scss'
import CurrencyFormat from './CurrencyFormat'

const CreateGroup = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [percent, setPercent] = useState('50')
  const createGroup = useCreateGroup()

  const errorMessage =
    name.length > 0 && name.length < 5 ? '5 caractères minimum' : undefined

  const isFormValid = () => name && !errorMessage

  const handleNameChange = (e) => setName(e.target.value)

  const handlePriceChange = (e) => setPrice(e.target.value)

  const handlePercentChange = (e) => setPercent(e.target.value)

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
        Le prix d'inscription aux tribus est libre. Pour une tribu gratuite,
        laissez le champ &quot;Prix à payer par personne&quot; vide. Le
        pourcentage rétribué à PAM doit être entre 20% et 80%. Le reste est
        partagé entre les vainqueurs du concours.
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

        <FormControl className="create-group-field">
          <TextField
            type="number"
            disabled={price <= 0}
            label="Pourcentage réattribué à l'association PAM"
            value={percent}
            onChange={handlePercentChange}
            InputProps={{
              inputProps: {
                max: 80,
                min: 20,
              },
            }}
          />
        </FormControl>
      </CardContent>

      <CardActions>
        <Button
          disabled={!isFormValid()}
          onClick={async () => {
            await createGroup({
              name,
              price: Number(price),
              percent: Number(percent),
            })
            setName('')
            setPrice('')
            setPercent('50')
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
