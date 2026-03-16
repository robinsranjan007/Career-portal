import { getProfileById } from '@/services/profileServie'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookOpen, Briefcase, MapPin } from 'lucide-react'

function PublicProfile() {

  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserProfiles = async () => {
      try {
        const res = await getProfileById(userId)
        setProfile(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getUserProfiles()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Loading profile...</p>
    </div>
  )

  if (!profile) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400">Profile not found</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6 flex items-center gap-5">
          {profile?.profilePhoto ? (
            <img src={profile.profilePhoto} alt="profile" className="w-16 h-16 rounded-2xl object-cover border border-gray-100" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{profile?.user?.name?.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile?.user?.name}</h1>
            <p className="text-gray-400 text-sm mt-0.5">{profile?.user?.email}</p>
            <p className="text-gray-500 text-sm mt-1">{profile?.bio}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Professional Info</h2>
            <div className="flex items-start gap-3">
              <BookOpen size={16} className="text-teal-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Education</p>
                <p className="text-gray-900 text-sm font-medium">{profile?.education}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase size={16} className="text-teal-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Experience</p>
                <p className="text-gray-900 text-sm font-medium">{profile?.experience}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((skill, i) => (
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
                { label: 'Country', value: profile?.address?.country },
                { label: 'State', value: profile?.address?.state },
                { label: 'City', value: profile?.address?.city },
                { label: 'Pincode', value: profile?.address?.pincode },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-gray-900 text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resume */}
          {profile?.resume && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:col-span-2">
              <h2 className="font-semibold text-gray-900 mb-4">Resume</h2>
              
                href={profile.resume}
                target="_blank"
                className="inline-block bg-gradient-to-r from-teal-500 to-green-500 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md shadow-teal-100 hover:from-teal-400 hover:to-green-400 transition"
              >
                Download Resume
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default PublicProfile