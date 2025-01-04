import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContextProvider";

import SuccessPopup from "./SuccessPopup";
import Logo from "./assets/Logo.png";

export default function RegisterComp(props) {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const { users, AddUser } = useContext(UserContext);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e",
          { mode: "cors" }
        );
        const data = await response.json();
        setCities(data.result.records);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    dateOfBirth: "",
    picture: null,
    city: "",
    street: "",
    houseNumber: "",
  });

  //helper constatns for validating user data
  const englishAndSpecialCharsOnly =
    /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/;
  const englishOnly = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+@[a-zA-Z0-9\-]+\.com$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{7,12}$/;
  const birthDate = new Date(userData.dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const hebrewLettersOnly = /^[\u0590-\u05FF\s]*$/;
  const numbersOnly = /^[1-9]\d*$/;
  const validImageTypes = ["image/jpeg", "image/jpg"];

  //user data validation
  const FirstNameNotValid =
    userData.firstName != "" && !englishOnly.test(userData.firstName);
  const lastNameNotValid =
    userData.lastName != "" && !englishOnly.test(userData.lastName);
  const emailNotValid =
    userData.email != "" && !emailRegex.test(userData.email);
  const userNameNotValid =
    userData.username != "" &&
    (userData.username.trim().length > 60 ||
      !englishAndSpecialCharsOnly.test(userData.username));
  const passwordNotMatch =
    userData.passwordConfirm != "" &&
    userData.password != userData.passwordConfirm;
  const passwordNotValid =
    userData.password != "" && !passwordRegex.test(userData.password);
  const ageNotValid = userData.dateOfBirth != "" && (age <= 18 || age >= 120);
  const streetNotValid =
    userData.street != "" && !hebrewLettersOnly.test(userData.street);
  const houseNumberNotValid =
    userData.houseNumber != "" && !numbersOnly.test(userData.houseNumber);
  const imageNotValid = userData.picture === "invalid";

  function handleInputChange(identifier, value) {
    setUserData((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, picture: reader.result }));
      };
    } else {
      setUserData((prev) => ({ ...prev, picture: "invalid" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all validations
    if (
      !FirstNameNotValid &&
      !lastNameNotValid &&
      !emailNotValid &&
      !userNameNotValid &&
      !passwordNotValid &&
      !passwordNotMatch &&
      !ageNotValid &&
      !streetNotValid &&
      !houseNumberNotValid &&
      !imageNotValid &&
      userData.city !== ""
    ) {
      AddUser(userData);
      setShowSuccess(true);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-br from-amber-700 to-amber-400">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Logo" src={Logo} className="mx-auto h-20 w-auto" />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full md:max-w-2xl">
          <div className="bg-gray-200 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-300 [&:not(:placeholder-shown)]:bg-white sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("firstName", event.target.value)
                    }
                  />
                  {FirstNameNotValid && (
                    <p className="mt-1 text-sm text-red-500">
                      First name must contain English letters only
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("lastName", event.target.value)
                    }
                  />
                  {lastNameNotValid && (
                    <p className="mt-1 text-sm text-red-500">
                      Last name must contain English letters only
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("email", event.target.value)
                    }
                  />
                  {emailNotValid && (
                    <p className="mt-1 text-sm text-red-500">
                      Enter a valid email address ending with .com
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("username", event.target.value)
                    }
                  />
                  {userNameNotValid && (
                    <p className="mt-1 text-sm text-red-500">
                      Username must be less than 60 characters and contain only
                      English letters, numbers and special characters
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("password", event.target.value)
                    }
                  />
                  {passwordNotValid && (
                    <p className="mt-1 text-sm text-red-500">
                      Password must be 7-12 characters with at least one
                      uppercase letter, number, and special character
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("passwordConfirm", event.target.value)
                    }
                  />
                  {passwordNotMatch && (
                    <p className="mt-1 text-sm text-red-500">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="picture"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Profile Picture
                  </label>
                  <input
                    id="picture"
                    name="picture"
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-950 file:text-white hover:file:bg-purple-800"
                    onChange={handleImageChange}
                  />
                  {imageNotValid && (
                    <p className="mt-1 text-sm text-red-500">
                      Please upload only JPG or JPEG files
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("dateOfBirth", event.target.value)
                    }
                  />
                  {ageNotValid && (
                    <p className="mt-1 text-sm text-red-500">
                      Age must be between 18 and 120 years
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      City
                    </label>
                    <input
                      list="cities"
                      id="city"
                      name="city"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(event) =>
                        handleInputChange("city", event.target.value)
                      }
                    />
                    <datalist id="cities">
                      {cities.map((city) => (
                        <option
                          key={city.city_name_he}
                          value={city.city_name_he}
                        />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Street
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(event) =>
                        handleInputChange("street", event.target.value)
                      }
                    />
                    {streetNotValid && (
                      <p className="mt-1 text-sm text-red-500">
                        Street name must contain Hebrew letters only
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="houseNumber"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      House Number
                    </label>
                    <input
                      id="houseNumber"
                      name="houseNumber"
                      type="text"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(event) =>
                        handleInputChange("houseNumber", event.target.value)
                      }
                    />
                    {houseNumberNotValid && (
                      <p className="mt-1 text-sm text-red-500">
                        House number must be a positive number
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-950"
              >
                Register
              </button>
            </form>
            {showSuccess && (
              <SuccessPopup
                msg="Your account has been successfully created."
                btn="Login to your account"
                nav="/login"
              />
            )}

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="font-semibold text-purple-950 hover:text-purple-800 cursor-pointer"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
