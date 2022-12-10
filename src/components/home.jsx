import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Link to="/signup">
        初めての方はこちら
      </Link>
      <br />
      <Link to="/login">
        登録済みの方はこちら
      </Link>
    </div>
  )
}