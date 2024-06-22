/* eslint-disable react/prop-types */
function Navbar(props) {
  const logout = () => {
    props.setId(-1);
    props.setRoute("login");
    props.setCart([]);
  };

  const capitalizeWords = (word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const rest = word.slice(1).toLowerCase();

    return firstLetter + rest;
  };

  let user = "";
  if (props.id == -1) {
    user = { id: props.id, username: "admin", role: "admin" };
  } else {
    user = props.users.find((u) => u.id == props.id);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black border-bottom border-3 border-black">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="w-75 px-4 py-2">
              {user.role == "admin" ? (
                <h1 className="text-white">
                  Welcome, {capitalizeWords(user.username)}!
                </h1>
              ) : (
                <h1 className="text-white">
                  Welcome, {capitalizeWords(user.username)}! (
                  {capitalizeWords(user.role.toLowerCase())})
                </h1>
              )}
            </div>
            <div className="w-25 d-flex justify-content-end px-4">
              <button
                className="btn text-white fs-3 text-white"
                style={{ backgroundColor: "#7c2023" }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
