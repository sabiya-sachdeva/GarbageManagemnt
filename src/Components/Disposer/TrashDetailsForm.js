import React, { useEffect, useState } from "react";
import "./TrashDetailsForm.css";
import axios from "axios";
import DatePickerComponent from "./DatePicker";

const TYPE = {
  STATE: "State",
  PRICE: "Price",
  WEIGHT: "Weight",
};

const DEFAULT_STATE = {
  Plastic: {
    state: false,
    price: 5,
    weight: 0,
  },
  Paper: {
    state: false,
    price: 3,
    weight: 0,
  },
  Glass: {
    state: false,
    price: 8,
    weight: 0,
  },
  Metal: {
    state: false,
    price: 10,
    weight: 0,
  },
  Organic: {
    state: false,
    price: 4,
    weight: 0,
  },
  Steel: {
    state: false,
    price: 12,
    weight: 0,
  },
  Iron: {
    state: false,
    price: 15,
    weight: 0,
  },
};

const DEFAULT_TOTALPRICE = {
  Plastic: 0,
  Paper: 0,
  Glass: 0,
  Metal: 0,
  Organic: 0,
  Steel: 0,
  Iron: 0,
};

const TrashDetailsForm = () => {
  const initialUserState = {
    // name: "",
    contactno: "",
    address: "",
    pincode: "",
    // image:"",
    // email: "",
    pickupdate: null,
    wasteDetails: [DEFAULT_STATE],
    // typeofwaste: [],
  };

  const [user, setUser] = useState(initialUserState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});


  const validate = () => {
    const errors = {};

    //  if (step === 1) {
    //   if (!validateWasteDetails()) {
    //     errors.wasteDetails = "*At least one waste type must be selected.";
    //   }
    //   if (
    //     !user.wasteDetails.some(
    //       (waste) =>
    //         Object.values(waste).some((detail) => detail.state) &&
    //         Object.values(waste).some((detail) => detail.state !== DEFAULT_STATE[Object.keys(waste)[0]].state)
    //     )
    //   ) {
    //     errors.wasteDetails = "*At least one waste type must be selected.";
      //}
    if (step === 2) {
      // Validation for step 2 fields
      if (!imageUrl) {
        errors.image = "*Image upload is required.";
      }
      // Add validations for other step 2 fields here
    } else if (step === 3) {
      // Validation for step 3 fields
      if (!user.pincode) {
        errors.pincode = "*Pincode is required.";
      }
      if (!user.address) {
        errors.address = "*Address is required.";
      }
      if (!user.contactno) {
        errors.contactno = "*Contact number is required.";
      }
      // Add validations for other step 3 fields here
    }
    if (step === 4) {
      // Validation for step 2 fields
    
     
      if (!selectedDate) {
        errors.selectedDate = "*Pickup date is required.";
      }
      
    }

    return errors;
  };
  const handleinput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setUser({ ...user, pickupdate: date });
  };




 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const [waste, setWaste] = useState(DEFAULT_STATE);
  const [totalPrice, setTotalPrice] = useState(DEFAULT_TOTALPRICE);

  // There are 2 ways we can hanlde user State, the one is mentioned below, 2nd one is rather than creating seprate state for waste handling we can manager the user state it self
  useEffect(() => {
    // Use reduce to both filter and map in one step
    const updatedWasteDetails = Object.keys(waste).reduce((acc, item) => {
      if (waste[item].state) {
        // If the item is selected
        acc.push({
          type: item,
          price: waste[item].price,
          weight: waste[item].weight,
        });
      }
      return acc; // Return the accumulated array
    }, []); // Initial value of accumulator is an empty array

    setUser((prevUser) => ({
      ...prevUser,
      wasteDetails: updatedWasteDetails,
    }));
  }, [waste]);

  const handleWasteChange = (type, value, changeson) => {
    console.log("Type:", type);
    console.log("Value:", value);
    console.log("Changes On:", changeson);
    if (changeson === TYPE.STATE) {
      const selectedWaste = Object.entries(waste)
        .filter((key) => key[0] === type)
        .map((item) => item[1]); //[{state: boolean, price: string, weight: string}]
      setWaste((prevState) => ({
        ...prevState,
        [type]: {
          state: value.target.checked,
          price: value.target.checked
            ? selectedWaste[0].price
            : DEFAULT_STATE[type].price,
          weight: value.target.checked
            ? selectedWaste[0].weight
            : DEFAULT_STATE[type].weight,
        },
      }));
    }
    if (changeson === TYPE.PRICE) {
      const selectedWaste = Object.entries(waste)
        .filter((key) => key[0] === type)
        .map((item) => item[1]); //[{state: boolean, price: string, weight: string}]
      setWaste((prevState) => ({
        ...prevState,
        [type]: {
          state: selectedWaste[0].state,
          price: value,
          weight: selectedWaste[0].weight,
        },
      }));
      setTotalPrice((prevPrice) => ({
        ...prevPrice,
        [type]: selectedWaste[0].weight * value,
      }));
    }
    if (changeson === TYPE.WEIGHT) {
      const selectedWaste = Object.entries(waste)
        .filter((key) => key[0] === type)
        .map((item) => item[1]); //[{state: boolean, price: string, weight: string}]
      setWaste((prevState) => ({
        ...prevState,
        [type]: {
          state: selectedWaste[0].state,
          price: selectedWaste[0].price,
          weight: value,
        },
      }));
      setTotalPrice((prevPrice) => ({
        ...prevPrice,
        [type]: selectedWaste[0].price * value,
      }));
    }
  };

  const postdata = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("contactno", user.contactno);
    formData.append("address", user.address);
    formData.append("pincode", user.pincode);
    formData.append("email", user.email);
    formData.append("pickupdate", user.pickupdate);
    // formData.append("typeofwaste", user.typeofwaste.join(","));
    formData.append("image", image);

    formData.append("wasteDetails", JSON.stringify(user.wasteDetails));

    // Code to post data
    try {
      console.log("formData", formData);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:3005/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Assuming the response contains relevant information from the backend
      setUser(initialUserState);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      
      // Call function to post data to the server
      await postdata();
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    const validationErrors = validate();
    console.log("Validation Errors:", validationErrors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Moving to step:", step + 1);
      setStep(step + 1);
    }
    // setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {!isSubmitted ? (
        <div>
          <h3>Ready to Sell Your Trash?</h3>
          <h2 className="fs-title">
            Enter a few details to get a clutter free space!
          </h2>
          <div>
            <form
              noValidate
              autoComplete="off"
              id="msform"
              onSubmit={handleSubmit}
            >
              <ul id="progressbar">
                <li className={step === 1 ? "active" : ""}></li>
                <li className={step === 2 ? "active" : ""}></li>
                <li className={step === 3 ? "active" : ""}></li>
                <li className={step === 4 ? "active" : ""}></li>
              </ul>
              <fieldset style={{ display: step === 1 ? "block" : "none" }}>
                <p className="fs-subtitle">Waste Type</p>
                <div className="waste-types-container">
                  {Object.keys(waste).map((type, index) => (
                    <div className="waste-type-item" key={index}>
                      <div className="checkbox-and-label">
                        <input
                          type="checkbox"
                          id={type}
                          name={type}
                          checked={waste[type].state}
                          onChange={(e) =>
                            handleWasteChange(type, e, TYPE.STATE)
                          }
                        />
                        <br />
                        <label htmlFor={type}>{type}</label>
                        <br />
                        <br />
                      </div>
                      <div className="details-container">
                        <div className="detail">
                          <label
                            htmlFor={`price_${type}`}
                            className="unique_label"
                          >
                            Reg Price($)
                          </label>
                          <br />
                          <input
                            type="number"
                            name={`${type}-price`}
                            value={waste[type].state ? waste[type].price : 0}
                            className="unique_input"
                            onChange={(e) =>
                              handleWasteChange(
                                type,
                                parseFloat(e.target.value) || 0,
                                TYPE.PRICE
                              )
                            }
                            disabled={!waste[type].state}
                          />
                        </div>
                        <div className="detail">
                          <label
                            htmlFor={`weight_${type}`}
                            className="unique_label"
                          >
                            Weight (lbs)
                          </label>
                          <br/>
                          <input
                            type="number"
                            name={`${type}-weight`}
                            value={waste[type].state ? waste[type].weight : 0}
                            className="unique_input"
                            onChange={(e) =>
                              handleWasteChange(
                                type,
                                parseFloat(e.target.value) || 0,
                                TYPE.WEIGHT
                              )
                            }
                            disabled={!waste[type].state}
                          />
                        </div>
                        {waste[type].state && (
                          <p>{`Total: ${new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(totalPrice[type])}`}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <input
                  type="button"
                  name="next"
                  className="action-button"
                  value="Next"
                  onClick={handleNext}
                />
                {/* {errors.wasteDetails && (
    <p className="error-message">{errors.wasteDetails}</p>
  )} */}
              </fieldset>
              <fieldset style={{ display: step === 2 ? "block" : "none" }}>
                <p className="fs-subtitle">Waste Image</p>
                <label htmlFor="file-upload" className="custom-file-upload">
                  Upload
                </label>
                <br />
                <input
                  id="file-upload"
                  type="file"
                  name="image"
                  className="uploadimg"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg"
                />
                {imageUrl && (
                  <div className="imgURL">
                    <img src={imageUrl} alt="Uploaded" />
                  </div>
                )}
                <input
                  type="button"
                  name="previous"
                  className="action-button"
                  value="Previous"
                  onClick={handlePrevious}
                />
                <input
                  type="button"
                  name="next"
                  className="action-button"
                  value="Next"
                  onClick={handleNext}
                />
                {errors.image && (
                  <p className="error-message">{errors.image}</p>
                )}
              </fieldset>
              <fieldset style={{ display: step === 3 ? "block" : "none" }}>
                <p className="fs-subtitle">Pick Up Details</p>

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={user.address}
                  onChange={handleinput}
                  style={{ marginRight: "10px", width: "50%" }}
                />
                
                <br />
                <input
                  type="text"
                  name="pincode"
                  placeholder="PinCode"
                  onChange={handleinput}
                  value={user.pincode}
                  style={{ width: "50%" }}
                />
                 {/* {errors.pincode && (
                  <p className="error-message">{errors.pincode}</p>
                )} */}
                <br />
                <input
                  type="text"
                  name="contactno"
                  placeholder="Contact number"
                  value={user.contactno}
                  onChange={handleinput}
                />
                
                <br />
                <input
                  type="button"
                  name="previous"
                  className="action-button"
                  value="Previous"
                  onClick={handlePrevious}
                />
                <input
                  type="button"
                  name="next"
                  className="action-button"
                  value="Next"
                  onClick={handleNext}
                />
                {errors.pincode && (
                  <p className="error-message">{errors.pincode}</p>
                )}
                 {errors.contactno && (
                  <p className="error-message">{errors.contactno}</p>
                )}
                 {errors.address && (
                  <p className="error-message">{errors.address}</p>
                )}
              </fieldset>
              <fieldset style={{ display: step === 4 ? "block" : "none" }}>
                <p className="fs-subtitle">Pick Up date</p>
                <DatePickerComponent
                  handleDateChange={handleDateChange}
                  selectedDate={selectedDate}
                />
                <br />
                <input
                  type="button"
                  name="previous"
                  className="action-button"
                  value="Previous"
                  onClick={handlePrevious}
                />
                <input
                  type="submit"
                  name="submit"
                  className="submit action-button"
                  onClick={handleSubmit}
                />
                {errors.selectedDate && (
                  <p className="error-message">{errors.selectedDate}</p>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      ) : (
        <div className="confirmation-message">
          <img src="confirmation.gif" alt="Logo" height="300px" />
          <br />
          <h2>Thank You </h2>
          <h5 className="trashdetailsh5">
            For taking a step towards a cleaner environment!
          </h5>
          <p>We'll be in touch with pickup details soon.</p>
        </div>
      )}
    </div>
  );
};

export default TrashDetailsForm;
