import { Link } from "react-router-dom"
import SPButton from "../Common/SPButton"
import { useContext, useState } from "react"
import { ThemeContext } from "../../context/ThemeContextProvider"
import api from "../../API"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const { isDarkTheme } = useContext(ThemeContext)
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    password: "",
  })


  const setUserData = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(user);
  }

  const loginUser = (e) => {
    e.preventDefault()
    api.post("/login", user)
      .then((res) => {
        if (res.data.statusCode === 200) {
          window.localStorage.setItem("userId", res.data.userId);
          window.localStorage.setItem("username", res.data.username);
          setCookies("access_token", res.data.token, { path: "/" })
          navigate(`/profile/${res.data.username}`)
          alert(res.data.message);
        }
        else {
          alert(res.data.message);
        }
      })
  }

  // Response
  // {
  //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWM3MmFlMWUyZWRjNzYyNTQ2MjdmZCIsImlhdCI6MTY3OTU4NjAxN30.EgDAspvmZp4gCFiFls3D7P9XwSiCi2y7Diu4Dwt26kI",
  //   "userId": "641c72ae1e2edc76254627fd",
  //   "username": "devvsakib",
  //   "message": "Login Successfully!",
  //   "statusCode": 200
  // }

  return (
    <section className="bg-[url(/assets/BannerShape.png)] bg-cover bg-center mt-10 w-[85vw]">
      <div className="rounded-lg  p-5 pb-10 shadow-white/10 shadow-lg bannerCard bg-white/5">
        <div className="text-center">
          <h1 className="font-sptitle tt text-3xl mt-5 break-words md:text-3xl">Login</h1>
          <form onSubmit={loginUser} className="grid grid-cols-1 capitalize place-items-center justify-center my-8 gap-5">
            <input onChange={(e) => setUserData(e)} type="text" className={`${isDarkTheme ? "sp-inpLight" : "sp-inpDark"} `} required placeholder="Username" name="username" />
            <input onChange={(e) => setUserData(e)} name="password" type="password" className={`${isDarkTheme ? "sp-inpLight" : "sp-inpDark"} `} required placeholder="Password" />
            <button>
              <SPButton content="Login" />
            </button>
            <div className="mt-5">
              <p>New to SocialProfile?</p>
              <Link to="/register" className="text-blue-500">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm