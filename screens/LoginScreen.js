import { AuthContext } from '../store/auth-context';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
function LoginScreen() {
  const[isAuthenticating,setIsAuthenticating]=useState(false)
  const authCtx=useContext(AuthContext)
 async function loginHandler({email, password})
  {
    setIsAuthenticating(true);
    try{
      const token= await login(email,password);
      console.log(token)
      authCtx.authenticateToken(token);
    } catch (error)
    {
      console.log(error);
      Alert.alert('Authentication failed','Please check your credentials and try again');
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating)
  {
    return <LoadingOverlay message="Logging in..."></LoadingOverlay>
  }
  return <AuthContent onAuthenticate={loginHandler}isLogin />;
}

export default LoginScreen;