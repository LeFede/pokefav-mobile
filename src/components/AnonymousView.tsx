import {LogIn, SignUp} from '@/components';
import {useState} from 'react';
import {Button} from 'react-native';

export const AnonymousView = () => {
  const [login, setLogin] = useState(false);

  return (
    <>
      {login ? (
        <>
          <LogIn />
          <Button title="sign up" onPress={() => setLogin(!login)}></Button>
        </>
      ) : (
        <>
          <SignUp />
          <Button title="login" onPress={() => setLogin(!login)}></Button>
        </>
      )}
    </>
  );
};
