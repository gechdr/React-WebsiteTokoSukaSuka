import CardTransaction from "./CardTransaction";

/* eslint-disable react/prop-types */
function ListHistory(props) {
  return (
    <>
      <div className="row row-cols-1 g-4 d-flex w-100 m-0 px-5 pb-5">
        {props.userTransaction.length > 0 &&
          props.userTransaction.map((t) => (
            <CardTransaction key={t.id} {...t}></CardTransaction>
          ))}
      </div>
    </>
  );
}

export default ListHistory;
