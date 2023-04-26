function LoginPage() {
  const initialState = {
    email: "",
    password: "",
  }

  return (
    <form>
      <div>
        <label htmlFor="Email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          required
        />
        <label htmlFor="Password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default LoginPage
