import FeaturedBookCard from "../FeaturedBooks/FeaturedBookCard";
import Footer from "../Footer/Footer";
import NavigationBar from "../Header/NavigationBar";

const Home = () => {
  return (
    <div className="home-container">
      <NavigationBar />
      <h1 className="home-title"> Featured Books</h1>
      <FeaturedBookCard />
      <Footer />
    </div>
  );
};

export default Home;
