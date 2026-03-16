import { createProfile, getMyProfile, updateProfile } from "@/services/profileServie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BookOpen, Briefcase, MapPin, X } from "lucide-react";
 
import { uploadProfilePhoto,uploadResume } from "@/services/profileServie";

function Profile() {
  const initialForm = {
    education: "",
    skills: "",
    experience: "",
    bio: "",
    profilePhoto: "",
    address: {
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
  };

  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [createForm, setCreateForm] = useState(initialForm);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const MyProfile = async () => {
      try {
        const res = await getMyProfile();
        setData(res.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setShowForm(true);
        }
      } finally {
        setLoading(false)
      }
    };
    MyProfile();
  }, []);

  const getFileName = (url) => {
  return url.split('/').pop()  // URL ka last part = filename
}


  const handleEdit = () => {
    setCreateForm({
      education: data.education,
      experience: data.experience,
      skills: data.skills.join(", "),
      bio: data.bio,
      profilePhoto: data.profilePhoto,
      address: data.address,
    });
    setEdit(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (["country", "state", "city", "pincode"].includes(name)) {
      setCreateForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setCreateForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...createForm,
      skills: createForm.skills.split(",").map((s) => s.trim()),
    };
    try {
      if (edit) {
        const res = await updateProfile(payload, data._id);
        setData(res.data);
        setEdit(false);
      } else {
        const res = await createProfile(payload);
        setData(res.data);
        setShowForm(false);
      }
      setCreateForm(initialForm);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('profilePhoto', file)
    try {
      const res = await uploadProfilePhoto(data._id, formData)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('resume', file)
    try {
      const res = await uploadResume(data._id, formData)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const inputClass = "w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
  const labelClass = "text-sm font-semibold text-gray-700"

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Loading profile...</p>
    </div>
  )

  if (showForm || edit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 px-4 py-12">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {edit ? 'Edit Profile' : 'Create Profile'}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">{user.name} · {user.email}</p>
            </div>
            {edit && (
              <button onClick={() => setEdit(false)} className="text-gray-400 hover:text-gray-600 transition">
                <X size={22} />
              </button>
            )}
          </div>
          <div className="bg-white rounded-3xl shadow-xl shadow-teal-100 border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={labelClass}>Education</label>
                  <input type="text" name="education" value={createForm.education} onChange={handleOnChange} placeholder="e.g. B.Tech Computer Science" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Experience</label>
                  <input type="text" name="experience" value={createForm.experience} onChange={handleOnChange} placeholder="e.g. 2 years" className={inputClass} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Skills</label>
                <input type="text" name="skills" value={createForm.skills} onChange={handleOnChange} placeholder="React, Node.js, MongoDB (comma separated)" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Bio</label>
                <textarea name="bio" value={createForm.bio} onChange={handleOnChange} rows={3} placeholder="Tell employers about yourself..." className={`${inputClass} resize-none`} />
              </div>
             
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={labelClass}>Country</label>
                  <input type="text" name="country" value={createForm.address.country} onChange={handleOnChange} placeholder="Canada" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>State</label>
                  <input type="text" name="state" value={createForm.address.state} onChange={handleOnChange} placeholder="Ontario" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>City</label>
                  <input type="text" name="city" value={createForm.address.city} onChange={handleOnChange} placeholder="Toronto" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Pincode</label>
                  <input type="text" name="pincode" value={createForm.address.pincode} onChange={handleOnChange} placeholder="M5V 3A8" className={inputClass} />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-semibold py-3 rounded-xl text-sm shadow-lg shadow-teal-200 transition-all duration-200 mt-2">
                {edit ? 'Update Profile →' : 'Create Profile →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-5">

            {/* Photo + Upload */}
            <div className="flex flex-col items-center gap-2">
              {data?.profilePhoto ? (
                <img src={data.profilePhoto} alt="profile" className="w-16 h-16 rounded-2xl object-cover border border-gray-100" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <label className="text-xs text-teal-600 cursor-pointer hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={handlePhotoUpload}
                  className="hidden"  z


                />
              </label>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-400 text-sm mt-0.5">{user.email}</p>
              <p className="text-gray-500 text-sm mt-1">{data?.bio}</p>
            </div>
          </div>
          <button onClick={handleEdit} className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md shadow-teal-100 hover:from-teal-400 hover:to-green-400 transition">
            Edit Profile
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Professional Info</h2>
            <div className="flex items-start gap-3">
              <BookOpen size={16} className="text-teal-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Education</p>
                <p className="text-gray-900 text-sm font-medium">{data?.education}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase size={16} className="text-teal-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Experience</p>
                <p className="text-gray-900 text-sm font-medium">{data?.experience}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data?.skills?.map((skill, i) => (
                <span key={i} className="bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium px-3 py-1 rounded-xl">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:col-span-2">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-teal-500" /> Address
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Country', value: data?.address?.country },
                { label: 'State', value: data?.address?.state },
                { label: 'City', value: data?.address?.city },
                { label: 'Pincode', value: data?.address?.pincode },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-gray-900 text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:col-span-2">
            <h2 className="font-semibold text-gray-900 mb-4">Resume</h2>
            {data?.resume ? (
              <a href={data.resume} target="_blank" className="text-teal-600 text-sm underline block mb-3">
                 {getFileName(data.resume)} 
              </a>
            ) : (
              <p className="text-gray-400 text-sm mb-3">No resume uploaded yet</p>
            )}
            <label className="inline-block bg-gradient-to-r from-teal-500 to-green-500 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md shadow-teal-100 hover:from-teal-400 hover:to-green-400 transition cursor-pointer">
              Upload Resume
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;