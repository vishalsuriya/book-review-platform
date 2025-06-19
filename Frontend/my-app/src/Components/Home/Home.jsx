import FeaturedBookCard from "../FeaturedBooks/FeaturedBookCard";
import NavigationBar from "../Header/NavigationBar";

const Home = () => {
  return (
    <div className="home-container">
      <NavigationBar />
      <h1 className="home-title"> Featured Books</h1>
      <FeaturedBookCard />
    </div>
  );
};

export default Home;
