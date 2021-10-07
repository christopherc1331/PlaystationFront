import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.scss";


function App() {

    const [featureFlags, setFeatureFlags] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/featureflags")
            .then(res => {
                setFeatureFlags(res.data);
                console.log(res);
            })
    }, [])

  return (
    <div className="container">
      <div className="pop-up-box">
        <div className="header">
            <h1>Feature Flag Manager</h1>
            <div className="white-rect"/>
        </div>
        <div className="box-bottom">
            <div className="bottom-inner-box">
                <div className="empty-row row-border">

                </div>
                <div className="header-row row-border">
                    <div className="row-container">
                        <div className="left">
                            <h3>Region</h3>
                        </div>
                        <div className="right">
                            <h3>Asia</h3>
                            <h3>Korea</h3>
                            <h3>Europe</h3>
                            <h3>Japan</h3>
                            <h3>America</h3>
                        </div>
                    </div>
                </div>
                {featureFlags.map(featureFlag => (
                    <div className="check-box-row row-border">
                        <div className="row-container">
                            <div className="left">
                                <h3 className="labels">{featureFlag["name"]}</h3>
                            </div>
                            <div className="right">
                                {featureFlag["valueArr"].map(value => (
                                    <input type="checkbox" value={parseInt(value) === 1} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="button-row row-border">

                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
