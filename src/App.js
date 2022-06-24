import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [option, setOption] = useState("pizza");
  const [slices, setSlices] = useState(null);
  const [diamater, setDiamater] = useState(null);
  const [range, setRange] = useState(null);
  const [message, setMessage] = useState("");
  const pizza = {
    
    name: name,
    preparation_time: time,
    type: option,
    no_of_slices: parseInt(slices),
    diameter: parseInt(diamater),
  };
  const soup = {
    name: name,
    preparation_time: time,
    type: option,
    spiciness_scale: parseInt(range),
  };
  const san = {
    name: name,
    preparation_time: time,
    type: option,
    slices_of_bread: parseInt(slices),
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(
          option === "pizza" ? pizza : option === "soup" ? soup : san
        ),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setTime("");
        setMessage("Your order was received");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(typeof(slices))
  return (
    <div className="App">
      <h1>Dish order</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          placeholder="Enter your name..."
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Delivery time</label>
        <input
          type="time"
          step="1"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <label>Type of dish</label>
        <select onChange={(e) => setOption(e.target.value)}>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
        {/* pizza */}
        <label className={option === "pizza" ? "active" : "disabled"}>
          Number of slices
        </label>
        <input
          type="number"
          value={slices}
          onChange={(e) => setSlices(e.target.value)}
          placeholder="Enter your number of slices..."
          className={option === "pizza" ? "active" : "disabled"}
          required={option === "pizza" ? true : false}
        />
        <label className={option === "pizza" ? "active" : "disabled"}>
          Diamater of pizza
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter your diamater"
          value={diamater}
          onChange={(e) => setDiamater(e.target.value)}
          className={option === "pizza" ? "active" : "disabled"}
          required={option === "pizza" ? true : false}
        />
        {/* soup */}
        <label className={option === "soup" ? "title active" : "disabled"}>
          Spiciness scale: {range}
        </label>
        <div className={option === "soup" ? "slider active" : "disabled"}>
          <label>0</label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            required={option === "soup" ? true : false}
          />
          <label>10</label>
        </div>

        {/* sandwich */}
        <label className={option === "sandwich" ? "active" : "disabled"}>
          Number of slices of bread
        </label>
        <input
          type="number"
          placeholder="Enter your number of slices of bread"
          value={slices}
          onChange={(e) => setSlices(e.target.value)}
          className={option === "sandwich" ? "active" : "disabled"}
          required={option === "sandwich" ? true : false}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
        
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </div>
  );
};

export default App;
