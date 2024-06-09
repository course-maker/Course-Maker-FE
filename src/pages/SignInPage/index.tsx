import SignLayout from "@/layout/SignLayout";
import SignInForm from "@/components/domains/signIn/SignInForm";
import Oauth from "@/components/domains/signIn/Oauth";

const SignIpPage = () => {
  return <SignLayout header={"로그인"} form={<SignInForm />} oauth={<Oauth />} />;
};

export default SignIpPage;
