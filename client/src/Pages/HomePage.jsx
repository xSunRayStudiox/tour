import Layout from '../components/Layout';
import { BsGeoAlt, BsPeople, BsCashCoin, BsShieldCheck } from "react-icons/bs";
import { useCities } from '../api/useCities';
import { useEffect } from 'react';
import { usePackage } from '../api/usePackage';
import useOffers from '../api/useOffer';
import useBookings from '../api/useBookings';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { cities, fetchCities } = useCities();
  const { packages, fetchPackages } = usePackage();
  const { offers, fetchOffers } = useOffers();
  const {
    bookings,
    fetchAllBookings,
  } = useBookings();

  useEffect(() => {
    fetchCities();
    fetchPackages();
    fetchOffers();
    fetchAllBookings();
  }, []);

  const cityArray = Array.isArray(cities?.cities) ? cities.cities : [];
  const offerArray = Array.isArray(offers) ? offers : [];


  const getStatusTextClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'cancelled':
        return 'text-danger';
      default:
        return '';
    }
  };



  return (
    <Layout>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-8">
              <h1 className="fw-bold">Plan Your Perfect Trip</h1>
              <p className="">
                Explore the world with confidence. Here’s what makes us different:
              </p>
            </div>
          </div>

          <div className="row g-4 text-center">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="glass-card p-4 h-100">
                <BsGeoAlt size={40} className="text-primary mb-2" />
                <h5 className="mt-2">Top Destinations</h5>
                <p className="small">Handpicked locations tailored for every traveler.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="glass-card p-4 h-100">
                <BsPeople size={40} className="text-success mb-2" />
                <h5 className="mt-2">Expert Guides</h5>
                <p className="small">Travel with trusted professionals by your side.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="glass-card p-4 h-100">
                <BsCashCoin size={40} className="text-warning mb-2" />
                <h5 className="mt-2">Best Price Guarantee</h5>
                <p className="small">Value-packed trips with transparent pricing.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="glass-card p-4 h-100">
                <BsShieldCheck size={40} className="text-danger mb-2" />
                <h5 className="mt-2">Secure Booking</h5>
                <p className="small">Your data and payments are fully protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="mt-4 mt-md-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 city-title">Top Destinations</h6>
        </div>

        <div className="horizontal-scroll d-flex flex-nowrap overflow-auto py-2 px-2">
          {cityArray?.map((city, idx) => (
            <div className="flex-shrink-0" key={idx}>
              <div className="destination-card  position-relative overflow-hidden">
                <img src={city?.image} alt={city?.name} className="w-100 destination-img" />
                <div className="p-2 d-flex glass-card position-absolute bottom-0 start-0 end-0 d-flex justify-content-between align-items-center mt-2">
                  <p className="card-text mb-0">City:</p>
                  <p className="card-text mb-0">{city?.name}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="mt-3 mt-md-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 city-title">Popular Packages</h6>

        </div>

        <div className="horizontal-scroll d-flex flex-nowrap overflow-auto py-2 px-2">
          {Array.isArray(packages) && packages.map((pkg) => (

            <div className="col-12 col-md-3" key={pkg._id}>
              <div className="glass-card h-100 position-relative overflow-hidden">
                <div className="card-actions position-absolute top-0 start-0 end-0 d-flex justify-content-between p-2 z-1">
                  <button className="btn btn-sm btn-light">{pkg.city.name}</button>
                  <Link to={`/booking/${pkg._id}`} className="btn btn-sm btn-primary">Book</Link>
                </div>

                <img src={pkg.image} className="card-img-top" alt={pkg.title} />
                <div className="card-body">
                  <h5 className="card-title">{pkg.title}</h5>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="card-text mb-0">Price: ₹{pkg.price}</p>
                    <p className="card-text mb-0">Person: {pkg.person}</p>
                  </div>

                  <p className="card-text mt-2">{pkg.description.slice(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Offers Section */}
      <section className="mt-3 mt-md-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 city-title">Special Offers</h6>
        </div>

        <div className="horizontal-scroll d-flex flex-nowrap overflow-auto py-2 px-2">
          {offerArray.map((offer) => (
            <div className="col-12 col-md-4 mb-3" key={offer._id}>
              <div className="glass-card h-100">
                <div className="card-actions d-flex justify-content-between px-2 pt-2">
                  <button className="btn btn-sm btn-primary">Copy</button>
                </div>

                <div className="card-body">
                  <h5 className="card-title text-primary">{offer.title}</h5>
                  <p className="card-text mb-0">{offer.description}</p>
                  <p className="card-text">{offer.code}</p>
                  <span className="badge bg-primary">
                    {offer.type === 'Percent' ? `${offer.percent}% OFF` : `₹${offer.fixed} OFF`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bookings Section */}
      {Array.isArray(bookings) && bookings.length > 0 && (
        <section className="mt-3 mt-md-5">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0 city-title">Your Bookings</h6>
          </div>
          <div className="horizontal-scroll d-flex flex-nowrap overflow-auto py-2 px-2">
            {bookings.map((booking) => {
              const packageTitle = booking.package ? booking.package.title : 'No Package Info';
              const cityName = typeof booking.city === 'string' ? booking.city : (booking.city?.name || 'Unknown City');

              const formatDate = (dateStr) => {
                if (!dateStr) return '-';
                const d = new Date(dateStr);
                return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
              };

              return (
                <div className="col-12 col-md-6" key={booking._id}>
                  <div className="glass-card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{packageTitle}</h5>
                      <div className="card-actions d-flex justify-content-between pt-2">
                        <p className="card-text mb-1"><strong>City:</strong> {cityName}</p>
                        <p className="card-text mb-1"><strong>Guests:</strong> {booking.quantity}</p>
                      </div>
                      <div className="card-actions d-flex justify-content-between pt-2">
                        <p className="card-text mb-1"><strong>Start:</strong> {formatDate(booking.bookingDate)}</p>
                        <p className="card-text mb-1"><strong>End:</strong> {formatDate(booking.EndDate)}</p>
                      </div>
                      <div className="card-actions d-flex justify-content-between pt-2">
                        <p className="card-text mb-1"><strong>Total:</strong> ₹{booking.totalPrice.toLocaleString()}</p>
                        <p className={`card-text mb-1 ${getStatusTextClass(booking.status)}`}>
                          {booking.status.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="card-actions d-flex justify-content-between pb-2 ps-2">
                      <button className="btn btn-sm btn-primary">View Details</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </Layout>
  );
};

export default HomePage;
