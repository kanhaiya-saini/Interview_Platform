import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const validatePhoneNumber = (phoneNumber) => {
  if (typeof phoneNumber !== "string") return false;
  const cleaned = phoneNumber.replace(/\D/g, "");
  return cleaned.length === 10;
};

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Updating profile...");
    
    if (!validatePhoneNumber(input.phoneNumber)) {
        toast.error("Phone number must be exactly 10 digits.");
        setLoadingState(false);
        return;
    }
    setLoadingState(true);

    try {
      const response = await fetch("http://localhost:8001/api/v1/user/profile/update", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        setOpen(false);  // ✅ Close modal only if update succeeds
      } else {
        toast.error(data.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Profile update failed");
    } finally {
      setLoadingState(false);
    }
  };

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-500">Update Profile</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-500">Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-500">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-500">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-500">Bio</label>
            <input
              type="text"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-500">Skills</label>
            <input
              type="text"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-purple-500 border border-purple-500 rounded-md hover:bg-purple-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UpdateProfileDialog;
