function Input({ value, onChange }) {
  return (
    <input
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Check weather in your city"
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
