import Oauth from "@/components/domains/signIn/Oauth";
import SignInForm from "@/components/domains/signIn/SignInForm";
import SignLayout from "@/layout/SignLayout";

const SignIpPage = () => {
  return <SignLayout form={<SignInForm />} oauth={<Oauth />} />;
};

export default SignIpPage;
