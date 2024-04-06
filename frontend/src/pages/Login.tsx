import { useEffect } from 'react'
import { styled } from '@mui/system'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

type LoginFormValues = {
  username: string
  password: string
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const LoginContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: 20,
  background: 'linear-gradient(45deg, hsla(210, 70%, 50%, 1) 30%, hsla(210, 70%, 70%, 1) 90%)',
}))

const LoginForm = styled('form')({
  width: 400,
  padding: 40,
  borderRadius: 10,
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
})

const LoginTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(4),
}))

const LoginTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

function Login() {
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { username, password } = data
    login(username, password)
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginTitle variant="h2" align="center">
          Login
        </LoginTitle>
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
        <LoginButton type="submit" variant="contained" color="primary" fullWidth size="large">
          Login
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
