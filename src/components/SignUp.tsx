import {FIREBASE_AUTH} from '@/config/firebase';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {ZodType, z} from 'zod';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema: ZodType<FormData> = z
  .object({
    email: z.string().email('Invalid Email'),
    password: z.string().min(4, '4 ~ 10 chars').max(10, '4 ~ 10 chars'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const SignUp = () => {
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
      let res;
      res = await fetch('http://10.0.2.2:3001/create', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.status === 400) throw new Error(data.message);

      res = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        formData.email,
        formData.password,
      );

      console.log('success!');
    } catch (err: any) {
      Alert.alert(err.message);
      setError(err.message);
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
            onChange={async () => {
              await trigger('confirmPassword');
            }}
            onChangeText={async e => {
              onChange(e);
              await trigger('confirmPassword');
            }}
          />
        )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChange={async () => {
              await trigger('password');
            }}
            onChangeText={async e => {
              await trigger('password');
              onChange(e);
            }}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

      <Text>{error}</Text>

      <Button title="Create User" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
