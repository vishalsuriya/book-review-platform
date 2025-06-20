import React from 'react'
import NavigationBar2 from "../Header/NavigationBar2"
import FeaturedBookCard from '../FeaturedBooks/FeaturedBookCard';
import Footer from '../Footer/Footer';
const UserLogin = () => {
  return (
   <div className="home-container">
      <NavigationBar2 />
      <h1 className="home-title"> Featured Books</h1>
      <FeaturedBookCard />
      <Footer />
    </div>
  )
}

export default UserLogin;