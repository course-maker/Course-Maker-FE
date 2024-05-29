import SignInputController from "@/components/commons/SignInputController";
import { SubmitHandler, useForm } from "react-hook-form";

export interface SignInFormInputs {
  id: string;
  password: string;
}

const SignInForm = () => {
  const { control, handleSubmit } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = () => {
    // console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignInputController name="id" control={control} />
      <SignInputController name="password" control={control} />
      <button type="submit">로그인</button>
    </form>
  );
};

export default SignInForm;
