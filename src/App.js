import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.scss";


function App() {

    const [featureFlags, setFeatureFlags] = useState([]);
    const [originalFeatureFlags, setOriginalFeatureFlags] = useState([]);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/featureflags")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const dataPoint = res.data[i];
                    dataPoint["valueArr"] = dataPoint["valueArr"].map(strNum => parseInt(strNum) === 1);
                }
                setFeatureFlags(res.data);
                setOriginalFeatureFlags(res.data);
            })
    }, [])

    const handleCheckBox = (e, index) => {
        const {name, checked} = e.target;
        const updatedFeatureFlags = featureFlags
            .map(feature => {
                if (feature["name"] === name) {
                    feature["valueArr"][index] = !feature["valueArr"][index];
                }
                return feature;
            });

        setFeatureFlags(updatedFeatureFlags);
    }

    console.log("cancelled!!!!", cancelled);
    console.log("featureFlags!!!!", featureFlags);
    console.log("originalFeatureFlags!!!!", originalFeatureFlags);
    console.log("featureFlags == originalFeatureFlags!!!!", featureFlags == originalFeatureFlags);

    useEffect(() => {
        console.log("in UseEffect!");
        if (cancelled) {
            console.log("in UseEffect if statement!");
            setFeatureFlags(originalFeatureFlags);
        }
        setTimeout(() => {
            setCancelled(false);
        },[2000])

    }, [cancelled]);

  return (
    <div className="container">
      <div className="pop-up-box">
        <div className="header">
            <h1>Feature Flag Manager</h1>
            <div className="white-rect"/>
        </div>
        <div className="box-bottom">
            <div className="bottom-inner-box">
                <div className="empty-row row-border" />
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
                {cancelled ?
                    originalFeatureFlags.map(featureFlag => (
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
                    ))
                    :
                    featureFlags.map(featureFlag => (
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
                        <div className="button" onClick={() => setCancelled(true)}>Cancel</div>
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
