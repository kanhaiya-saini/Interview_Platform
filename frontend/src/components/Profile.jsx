import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Contact, Mail, Pen, Briefcase } from "lucide-react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Profile = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      document.title = `${user.name} | Profile`;
      fetchProfile(user._id);
    }
  }, [user]);

  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8001/api/v1/user/profile/${userId}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
      } else {
        setError(data.message || "Failed to load profile");
      }
    } catch (err) {
      setError("Error fetching profile");
      console.error("Error fetching profile", err); 
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-purple-600">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6">
  <h2 className="text-lg font-semibold text-purple-800 mb-4">Menu</h2>
  <ul className="space-y-4">
    <li>
      <Link
        to="/mock-status"
        className="flex items-center text-purple-700 hover:text-purple-600"
      >
        <Briefcase className="h-5 w-5 mr-2" /> Mock Status
      </Link>
    </li>
    <li>
      <Link
        to="/test"
        className="flex items-center text-purple-700 hover:text-purple-600"
      >
        <Contact className="h-5 w-5 mr-2" /> Interview
      </Link>
    </li>
    <li>
      <Link
        to="/resume"
        className="flex items-center text-purple-700 hover:text-purple-600"
      >
        <Pen className="h-5 w-5 mr-2" /> Resume Builder
      </Link>
    </li>
    <li>
      <Link
        to="/speech"
        className="flex items-center text-purple-700 hover:text-purple-600"
      >
        <Pen className="h-5 w-5 mr-2" /> Speech Analysis
      </Link>
    </li>
  </ul>
</aside>


        {/* Main Content */}
        <div className="flex-1 max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-10 p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-2xl font-semibold text-purple-800">{profile?.name}</h1>
              <p className="text-sm text-purple-500">{profile?.profile?.bio || "No bio available"}</p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <Pen className="h-5 w-5 mr-2" /> Edit Profile
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-4 text-purple-700">
              <Mail className="h-5 w-5 text-purple-600" />
              <span>{profile?.email}</span>
            </div>
            <div className="flex items-center space-x-4 text-purple-700">
              <Contact className="h-5 w-5 text-purple-600" />
              <span>{profile?.phoneNumber || "No phone number available"}</span>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-semibold text-lg text-purple-800">Skills</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile?.profile?.skills?.length > 0 ? (
                profile.profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-purple-500">No skills added yet</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-semibold text-lg text-purple-800">Resume</h1>
            {profile?.resume?.filePath ? (
              <a
                href={`http://localhost:8001${profile.resume.filePath}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                View Resume
              </a>
            ) : (
              <p className="text-purple-500">No resume uploaded</p>
            )}
          </div>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
