import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
function SignupScreen() {
  const[isAuthenticating,setIsAuthenticating]=useState(false)
  const AuthCtx=useContext(AuthContext)
 async function signupHandler({email, password})
  {
    setIsAuthenticating(true);
    try{
    const token=await createUser(email,password);
    AuthCtx.authenticateToken(token);
    }
    catch (error)
    {
      console.log(error);
      Alert.alert('Authentication failed','Please check your credentials and try again');
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating)
  {
    return <LoadingOverlay message="Creating User"></LoadingOverlay>
  }
  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;