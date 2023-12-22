import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [inputs, setInputs] = useState({
    name: "",
    status: "",
  });
  const [data, setData] = useState([]);
  //   const [statusCategory, setStatusCategory] = useState("");
  //   console.log(data);

  // updating/re-rendering dom on fetching data
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("p")) || []);
    console.log("called");
  }, [setData]);

  const handleClick = (val) => {
    setShow(val);
  };

  // handling form data
  const handleChange = (e) =>
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // for empty localstorage
    let problem1 = [];
    problem1.push(inputs);

    // for existing data in localstorage
    const storage = JSON.parse(localStorage.getItem("p")) || [];
    if (storage.length !== 0) storage.push(inputs);
    localStorage.setItem(
      "p",
      storage.length !== 0 ? JSON.stringify(storage) : JSON.stringify(problem1)
    );

    // updating state
    setData(JSON.parse(localStorage.getItem("p")) || []);
    setInputs({ name: "", status: "" });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onChange={(e) => handleChange(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={inputs.name}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
                value={inputs.status}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>

              {/* if all tab selected */}
              {show === "all" &&
                data
                  ?.sort((a, b) => a.status.localeCompare(b.status))
                  .filter((el) => el.status !== "")
                  .map((el, idx) => (
                    <tr key={idx}>
                      <th scope="col">{el?.name}</th>
                      <th scope="col">{el?.status}</th>
                    </tr>
                  ))}

              {/* if active tab selected */}
              {show === "active" &&
                data
                  ?.filter((el) => el.status.toLowerCase().trim() === "active")
                  .map((el, idx) => (
                    <tr key={idx}>
                      <th scope="col">{el?.name}</th>
                      <th scope="col">{el?.status}</th>
                    </tr>
                  ))}

              {/* if completed tab selected */}
              {show === "completed" &&
                data
                  ?.filter(
                    (el) => el.status.toLowerCase().trim() === "completed"
                  )
                  .map((el, idx) => (
                    <tr key={idx}>
                      <th scope="col">{el?.name}</th>
                      <th scope="col">{el?.status}</th>
                    </tr>
                  ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
