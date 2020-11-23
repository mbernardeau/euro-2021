import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue,
  },
  typography: {
    h1: {
      fontSize: '1.5rem'
    },
    h2: {
      fontSize: '1.25rem'
    },
    h3: {
      fontSize: '1rem'
    },
    h4: {
      fontSize: '0.75rem'
    },
    h5: {
      fontSize: '0.50rem'
    },
    h6: {
      fontSize: '0.25rem'
    }
  },
})

export default theme