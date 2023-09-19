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
          <Button
            title="Go to signup view => "
            onPress={() => setLogin(!login)}></Button>
        </>
      ) : (
        <>
          <SignUp />
          <Button
            title="Go to login view => "
            onPress={() => setLogin(!login)}></Button>
        </>
      )}
    </>
  );
};
