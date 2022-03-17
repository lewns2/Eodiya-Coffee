import React from 'react';
import { useForm } from 'react-hook-form';

const Register =(props) =>{
  //폼 만들기 위한 요소
    const { register, handleSubmit, formState: { errors } } = useForm();
    //data 가져오기
    const onSubmit = data => console.log(data);
  console.log(errors);
  
  // register이용해서 아이디란 라벨에 붙은 input 생성, required 필수입력, pattern: 조건 만족, 
  // pattern: /^\S+@\S+$/i
  return (
    <div className='regist Signin'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="아이디" {...register("아이디", {required: true, maxLength: 80})} /> 
      <input type="password" placeholder="비밀번호" {...register("비밀번호", {required: true, minLength: 6, maxLength: 100})} /> <br/>
      <input type="text" placeholder="Email" {...register("Email", {
        required: true,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        }
        })} />
      <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
      <select {...register("Title", { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select> <br/>
       Y/N
      <input {...register("Developer", { required: true })} type="radio" value="Yes" />
      <input {...register("Developer", { required: true })} type="radio" value="No" />

      <input type="submit" />
    </form>
    </div>
  );
}

export default Register;