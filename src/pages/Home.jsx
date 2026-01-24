import { useEffect } from 'react'; // Kept in case you need it for animations later, otherwise can be removed.
import '../styles/Home.css';
import landingImage from '../assets/home1.webp';        // Desktop image (High Res)
import landingImageMobile from '../assets/landing.webp'; // Mobile image (Portrait)
import '../index.css';

const Home = () => {
  return (
    <>
      {/* Landing Section */}
      <div className="home-landing">
        
        {/* BACKGROUND LOGIC: 
            1. <picture> allows us to specify different images for different screen sizes.
            2. The 'source' tag triggers for screens 768px wide or smaller (Mobile).
            3. The 'img' tag is the default for everything else (Desktop, including 25"+ monitors).
        */}
        <picture className="landing-bg-wrapper">
          <source media="(max-width: 768px)" srcSet={landingImageMobile} />
          <img
            src={landingImage}
            alt="The Plug kiosk illustration"
            className="landing-img"
          />
        </picture>

        {/* Dark overlay to make text readable */}
        <div className="overlay"></div>

        {/* Main Content */}
        <div className="content animate__animated animate__fadeInUp">
          <h1 className="display-4 fw-bold">
            Welcome to <span className="text-success">The Plug</span>
          </h1>
          <p className="lead">
            Your one-stop shop for premium cannabis products, sneaker care, and more.
          </p>
          <a href="/products" className="btn btn-success btn-lg mt-3">
            Explore Our Products
          </a>
        </div>
      </div>

      {/* About The Plug Section */}
      <section className="about-section py-5 bg-light text-dark" id="about">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">About The Plug</h2>
          <p className="lead text-center mb-5">
            Born on the corner. Built for the people.
          </p>
          <p>
            The Plug started on a humble corner in Protea Glen Extension 20, Soweto, right next to a spaza shop where local boys would gather, vibe, and unwind.
            <br />During the COVID-19 lockdown, when the world slowed down, conversations at that corner became more meaningful. With time on their hands and ideas flowing, one concept stood out: The Plug. While names like High Zone were thrown into the mix, The Plug resonated the most a symbol of connection, support, and empowerment.
            <br />The idea was simple but powerful: if everyone was already chilling here, why not create something meaningful right where we are? Back then, Rethabile Moloi also known as The Witch wasn’t even smoking yet.
            <br />But the energy, the conversations, and the love for ganja sparked a deeper curiosity. He started researching cannabis and its place in South Africa’s culture, economy, and legal system.
            <br /> <br />This journey led him to understand more than just the herb he discovered the business side, the medicinal benefits, the history, and the future of cannabis in the country. Determined to do it right, Rethabile connected with Marijuana board of SA, began building compliance documents, and laid the foundation for a legal, community-based cannabis operation. After years of planning, learning, and grinding, The Plug officially opened its doors on 3 February 2025.
            <br /> Today, The Plug isn’t just a cannabis shop it’s a lifestyle and empowerment hub. The real value isn’t just in sales it’s in the vision. The Plug is becoming a platform: The Plug Lounge a space to connect, relax, and vibe.
            <br /><br /> The Plug Car wash offering car wash services with a chill twist. The Plug Market a place to showcase and sell local products. The Plug Beauty where cannabis-infused hair and skincare products take center stage. The Plug Education workshops and sessions focused on cannabis knowledge, business, and legal rights. At its heart, The Plug means helping someone else plug in to resources, to opportunities, to knowledge, and to a better version of themselves. Whether you're here to chill, learn, or grow your own hustle, The Plug is for you.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;