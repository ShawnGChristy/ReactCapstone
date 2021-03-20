import classes from './Search.module.css';
import React, {useState} from 'react';
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios';

const Search = () => {
    let [city, setCity] = useState('');
    let [responseObj, setResponseObj] = useState({});
    let [responseArray, setResponseArray] = useState([]);
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [willwork, setWillwork] = useState(false);

    function getSearch(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        setError(false);
        setResponseObj({});
        setResponseArray([]);
        
        setLoading(true);

        const uriEncodedCity = encodeURIComponent(city);

      const response =
      axios({
        method: 'get',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: `http://localhost:8080/nonprofits/city?city=${uriEncodedCity}`,
        // data: city
      })
    //   .then(response => response.json())
      .then((response) => {
        console.log(response.data)
        console.log("The name of the Non-Profit at index 0 is: ", response.data[0].nonProfitName)
          setResponseObj(response)
          setResponseArray(response)
          setLoading(false);
          // setData({nonProfitName: response.data.nonProfitName, address: response.data.address})
          console.log("This is the responseObj: ", responseObj);
          console.log("This is the name of the Non-Profit in responseObj: ", responseObj.data[0].nonProfitName);
          console.log("This is the name of the Non-Profit in responseArray: ", responseArray.data[0].nonProfitName);
      })
      .then(() => {
        setWillwork(true);
        console.log(willwork)
      })
        .catch((err) => {
                setError(true);
                setLoading(false);
                console.log(err.message);
              }
        )
    }

    return(
        <div>
            <h2>Find Help Here</h2>
            <form onSubmit = {getSearch}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <button className={classes.Button} value="submit" type="submit">Find Help</button>
            </form>
           {willwork === true ? 
           <SearchResults
                responseObj={responseObj}
                responseArray={responseArray}
                error={error}
                loading={loading}
                willwork={willwork}
                /> : null
            }
        </div>
    )
}

export default Search;