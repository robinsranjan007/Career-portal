import { useForm } from "react-hook-form";
import { register as registerUser } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const handleFormSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4"
      style={{ backgroundImage: "radial-gradient(#d4a96a22 1px, transparent 1px)", backgroundSize: "20px 20px" }}>

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block border-4 border-double border-amber-800 px-6 py-2 mb-4">
            <h1 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              CareerPortal
            </h1>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="h-px bg-amber-700 flex-1"></div>
            <p className="text-amber-700 text-xs uppercase tracking-widest px-2">Create Account</p>
            <div className="h-px bg-amber-700 flex-1"></div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-amber-50 border-2 border-amber-800 p-8 shadow-[6px_6px_0px_#92400e]">

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

            <div>
              <label className="block text-sm font-bold text-amber-900 mb-1.5 uppercase tracking-wide"
                style={{ fontFamily: 'Georgia, serif' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-amber-100 border-2 border-amber-700 text-amber-900 placeholder-amber-400 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-900 transition"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-700 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-amber-900 mb-1.5 uppercase tracking-wide"
                style={{ fontFamily: 'Georgia, serif' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-amber-100 border-2 border-amber-700 text-amber-900 placeholder-amber-400 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-900 transition"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })}
              />
              {errors.email && <p className="text-red-700 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-amber-900 mb-1.5 uppercase tracking-wide"
                style={{ fontFamily: 'Georgia, serif' }}>
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                className="w-full bg-amber-100 border-2 border-amber-700 text-amber-900 placeholder-amber-400 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-900 transition"
                {...register("contactNumber", { required: "Contact number is required" })}
              />
              {errors.contactNumber && <p className="text-red-700 text-xs mt-1">{errors.contactNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-amber-900 mb-1.5 uppercase tracking-wide"
                style={{ fontFamily: 'Georgia, serif' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-amber-100 border-2 border-amber-700 text-amber-900 placeholder-amber-400 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-900 transition"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
              />
              {errors.password && <p className="text-red-700 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-amber-900 mb-1.5 uppercase tracking-wide"
                style={{ fontFamily: 'Georgia, serif' }}>
                I Am A
              </label>
              <select
                className="w-full bg-amber-100 border-2 border-amber-700 text-amber-900 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-900 transition"
                {...register("role", { required: "Please select a role" })}
              >
                <option value="">Select role</option>
                <option value="seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
              {errors.role && <p className="text-red-700 text-xs mt-1">{errors.role.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 font-bold py-3 text-sm uppercase tracking-widest transition shadow-[3px_3px_0px_#451a03] hover:shadow-[1px_1px_0px_#451a03] hover:translate-x-0.5 hover:translate-y-0.5 mt-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Create Account
            </button>

          </form>

          <div className="flex items-center gap-2 my-5">
            <div className="h-px bg-amber-300 flex-1"></div>
            <span className="text-amber-500 text-xs">✦</span>
            <div className="h-px bg-amber-300 flex-1"></div>
          </div>

          <p className="text-center text-amber-700 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-amber-900 font-bold underline underline-offset-2 hover:text-amber-700">
              Sign in
            </Link>
          </p>

        </div>

        <p className="text-center text-amber-600 text-xs mt-4" style={{ fontFamily: 'Georgia, serif' }}>
          Est. 2024 · CareerPortal · All Rights Reserved
        </p>

      </div>
    </div>
  )
}

export default Register;