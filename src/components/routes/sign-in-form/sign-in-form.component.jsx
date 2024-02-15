import { useState } from 'react'
import FormInput from '../../form-input/form-input.component'
import Button from '../../button/button.component'
//import { UserContext } from '../../../contexts/user.context'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGoogleRedirect,
} from '../../../utils/firebase/firebase.utils'
import './sign-in-form.styles.scss'
import { getRedirectResult } from 'firebase/auth'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  //const { setCurrentUser } = useContext(UserContext) centralited this in our context

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const logGoogleRedirect = async () => {
    const { user } = await signInWithGoogleRedirect()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      //setCurrentUser(user) centralited this in our context
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid credebtial:Please double-check Email/Pssword')
      }
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            With Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
