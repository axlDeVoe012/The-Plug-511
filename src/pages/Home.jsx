import '../styles/Home.css';
import landingImage from '../assets/landing.svg';
import '../index.css';

const Home = () => (
  <>
    {/* Landing Section */}
    <div
      className="home-landing d-flex align-items-center justify-content-center text-white text-center"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <div className="overlay"></div>
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

        <div className="mb-4">
          <p>
            The Plug started on a humble corner in Protea Glen Extension 20, Soweto — right next
            to a spaza shop where local boys would gather, vibe, and unwind. During the COVID-19
            lockdown, when the world slowed down, conversations at that corner became more
            meaningful. With time on their hands and ideas flowing, one concept stood out:
            <strong> The Plug</strong>.
          </p>
          <p>
            While names like High Zone were thrown into the mix, The Plug resonated the most — a
            symbol of connection, support, and empowerment. The idea was simple but powerful: if
            everyone was already chilling here, why not create something meaningful right where
            we are?
          </p>
          <p>
            Back then, Rethabile Moloi — also known as <em>The Witch</em> — wasn’t even smoking yet.
            But the energy, the conversations, and the love for ganja sparked a deeper curiosity.
            He started researching cannabis and its place in South Africa’s culture, economy, and
            legal system. This journey led him to understand more than just the herb — he discovered
            the business side, the medicinal benefits, the history, and the future of cannabis in
            the country.
          </p>
          <p>
            Determined to do it right, Rethabile connected with Marijuana Board of SA, began
            building compliance documents, and laid the foundation for a legal, community-based
            cannabis operation. After years of planning, learning, and grinding, The Plug
            officially opened its doors on <strong>3 February 2025</strong>.
          </p>
          <p>
            Today, The Plug isn’t just a cannabis shop — it’s a lifestyle and empowerment hub.
            The real value isn’t just in sales — it’s in the vision.
          </p>
        </div>

        <div className="mb-4">
          <h4 className="fw-bold">The Plug is becoming a platform:</h4>
          <ul>
            <li><strong>The Plug Lounge</strong> – a space to connect, relax, and vibe.</li>
            <li><strong>The Plug Car Wash</strong> – offering car wash services with a chill twist.</li>
            <li><strong>The Plug Market</strong> – a place to showcase and sell local products.</li>
            <li><strong>The Plug Beauty</strong> – where cannabis-infused hair and skincare products take center stage.</li>
            <li><strong>The Plug Education</strong> – workshops and sessions focused on cannabis knowledge, business, and legal rights.</li>
          </ul>
        </div>

        <p className="mt-4">
          At its heart, <strong>The Plug</strong> means helping someone else plug in — to resources,
          to opportunities, to knowledge, and to a better version of themselves. Whether you're here
          to chill, learn, or grow your own hustle, The Plug is for you.
        </p>
      </div>
    </section>
  </>
);

export default Home;
