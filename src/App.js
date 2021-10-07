import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.scss";


function App() {

    const [featureFlags, setFeatureFlags] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/featureflags")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const dataPoint = res.data[i];
                    dataPoint["valueArr"] = dataPoint["valueArr"].map(strNum => parseInt(strNum) === 1);
                }
                setFeatureFlags(res.data);
            })
    }, [])

    const handleCheckBox = (e, index) => {
        const {name, checked} = e.target;
        const updatedFeatureFlags = featureFlags
            .map(feature => {
                if (feature["name"] === name) {
                    feature["valueArr"][index] = checked;
                }
                return feature;
            });

        setFeatureFlags(updatedFeatureFlags);
    }

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
                                {featureFlag["valueArr"].map((value, index) => (
                                    <input name={featureFlag["name"]} type="checkbox" checked={value} onChange={(e) => handleCheckBox(e, index)} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="button-row row-border">
                    <div className="button-container">
                        <div className="button">Cancel</div>
                        <div className="button save">Save</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
