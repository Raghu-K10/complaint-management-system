function Profile() {
  const token = localStorage.getItem("token");

  let user = {};

  if (token) {
    user = JSON.parse(atob(token.split(".")[1]));
  }

  return (
    <div className="container">
      <h2 className="title">Profile</h2>

      <div className="card">
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </div>
  );
}

export default Profile;