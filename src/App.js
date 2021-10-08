import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.scss";


function App() {

    const [featureFlags, setFeatureFlags] = useState([]);
    const [featureFlagsMap, setFeatureFlagsMap] = useState({});

    const prepareFeatureList = (featureFlagsList) => {
        let localFeatureFlagsMap = {};
        for (let i = 0; i < featureFlagsList.length; i++) {
            const featureObj = {};
            const dataPoint = featureFlagsList[i];
            dataPoint["valueArr"] = dataPoint["valueArr"].map(strNum => parseInt(strNum) === 1);
            for (let f = 0; f < dataPoint["valueArr"].length; f++) {
                featureObj[dataPoint["name"] + f] = dataPoint["valueArr"][f];
            }
            localFeatureFlagsMap = {...localFeatureFlagsMap, ...featureObj};
        }
        setFeatureFlags(featureFlagsList);
        setFeatureFlagsMap({...localFeatureFlagsMap});
    }

    const fetchFeatureFlags = () => {
        axios.get("http://localhost:8080/featureflags")
            .then(res => {
                prepareFeatureList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const updateFeatures = () => {
        let featuresToBeChanged = findChangesMade();

        if (featuresToBeChanged.length > 0) {
            for (let y = 0; y < featuresToBeChanged.length; y++) {
                for (let z = 0; z < featuresToBeChanged[y]["valueArr"].length; z++) {
                    if (featuresToBeChanged[y]["valueArr"][z]) {
                        featuresToBeChanged[y]["valueArr"][z] = "1";
                    } else {
                        featuresToBeChanged[y]["valueArr"][z] = "0";
                    }
                }
            }

            axios.post("http://localhost:8080/featureflags", featuresToBeChanged)
                .then(res => {
                    prepareFeatureList(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const findChangesMade = () => {
        const changedList = [];
        for (let i = 0; i < featureFlags.length; i++) {
            for (let y = 0; y < featureFlags[i]["valueArr"].length; y++) {

                if (featureFlags[i]["valueArr"][y] !== featureFlagsMap[featureFlags[i]["name"] + y]) {
                    changedList.push(featureFlags[i]);
                }
            }
        }
        return changedList;
    }

    const handleCheckBox = (e, index) => {
        const name = e.target.name;
        const updatedFeatureFlags = featureFlags
            .map(feature => {
                if (feature["name"] === name) {
                    feature["valueArr"][index] = !feature["valueArr"][index];
                }
                return feature;
            });

        setFeatureFlags(updatedFeatureFlags);
    }

    const handleCancel = () => {
        if (findChangesMade().length > 0) {
            fetchFeatureFlags();
        }
    }

    useEffect(() => {
        fetchFeatureFlags();
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
                {
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
                        <div className="button" onClick={handleCancel}>Cancel</div>
                        <div className="button save" onClick={updateFeatures}>Save</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
