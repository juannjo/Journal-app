import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"
import { Link as RouterLink } from "react-router-dom"

import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { useForm } from "../../hooks/useForm"
import { checkingAutentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/Auth/thunks"
import { AuthLayout } from "../layout/Authlayout"

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector( state => state.auth )

  const {formState, email, password, onInputChange} = useForm(formData)

  const isAuthenticating = useMemo( () => status === 'Checking', [status])

  const onSubmit = ( event ) => {
    event.preventDefault()
    dispatch(checkingAutentication())

    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (

    <AuthLayout title="Login">
      <form 
        onSubmit={ onSubmit } 
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>

          <Grid item xs={12}>
            <TextField 
              label='Correo'
              type='email'
              placeholder="correo@gmail.com"
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder="********"
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt:1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled={ isAuthenticating }
                type="submit" 
                variant="contained" 
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled={ isAuthenticating }
                onClick={ onGoogleSignIn } 
                variant="contained" 
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            display={!!errorMessage ? '' : 'none'}
          >
            <Alert severity="error" >{ errorMessage }</Alert>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to="/auth/register" >
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
