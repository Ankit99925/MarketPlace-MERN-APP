import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../partials/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSellerProfile,
  updateSellerProfile,
} from "../../../../../store/slices/sellerSlice";
import ProfileCard from "./ProfileCard";
function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.seller);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  useEffect(() => {
    dispatch(fetchSellerProfile(userId));
  }, [dispatch, userId]);

  // Use reset instead of multiple setValue calls
  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        userType: profile.userType,
      });
      // Set image preview from profile
      setImagePreview(
        profile.profilePicture || "https://via.placeholder.com/100"
      );
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      console.log("Raw form data:", data);

      // Add text fields
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);

      // Use the selectedFile state instead of data.profilePicture
      if (selectedFile) {
        console.log("File being appended:", selectedFile);
        formData.append("profilePicture", selectedFile);
      }

      // Debug: Log all FormData entries
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
        if (pair[1] instanceof File) {
          console.log("File details:", {
            name: pair[1].name,
            type: pair[1].type,
            size: pair[1].size,
          });
        }
      }

      const result = await dispatch(
        updateSellerProfile({ userId, formData })
      ).unwrap();

      if (result) {
        setIsEditing(false);
        setSelectedFile(null); // Reset the selected file
        dispatch(fetchSellerProfile(userId));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Profile Details
              </h1>
            </div>

            {/* Profile Card */}
            <ProfileCard
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              selectedFile={selectedFile}
              onSubmit={onSubmit}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              setSelectedFile={setSelectedFile}
              handleImageChange={handleImageChange}
              userType={profile.userType}
              profile={profile}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
