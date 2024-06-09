import SignLayout from "@/layout/SignLayout";
import SignUpForm from "@/components/domains/signUp/SignUpForm";

const SignUpPage = () => {
  return <SignLayout header={"회원가입"} form={<SignUpForm />} />;
};

export default SignUpPage;
