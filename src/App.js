import React from "react";

import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

import styles from "./App.module.css";
import { fetchData, fetchStatewiseIndiaData } from "./api";
import coronaImage from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedStateData = await fetchStatewiseIndiaData();
    console.log(
      fetchedStateData["Andaman and Nicobar Islands"]["districtData"][
        "Nicobars"
      ].active
    );
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    // fetch
    const fetchedData = await fetchData(country);
    //set the state
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
