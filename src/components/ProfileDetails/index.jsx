import "./index.css";
const ProfileDetails = ({ profileDetails }) => {
  const { name, profile_image_url, short_bio } = profileDetails;
  return (
    <div className="profile-card">
      <img src={profile_image_url} className="profile-image" />
      <h1 className="profile-head">{name}</h1>
      <p className="profile-bio">{short_bio}</p>
    </div>
  );
};

export default ProfileDetails;
