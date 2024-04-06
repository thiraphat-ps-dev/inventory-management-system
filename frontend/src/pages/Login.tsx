import React from 'react'
import { styled } from '@mui/system'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const LoginContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: 20,
}))

const LoginForm = styled('form')({
  width: 600,
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',
  borderRadius: 10,
  padding: 20,
})

const LoginTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

type LoginFormValues = {
  username: string
  password: string
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data)
  }

  return (
    <LoginContainer>
      <Grid container justifyContent="center">
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <LoginTextField
            {...register('username')}
            variant="outlined"
            label="Username"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <LoginTextField
            {...register('password')}
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large">
            Login
          </Button>
        </LoginForm>
      </Grid>
    </LoginContainer>
  )
}

export default Login
