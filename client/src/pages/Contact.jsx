import Footer from '../components/Footer'

const Contact = () => {
  return (
    <>
      <div className="bg-[#f5f3f3] min-h-screen p-6 lg:px-10 lg:pt-8">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-[#fb923c] text-4xl font-semibold pb-4">
            Contact Us
          </h2>

          <div className="space-y-2 pb-4">
            <p className="indent-6 tracking-wide">
              At "Soul Heat," we're here to assist you in every way possible.
              Whether you have a question, need support, or just want to chat,
              we'd love to hear from you. Here's how you can reach out to us:
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">Location:</h3>
            <p className="indent-6 tracking-wide">
              While "Soul Heat" primarily operates online, you can find our
              office at:
              <br />
              123 Gourmet Avenue, Foodtown, FL 54321
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">Contact Information:</h3>

            <p className="indent-6 tracking-wide">
              Email: contact@soulheatapp.com
            </p>
            <p className="indent-6 tracking-wide">Phone: +1 (123) 456-7890</p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">Operating Hours:</h3>

            <p className="indent-6 tracking-wide">
              Our customer support team is available to assist you during the
              following hours:
              <br />
              Monday to Friday: 9:00 AM - 6:00 PM (EST) Saturday and Sunday:
              10:00 AM - 4:00 PM (EST)
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">
              Frequently Asked Questions:
            </h3>

            <p className="indent-6 tracking-wide">
              Before reaching out to us, you might find answers to your
              questions in our FAQ section. It's a helpful resource for common
              inquiries.
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">Customer Support Policy:</h3>
            <p className="indent-6 tracking-wide">
              At "Soul Heat," we take pride in providing excellent customer
              support. Our team is committed to responding to your queries and
              addressing your concerns promptly. You can expect a friendly and
              professional approach in every interaction.
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">
              Privacy and Data Protection:
            </h3>
            <p className="indent-6 tracking-wide">
              We take your privacy and data protection seriously. Please review
              our Privacy Policy to understand how we handle your personal
              information.
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">Feedback or Suggestions:</h3>
            <p className="indent-6 tracking-wide">
              We value your feedback and suggestions as they help us improve our
              services. If you have any ideas or comments you'd like to share,
              please feel free to do so through our Feedback Form.
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">Emergency Contact:</h3>
            <p className="indent-6 tracking-wide">
              For urgent matters or emergencies, you can reach us 24/7 at:
            </p>
            <p className="indent-6 tracking-wide">
              Emergency Contact: +1 (123) 456-7891
              <br />
              Thank you for choosing "Soul Heat." We look forward to hearing
              from you and serving you with the best in culinary experiences.
              Your satisfaction is our priority, and we're here to make your
              "Soul Heat" experience exceptional.
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <h3 className="text-xl font-semibold">Social Media:</h3>

            <p className="indent-6 tracking-wide">
              Stay connected with us on social media. Follow, like, and interact
              with us on your favorite platforms:
            </p>

            <ul className="flex justify-evenly">
              <li className="underline">
                <a href="#">Facebook</a>
              </li>
              <li className="underline">
                <a href="#">Twitter</a>
              </li>
              <li className="underline">
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Contact
