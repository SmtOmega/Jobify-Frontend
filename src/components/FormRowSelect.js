const FormRowSelect = ({textLabel, name, value, handleChange, list}) => {
  
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {textLabel || name}
      </label>
      <select name={name} value={value} className="form-select" onChange={handleChange}>
        {list.map((jobValue, index) => {
          return <option key={index} >{jobValue}</option>;
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
