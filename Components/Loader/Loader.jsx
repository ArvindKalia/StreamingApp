"use client"

import "./Loader.css"
const Loader = () => {
    const design = (
        <>
          <div className="loader">
            <i className="fa fa-spinner fa-spin"
            style={{
                fontSize: "50px",
                color: "white"
            }}
            ></i>
          </div>
        </>
    )
    return design;
}
export default Loader;