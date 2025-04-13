import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useRef } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const signupHandler = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !password) {
      return;
    }
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username,
        password,
      }
    );
    if (data) {
      navigate("/signin");
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-md">
        <h1 className="text-3xl text-center text-gray-500">Signup</h1>
        <Input
          reference={usernameRef}
          type="text"
          placeholder="Enter your username"
        />
        <Input
          reference={passwordRef}
          type="password"
          placeholder="Enter your password"
        />

        <Button
          size="md"
          variant="primary"
          text="Signup"
          onClick={signupHandler}
        />
      </div>
    </div>
  );
};

export default Signup;
