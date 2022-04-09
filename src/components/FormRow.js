const FormRow = ({type, name, value, handleChange, TextLabel}) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {TextLabel || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className="form-input"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow
