import React from 'react';
import { useForm } from 'react-hook-form';

const Register =(props) =>{
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>닉네임
        <input {...register("user_nickname", { required: true, maxLength: 20 })} />
      </label>
      <br/>
      <label>이메일
        <input {...register("user_email", { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
      </label>
      <br/>
      <label>비밀번호
        <input {...register("password", { maxLength: 20 })} />
      </label>
      <br/>
      <label>생일
        <input {...register("birthday", { maxLength: 20 })} />
      </label>
      <br/>
      <label>남
        <input {...register("gender", {  })} type="radio" value="male" />
      </label>
      <label>여
        <input {...register("gender", {  })} type="radio" value="female" />
      </label>
      <br/>
      <input type="submit" />
    </form>
  );
}

export default Register;