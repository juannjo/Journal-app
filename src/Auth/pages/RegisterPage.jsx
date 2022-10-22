import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/Authlayout"
import { useForm } from '../../hooks'
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkingAutentication, startCreatingUserWithEmailPassword } from "../../store/Auth/thunks"
 
const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [formSubmit, setFormSubmit] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo( () => status === 'Checking', [status])
   
  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid 
  } = useForm( formData, formValidations )

  const onSubmit = ( event ) => { 
    event.preventDefault()
    dispatch(checkingAutentication())
    setFormSubmit(true)
    if(!isFormValid) return

    dispatch(startCreatingUserWithEmailPassword(formState))
  }


  return (
    <AuthLayout title="Crear Cuenta">
      <form 
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"  
      >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label='Nombre Completo'
              type='text'
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmit }
              helperText={ displayNameValid }
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label='Correo'
              type='email'
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmit }
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder="********"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmit}
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt:1 }}>
            <Grid item xs={ 12 }>
              <Button 
                disabled={ isCheckingAuthentication }
                variant="contained" 
                fullWidth
                type="submit"
              >
                Crear Cuenta
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
            <Link component={ RouterLink } color='inherit' to="/auth/login" >
              ¿Ya tienes una?
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
