const nameValidation = (fieldName, fieldValue) => {
    if (/[^a-zA-Z .-]/.test(fieldValue)) {
      return 'Invalid characters';
    }
    return null;
  };

  const VehicleNumber = (fieldValue) => {
    if (/[^A-Z0-9]/.test(fieldValue)) {
      return 'Invalid characters';
    }
    if (fieldValue.trim().length > 13) {
      return `Vehicle Number is Invalid`;
    }
    return null;
  };

  const mobileNo = (fieldValue) => {
    if (/[^0-9]/.test(fieldValue)) {
      return 'Invalid characters';
    }
    return null;
  };

  function ValidateEmail(mail) 
  { if (mail.trim() === '') {
    return null;
    }
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
      return (null)
    }
    return "You have entered an invalid email address!" 
  }
  

const validate={
    name: a => nameValidation('Name', a),
    Name: a => nameValidation('Name', a),
    number: VehicleNumber,
    mobileNo,
    ContactNumber:mobileNo,
    email:ValidateEmail
}  

export default validate;