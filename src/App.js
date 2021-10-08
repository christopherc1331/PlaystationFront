import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.scss";


function App() {

    const [featureFlags, setFeatureFlags] = useState([]);
    const [originalFeatureFlags, setOriginalFeatureFlags] = useState([]);


    const fetchFeatureFlags = () => {
        axios.get("http://localhost:8080/featureflags")
            .then(res => {
                const originalFeatureFlagsList = [];
                for (let i = 0; i < res.data.length; i++) {
                    const dataPoint = res.data[i];
                    dataPoint["valueArr"] = dataPoint["valueArr"].map(strNum => parseInt(strNum) === 1);
                    originalFeatureFlagsList.push(dataPoint);
                }
                setFeatureFlags(res.data);
                setOriginalFeatureFlags([...originalFeatureFlagsList]);
            })
    }

    const findChangesMade = (newFeatureFlags, originalFeatureFlags) => {
        const changedList = [];
        for (let i = 0; i < originalFeatureFlags.length; i++) {
            for (let x = 0; x < originalFeatureFlags[i]["valueArr"].length; x++) {

                console.log("newFeatureFlags[i][\"name\"]", newFeatureFlags[i]["name"])
                console.log("newFeatureFlags[i]['valueArr'][x] | ", newFeatureFlags[i]["valueArr"][x]);
                console.log("originalFeatureFlags[i]['valueArr'][x]) | ", originalFeatureFlags[i]['valueArr'][x]);
                console.log("originalFeatureFlags[i]['valueArr'][x] == newFeatureFlags[i]['valueArr'][x] | ", originalFeatureFlags[i]["valueArr"][x] === newFeatureFlags[i]["valueArr"][x]);

                if (newFeatureFlags[i]["valueArr"][x] !== (parseInt(originalFeatureFlags[i]["valueArr"][x]) === 1)) {
                    changedList.push(newFeatureFlags[i]);
                }
            }
        }
        return changedList;
    }

    // console.log("originalFeatureFlags == featureFlags ||", originalFeatureFlags == featureFlags);
    // console.log("originalFeatureFlags ||", originalFeatureFlags);
    // console.log("featureFlags ||", featureFlags);

    //
    // const updateOrInsertFeatureFlag

    useEffect(() => {
        if (featureFlags.length === 0) {
            fetchFeatureFlags();
        }
    }, [])

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
        if (findChangesMade(featureFlags, originalFeatureFlags).length > 0) {
            fetchFeatureFlags();
        }
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
