import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuth = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={ 0 }
      direction="column"
      alignItems= "center"
      justifyContent= "center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
        <Grid 
            item 
            // direction='row'
            justifyContent='center'
        > 
            <CircularProgress color="warning" />
        </Grid>
    </Grid>
  )
}
