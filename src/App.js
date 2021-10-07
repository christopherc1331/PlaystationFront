import "./App.scss";

function App() {
  return (
    <div className="container">
      <div className="pop-up-box">
        <div className="header">
            <h1>Feature Flag Manager</h1>
            <div className="white-rect"/>
        </div>
        <div className="box-bottom">
            <div className="bottom-inner-box">
                <div className="empty-row">

                </div>
                <div className="header-row">
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
                <div className="check-box-row">

                </div>
                <div className="button-row">

                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
