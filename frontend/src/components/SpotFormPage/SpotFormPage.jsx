import { useDispatch } from "react-redux";
import "./SpotFormPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createSpotThunk } from "../../store/spots";
import { addSpotImageThunk } from "../../store/spots";
// import PageNotFound from "../PageNotFound";

export default function SpotFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    description: "",
    title: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const newErrors = {};
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Street Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (formData.description.length < 30)
      newErrors.description = "Description needs 30 or more characters";
    if (!formData.title) newErrors.title = "Name is required";
    if (!formData.price) newErrors.price = "Price per night is required";
    if (!formData.image1) newErrors.image1 = "Preview Image URL is required";
    setErrors(newErrors);
  }, [formData]);

  const handleDummyRequestSubmit = async (e) => {
    e.preventDefault();
    const dummyURL =
      "https://img.freepik.com/premium-vector/modern-flat-icon-landscape_203633-11062.jpg";
    setFormData({
      country: "TEST-COUNTRY",
      address: "TEST-ADDRESS",
      city: "TEST-CITY",
      state: "TEST-STATE",
      description:
        "TEST-DESCRIPTION-TEST-DESCRIPTION-TEST-DESCRIPTION-TEST-DESCRIPTION",
      title: "TEST-SPOT-NAME",
      price: 9999,
      image1: dummyURL,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // if front end errors persist, return with no action so it stays at the create spot form page
    if (Object.keys(errors).length > 0) {
      return;
    }

    const newSpot = {
      country: formData.country,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      description: formData.description,
      name: formData.title,
      price: formData.price,
      lat: "0.0000000",
      lng: "0.0000000", // placeholder : as this function will be developed after basic functions completed.
    };
    console.log("======hasSubmitted======");
    console.log(hasSubmitted);
    console.log("=====ERROR LOCAL STATE=====");
    console.log(errors);

    const newSpotResponse = await dispatch(createSpotThunk(newSpot));
    console.log("=====BACKEND RESPSONSE=====");
    console.log(newSpotResponse);

    //if backend process failed, return a 404 Page Not Found page
    if (newSpotResponse.errors) {
      // await Promise.all( setErrors(...newSpotResponse.errors))
      setErrors(newSpotResponse.errors);
    } else {
      // update the image to the backend ReviewImage table
      const images = [
        { url: formData.image1, preview: true },
        { url: formData.image2, preview: false },
        { url: formData.image3, preview: false },
        { url: formData.image4, preview: false },
        { url: formData.image5, preview: false },
      ].filter((image) => image.url);

      await Promise.all(
        images.map((image) =>
          dispatch(addSpotImageThunk(newSpotResponse.id, image))
        )
      );

      navigate(`/spots/${newSpotResponse.id}`);
    }
  };

  return (
    <form
      className="create-spot-form-container"
      action="POST"
      onSubmit={handleSubmit}
      data-testid="create-spot-form"
    >
      <h1 className="form-title" data-testid="form-title">
        Create a New Spot
      </h1>
      <a onClick={handleDummyRequestSubmit} className="fill-dummy-data">
        * Click here to fill dummy data
      </a>
      {/* section 1 spot info */}
      <div className="section" data-testid="section-1">
        <div className="section-header">
          <h3 data-testid="section-1-heading">
            Where&apos;s your place located?
          </h3>
          <p data-testid="section-1-caption">
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <label>
          Country
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          ></input>
          {hasSubmitted && errors.country && (
            <p className="error">{errors.country}</p>
          )}
        </label>
        <label>
          Street Address
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
          ></input>
          {hasSubmitted && errors.address && (
            <p className="error">{errors.address}</p>
          )}
        </label>
        <div className="row-constrainer">
          <label>
            City
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            ></input>
            {hasSubmitted && errors.city && (
              <p className="error">{errors.city}</p>
            )}
          </label>
          <h4>,</h4>
          <label>
            State
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            ></input>
            {hasSubmitted && errors.state && (
              <p className="error">{errors.state}</p>
            )}
          </label>
        </div>
      </div>
      {/* section 2 spot description */}
      <div className="section" data-testid="section-2">
        <div className="section-header">
          <h3 data-testid="section-2-heading">Describe your place to guests</h3>
          <p data-testid="section-2-caption">
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
        </div>
        <label>
          <input
            type="text"
            name="description"
            placeholder="Please write at least 30 characters"
            className="description-input"
            value={formData.description}
            onChange={handleChange}
          ></input>
          {hasSubmitted && errors.description && (
            <p className="error">{errors.description}</p>
          )}
        </label>
      </div>
      {/* section 3 spot name */}
      <div className="section" data-testid="section-3">
        <div className="section-header">
          <h3 data-testid="section-3-heading">Create a title for your spot</h3>
          <p data-testid="section-3-caption">
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
        </div>
        <label>
          <input
            type="text"
            name="title"
            placeholder="Name of your spot"
            value={formData.title}
            onChange={handleChange}
          ></input>
          {hasSubmitted && errors.title && (
            <p className="error">{errors.title}</p>
          )}
        </label>
      </div>
      {/* section 4 spot price */}
      <div className="section" data-testid="section-4">
        <div className="section-header">
          <h3 data-testid="section-4-heading">
            Set a base price for your spot
          </h3>
          <p data-testid="section-4-caption">
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
        </div>
        <div className="price-row">
          <label>$</label>
          <input
            type="number"
            name="price"
            placeholder="Price per night (USD)"
            value={formData.price}
            onChange={handleChange}
          ></input>
        </div>
        {hasSubmitted && errors.price && (
          <p className="error">{errors.price}</p>
        )}
      </div>
      {/* section 5 spot photos */}
      <div className="section" data-testid="section-5">
        <div className="section-header">
          <h3 data-testid="section-5-heading">
            Liven up your spot with photos
          </h3>
          <p data-testid="section-5-caption">
            Submit a link to at least one photo to publish your spot.
          </p>
        </div>
        {/* <div className="photo-container"> */}
        <input
          type="url"
          name="image1"
          placeholder="Preview Image URL"
          value={formData.image1}
          onChange={handleChange}
        ></input>
        {hasSubmitted && errors.image1 && (
          <p className="error">{errors.image1}</p>
        )}
        <input
          type="url"
          name="image2"
          placeholder="Image URL"
          value={formData.image2}
          onChange={handleChange}
        ></input>
        <input
          type="url"
          name="image3"
          placeholder="Image URL"
          value={formData.image3}
          onChange={handleChange}
        ></input>
        <input
          type="url"
          name="image4"
          placeholder="Image URL"
          value={formData.image4}
          onChange={handleChange}
        ></input>
        <input
          type="url"
          name="image5"
          placeholder="Image URL"
          value={formData.image5}
          onChange={handleChange}
        ></input>
        {/* </div> */}
      </div>
      {/* submit button */}
      <button type="submit" className="create-spot-submit-button">
        Create Spot
      </button>
    </form>
  );
}
