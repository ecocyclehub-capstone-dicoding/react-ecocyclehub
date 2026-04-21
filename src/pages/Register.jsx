import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register form submitted:', formData)
    // TODO: hook up to your auth API
  }

  return (
    <main className="flex min-h-screen w-full">
      {/* Left Panel: Imagery (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-surface-container-low overflow-hidden">
        <img
          alt="Close up of vibrant green fern leaves covered in morning dew drops illuminated by soft golden sunlight in a dense, lush forest setting."
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKkDrHtoav5RkaMs7NYFNQcyvC9yuB_pprNfjelK94WTIZljkX5YfMya1jZ2WzRKjmCIw2CEXGL6QA0wLCxuGLSP6gD-cB1i85YT2mynPynurdwYhAVQfZ0_zZ52I4bYBrqDTQAbVqLo72FlbVuRFsq3pes7jY37XBAxC4OEqGYt6ixQdcOgY2xG7lLo_DiM3DG8cgbLb8Mt2vnjgEEOrUiESL7LrL5LRFR7xhG6wDG3kxB7Fnk9pGOjPGvV5eXE0sHi1Pqz3N7wZw"
        />
        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
        {/* Branding Overlay */}
        <div className="absolute bottom-0 left-0 p-12 xl:p-16 flex flex-col gap-6 z-10">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-secondary-fixed text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span className="font-headline font-black text-2xl tracking-tight text-surface-container-lowest">
              EcoCycle Hub
            </span>
          </div>
          <h1 className="font-headline font-bold text-4xl xl:text-5xl text-surface-container-lowest leading-tight">
            Cultivate a <br />
            <span className="text-secondary-fixed">sustainable</span> future.
          </h1>
          <p className="text-surface-container-highest font-body text-lg max-w-md opacity-90">
            Join our curated ecosystem of responsible waste management. Transform
            resources, track your impact, and build a greener world.
          </p>
        </div>
      </div>

      {/* Right Panel: Registration Form */}
      <div className="w-full lg:w-7/12 xl:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 bg-surface relative">
        {/* Mobile Brand Header */}
        <div className="absolute top-6 left-6 flex lg:hidden items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            EcoCycle Hub
          </span>
        </div>

        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Form Header */}
          <div className="flex flex-col gap-2">
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
              Create Account
            </h2>
            <p className="font-body text-on-surface-variant text-base">
              Begin your journey towards zero waste today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  className="font-label text-sm font-medium text-on-surface-variant ml-1"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline pointer-events-none">
                    badge
                  </span>
                  <input
                    className="w-full bg-surface-container-highest text-on-surface font-body text-base rounded-xl py-3.5 pl-12 pr-4 border-0 ring-0 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all placeholder:text-outline/70"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Jane Doe"
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  className="font-label text-sm font-medium text-on-surface-variant ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline pointer-events-none">
                    mail
                  </span>
                  <input
                    className="w-full bg-surface-container-highest text-on-surface font-body text-base rounded-xl py-3.5 pl-12 pr-4 border-0 ring-0 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all placeholder:text-outline/70"
                    id="email"
                    name="email"
                    placeholder="jane@example.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  className="font-label text-sm font-medium text-on-surface-variant ml-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline pointer-events-none">
                    lock
                  </span>
                  <input
                    className="w-full bg-surface-container-highest text-on-surface font-body text-base rounded-xl py-3.5 pl-12 pr-4 border-0 ring-0 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all placeholder:text-outline/70"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <p className="font-label text-xs text-outline ml-1 mt-1">
                  Must be at least 8 characters.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg rounded-xl py-4 mt-2 shadow-[0_12px_40px_rgba(30,28,3,0.06)] hover:shadow-[0_16px_50px_rgba(30,28,3,0.1)] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
              type="submit"
            >
              <span>Sign Up</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-4">
            <p className="font-body text-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link
                className="font-headline font-bold text-primary hover:text-primary-container transition-colors underline decoration-primary/30 underline-offset-4"
                to="/login"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register
