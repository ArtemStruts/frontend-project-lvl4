import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const SignUpSchema = yup.object().shape({
  name: yup.string().min(2, 'От 2 до 20 символов').max(20, 'От 2 до 20 символов').required(),
  password: yup.string().min(6, 'Не менее 6 символов').required(),
});

const Login = () => (
  <div>
    <h1>Авторизация</h1>
    <Formik
      initialValues={{
        name: '',
        password: '',
      }}
      validationSchema={SignUpSchema}
    >
      {({ errors }) => (
        <Form>
          <Field name="name" />
          {errors.name ? (
            <div>{errors.name}</div>
          ) : null}
          <Field name="password" />
          {errors.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button type="submit">Войти</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;
