import { createMuiTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
  },

  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage:
          `url(${process.env.PUBLIC_URL + '/assets/bgimage3.jpg'})`,
          minHeight: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }
      }
    }
  }
})
export default theme