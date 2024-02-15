import { useState } from 'react'
import FormInput from '../../form-input/form-input.component'
import { UserContext } from '../../../contexts/user.context'
import Button from '../../button/button.component'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../../utils/firebase/firebase.utils'
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displaName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  //const { setCurrentUser } = useContext(UserContext)centralited this in our context

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('password do not match!')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      //setCurrentUser(user)centralited this in our context
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user! "Email" already in use')
      } else {
        //console.error(error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <Button buttonType="inverted" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
