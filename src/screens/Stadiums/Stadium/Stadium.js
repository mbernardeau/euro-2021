import React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Stadium = ({ stadium }) => (
  <Card style={styles.card}>
    <CardContent>
      <Typography variant="h6">{stadium.name}</Typography>
      <Typography variant="body1">{stadium.city}</Typography>
    </CardContent>
    {stadium.photo && (
      <CardMedia
        style={{ height: 200 }}
        image={stadium.photo.url}
        title={stadium.name}
      />
    )}
  </Card>
)

const styles = {
  card: {
    marginTop: 15,
    marginBottom: 15,
    width: 400,
  },
}

Stadium.propTypes = {
  stadium: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      url: PropTypes.string.isRequired,
      credit: PropTypes.string,
    }),
  }),
}

export default Stadium
