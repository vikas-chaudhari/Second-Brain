interface InputProps {
  placeholder: string;
  type: "password" | "text";
  reference: any;
}

const Input = (props: InputProps) => {
  return (
    <input
      className="px-4 py-2 border rounded-md"
      ref={props.reference}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
