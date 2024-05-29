import SignInForm from "@/components/domains/signIn/SignInForm";
import SignLayout from "@/layout/SignLayout/SignLayout";

const SignIpPage = () => {
  return <SignLayout header={"로그인"} form={<SignInForm />} />;
};

export default SignIpPage;
