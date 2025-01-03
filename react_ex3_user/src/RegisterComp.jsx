import { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContextProvider";

import Logo from "./assets/Logo.png";

export default function RegisterComp(props) {
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

  console.log(cities);
  const [submitted, setSubmitted] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    picture: null,
    city: "",
    street: "",
    houseNumber: "",
  });
  const { AddUser } = useContext(UserContext);

  const englishAndSpecialCharsOnly =
    /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/;
  const englishOnly = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+@[a-zA-Z0-9\-]+\.com$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{7,12}$/;

  const FirstNameNotValid = submitted && englishOnly.test(userData.firstName);
  const lastNameNotValid = submitted && englishOnly.test(userData.lastName);
  const emailNotValid = submitted && emailRegex.test(userData.email);
  const userNameNotValid =
    submitted &&
    userData.username.trim().length < 60 &&
    englishAndSpecialCharsOnly.test(userData.username);
  const passwordNotValid = submitted && passwordRegex.test(userData.password);

  function handleInputChange(identifier, value) {
    if (identifier === "fName") {
      setUserData((prev) => ({
        ...prev,
        [firstName]: value,
      }));
    }
    if (identifier === "lName") {
      setUserData((prev) => ({
        ...prev,
        [lastName]: value,
      }));
    }
    if (identifier === "lName") {
      setUserData((prev) => ({
        ...prev,
        [lastName]: value,
      }));
    }
    if (identifier === "email") {
      setUserData((prev) => ({
        ...prev,
        [email]: value,
      }));
    }
    if (identifier === "email") {
      setUserData((prev) => ({
        ...prev,
        [email]: value,
      }));
    }
    if (identifier === "username") {
      setUserData((prev) => ({
        ...prev,
        [username]: value,
      }));
    }
    if (identifier === "password") {
      setUserData((prev) => ({
        ...prev,
        [password]: value,
      }));
    }
    if (identifier === "dateOfBirth") {
      setUserData((prev) => ({
        ...prev,
        [dateOfBirth]: value,
      }));
    }
    if (identifier === "city") {
      setUserData((prev) => ({
        ...prev,
        [city]: value,
      }));
    }
    if (identifier === "street") {
      setUserData((prev) => ({
        ...prev,
        [street]: value,
      }));
    }
    if (identifier === "houseNumber") {
      setUserData((prev) => ({
        ...prev,
        [houseNumber]: value,
      }));
    }
  }

  (event) => handleInputChange("email", event.target.value);

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-br from-amber-700 to-amber-400">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Logo" src={Logo} className="mx-auto h-20 w-auto" />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full md:max-w-2xl">
          <div className="bg-gray-200 p-8 rounded-lg shadow-md">
            <form action="#" method="POST" className="space-y-6">
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) =>
                      handleInputChange("fName", event.target.value)
                    }
                  />
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
                      handleInputChange("lName", event.target.value)
                    }
                  />
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
                  />
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
                  />
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

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{" "}
              <a
                href="#"
                className="font-semibold text-purple-950 hover:text-purple-800"
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
