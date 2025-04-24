import { useState } from "react";
const ProfileCard = ({
  register,
  handleSubmit,
  reset,
  errors,
  isSubmitting,
  selectedFile,
  setSelectedFile,
  onSubmit,
  isEditing,
  setIsEditing,
  imagePreview,
  setImagePreview,
  handleImageChange,
  userType,
  profile,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-10 left-8">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 object-cover"
          />
        </div>
      </div>

      {/* Profile Form */}
      <form
        className="pt-16 px-8 pb-8"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>

            {/* Edit/Save Buttons */}
            <div className="flex gap-4 mt-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                First Name
              </label>
              <input
                {...register("firstName")}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                 focus:border-indigo-500 focus:ring-indigo-500 
                                 disabled:bg-gray-100 dark:disabled:bg-gray-700
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Name
              </label>
              <input
                {...register("lastName")}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                 focus:border-indigo-500 focus:ring-indigo-500 
                                 disabled:bg-gray-100 dark:disabled:bg-gray-700
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </label>
              <input
                {...register("email")}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                 focus:border-indigo-500 focus:ring-indigo-500 
                                 disabled:bg-gray-100 dark:disabled:bg-gray-700
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* User Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Account Type
              </label>
              <input
                {...register("userType")}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                 focus:border-indigo-500 focus:ring-indigo-500 
                                 disabled:bg-gray-100 dark:disabled:bg-gray-700
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Account Status
            </h2>

            {/* Email Verification Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Email Verification
              </label>
              <div className="mt-1">
                {profile?.isEmailVerified ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                )}
              </div>
            </div>

            {/* Google ID (only shown if exists) */}
            {profile?.googleId && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Login Method
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.607,1.972-2.101,3.467-4.073,4.073v-3.536 c0-1.054-0.855-1.909-1.909-1.909h0c-1.054,0-1.909,0.855-1.909,1.909v3.536c-1.972-0.607-3.467-2.101-4.073-4.073h3.536 c1.054,0,1.909-0.855,1.909-1.909v0c0-1.054-0.855-1.909-1.909-1.909H5.989c0.607-1.972,2.101-3.467,4.073-4.073v3.536 c0,1.054,0.855,1.909,1.909,1.909h0c1.054,0,1.909-0.855,1.909-1.909V6.169c1.972,0.607,3.467,2.101,4.073,4.073h-3.536 C13.4,10.242,12.545,11.097,12.545,12.151z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Google Account
                  </span>
                </div>
              </div>
            )}

            {/* Profile Picture */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="profile-image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                  {isEditing ? "Upload Image" : "Change Image"}
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    {...register("profilePicture")}
                    onChange={(e) => {
                      handleImageChange(e);
                      // Store the file in a ref or state for later use
                      const file = e.target.files[0];
                      // This is important! Store the file directly on the form data
                      if (file) {
                        const fileEvent = e;
                        // We'll use this in onSubmit
                        setSelectedFile(file);
                      }
                    }}
                    className="hidden"
                    disabled={!isEditing}
                  />
                </label>
              </div>
              {errors.profilePicture && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileCard;
