import "./FormInput.css";

const FormInput = ({
  type = "text",
  className = "inputField",
  id,
  name,
  placeholder,
}) => {
  return (
    <div className="formDiv">
      <label htmlFor={id} className="inputLabel">
        {name} :
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default FormInput;
