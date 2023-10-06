import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleAddressChange for example
   */
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [error, setError] = React.useState(undefined);
  const [address, setAddress] = React.useState("");
  const [verifiedAddress, setVerifiedAddress] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState("");

  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleVerifiedAddressChange = (e) => setSelectedAddress(e.target.value);
  
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const googleAddressValidationAPIKey = "AIzaSyDiLoaAqYydiF-d5A7kuL-H5V_0jc6K-V4";
     /** TODO: Verify address using Google's Address Verification API
     * - Example URL of API: https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDiLoaAqYydiF-d5A7kuL-H5V_0jc6K-V4
     * - Create an object with these properties { city, houseNumber, postcode, street, lat, lon } and set the corresponding values using the response data
     * - Pass this object to transformAddress() and set the result to the verified address state
     * - If any of the necessary address components in the response are missing, do not show any results and ask the customer to enter a more complete address 
     * - Handle errors if they occur
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    addAddress({ ...verifiedAddress, firstName, lastName });
  };

  return (
    <main>
      <Section>
        <h1>
         My Address Book
          <br />
          <br />
          <small>
            🇨🇦 Enter a Canadian mailing address in the field below
            <br />
            <br />
            ✅ Once verified, you will be able to name it and save it
          </small>
        </h1>
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <form onSubmit={handleAddressSubmit}>
          <fieldset>
            <legend>🏠 Find an address</legend>
            <div className="form-row">
              <InputText
                name="canadianAddress"
                onChange={handleAddressChange}
                placeholder="Complete mailing address"
                value={address}
              />
            </div>
            <Button type="submit">Find</Button>
          </fieldset>
        </form>
        {verifiedAddress && (
          <Radio
            name="verifiedAddress"
            id={verifiedAddress.id}
            key={verifiedAddress.id}
            onChange={handleVerifiedAddressChange}
          >
            <Address address={verifiedAddress} />
          </Radio>
        )}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <form onSubmit={handlePersonSubmit}>
            <fieldset>
              <legend>✏️ Add personal info to address</legend>
              <div className="form-row">
                <InputText
                  name="firstName"
                  placeholder="First name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                />
              </div>
              <div className="form-row">
                <InputText
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleLastNameChange}
                  value={lastName}
                />
              </div>
              <Button type="submit">Add to Address Book</Button>
            </fieldset>
          </form>
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <div className="error">{error}</div>}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
