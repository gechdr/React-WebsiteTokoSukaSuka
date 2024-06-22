/* eslint-disable react/prop-types */
import formatter from "./formatter";

function CardTransaction(props) {
  return (
    <>
      <div className="col border-0 w-25">
        <div className="card rounded-4 shadow h-100">
          <div className="card-body w-100 d-flex flex-column">
            <div className="d-flex w-100">
              <div className="w-50 d-flex justify-content-start">
                <span>{props.id}</span>
              </div>
              <div className="w-50 d-flex justify-content-end">
                <span>{props.date}</span>
              </div>
            </div>
            <hr />
            <div className="w-100 d-flex">
              <div className="w-50 d-flex justify-content-start">
                <span className="fw-bold">
                  {formatter.format(props.totalHarga)}
                </span>
              </div>
              <div className="w-50 d-flex justify-content-end">
                <span
                  className="fw-bold"
                  style={{
                    color:
                      props.status == "Pending"
                        ? "orange"
                        : props.status == "Confirm"
                        ? "green"
                        : "#7c2023",
                  }}
                >
                  {props.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardTransaction;
