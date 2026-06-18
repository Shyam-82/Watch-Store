function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Profile</h1>

      {user ? (
        <>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
}

export default Profile;