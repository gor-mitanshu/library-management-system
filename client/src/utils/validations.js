const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const passwordPattern = /^[\w@-]{5,10}$/;
const namePattern = /^[a-zA-Z ]{2,30}$/;
const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// Login
export const loginValidations = (inputValues) => {
     const errors = {};
     let isValid = true;

     // Email validations
     if (("email" in inputValues) && inputValues.email === "") {
          errors.email = "Email is required."
          isValid = false;
     }
     //  else if (!!inputValues.email && !inputValues.email.match(emailPattern)) {
     //      errors.email = "Please enter a valid Email."
     //      isValid = false;
     // }

     // Password validations
     if (('password' in inputValues) && inputValues.password === "") {
          errors.password = "Password is required."
          isValid = false;
     }
     // else if (!!inputValues.password && !inputValues.password.match(passwordPattern)) {
     //      errors.password = "Password should be 5 to 10 characters long and can contain letters, digits, and some special characters"
     //      isValid = false;
     // }

     return { errors, isValid };
}

export const registerValidations = (inputValues) => {
     const errors = {};

     // First Name Validation
     if ('firstName' in inputValues) {
          if (inputValues.firstName === "") {
               errors.firstName = "First name is required.";
          } else if (!namePattern.test(inputValues.firstName)) {
               errors.firstName = "Please enter a valid first name.";
          }
     }

     // Last Name Validation
     if ('lastName' in inputValues) {
          if (inputValues.lastName === "") {
               errors.lastName = "Last name is required.";
          } else if (!namePattern.test(inputValues.lastName)) {
               errors.lastName = "Please enter a valid last name.";
          }
     }

     // Email Validation
     if ('email' in inputValues) {
          if (inputValues.email === "") {
               errors.email = "Email is required.";
          } else if (!emailPattern.test(inputValues.email)) {
               errors.email = "Please enter a valid email address.";
          }
     }

     // Phone Number Validation
     if ('phone' in inputValues) {
          if (inputValues.phone === "") {
               errors.phone = "Phone number is required.";
          } else if (!phonePattern.test(inputValues.phone)) {
               errors.phone = "Please enter a valid 10-digit phone number.";
          }
     }

     // Password Validation
     if ('password' in inputValues) {
          if (inputValues.password === "") {
               errors.password = "Password is required.";
          } else if (inputValues.password.length < 8) {
               errors.password = "Password must be at least 8 characters.";
          } else if (inputValues.password.length > 16) {
               errors.password = "Password must not exceed 16 characters.";
          } else if (!passwordPattern.test(inputValues.password)) {
               errors.password = "Password must contain at least one letter and one digit.";
          }
     }

     // Date of Birth Validation
     if ('dob' in inputValues) {
          if (inputValues.dob === "") {
               errors.dob = "Date of birth is required.";
          } else {
               const birthDate = new Date(inputValues.dob);
               const today = new Date();
               const age = today.getFullYear() - birthDate.getFullYear();
               if (age < 18 || age > 100) {
                    errors.dob = "You must be at least 18 years old.";
               }
          }
     }

     // Gender Validation
     if ('gender' in inputValues) {
          if (inputValues.gender === "") {
               errors.gender = "Gender is required.";
          }
     }

     // Address Validation
     if ('address' in inputValues) {
          if (inputValues.address === "") {
               errors.address = "Address is required.";
          }
     }

     return errors;
};
