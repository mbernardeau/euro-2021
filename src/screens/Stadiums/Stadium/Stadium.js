import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

const Stadium = ({ stadium }) => (
  <Card style={styles.card}>
    <CardContent>
      <Typography variant="h6">{stadium.name}</Typography>
      <Typography variant="body1">{stadium.city}</Typography>
    </CardContent>
    {stadium.photo && (
      <CardMedia style={{ height: 200 }} image={stadium.photo.url} title={stadium.name} />
    )}
  </Card>
)

const styles = {
  card: {
    arginTop: 15,
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
