import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'
import teal from '@material-ui/core/colors/teal'
import cyan from '@material-ui/core/colors/cyan'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: teal,
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
    },
    h2: {
      fontSize: '1.25rem',
    },
    h3: {
      fontSize: '1rem',
    },
    h4: {
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.50rem',
    },
    h6: {
      fontSize: '0.25rem',
    },
  },
})

export default theme
