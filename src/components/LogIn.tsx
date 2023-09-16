import {FIREBASE_AUTH} from '@/config/firebase';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, View} from 'react-native';
import {ZodType, z} from 'zod';

interface FormData {
  email: string;
  password: string;
}

const schema: ZodType<FormData> = z.object({
  email: z.string().email('Invalid Email'),
  password: z.string().min(4, '4 ~ 10 chars').max(10, '4 ~ 10 chars'),
});

export const LogIn = () => {
  const {
    // register,
    handleSubmit,
    formState: {errors},
    // reset,
    trigger,
    control,
  } = useForm<FormData>({resolver: zodResolver(schema), mode: 'onChange'});

  const [error, setError] = useState('');

  const onSubmit = async (formData: FormData) => {
    try {
      const res = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        formData.email,
        formData.password,
      );
    } catch (err: any) {
      if (err.message.includes('auth/invalid-login-credentials'))
        return setError('Invalid login credentials');
    }
  };

  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            value={value}
            secureTextEntry={true}
            onChangeText={onChange}
          />
        )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Text>{error}</Text>

      <Button title="Log In" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
