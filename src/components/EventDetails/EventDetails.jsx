import { useParams, Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "A global summit on emerging technologies and AI.",
    date: "April 15, 2025",
    time: "10:00 AM",
    location: "Silicon Valley Convention Center",
    category: "Technology",
    image:
      "https://i.pinimg.com/736x/9f/78/c1/9f78c1a6f1d3faf3981f2e0dbee443b5.jpg",
    hostname: "John Doe",
  },
  {
    id: 2,
    title: "AI & Innovation Summit",
    description: "Exploring the future of artificial intelligence.",
    date: "June 10, 2025",
    time: "2:30 PM",
    location: "New York Tech Hub",
    category: "Technology",
    image:
      "https://i.pinimg.com/736x/29/e5/a0/29e5a017f0889357c537427045881dfa.jpg",
    hostname: "Jane Smith",
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    description: "An evening of exciting startup pitches and networking.",
    date: "May 20, 2025",
    time: "6:00 PM",
    location: "Downtown Incubator",
    category: "Business",
    image:
      "https://i.pinimg.com/736x/68/54/43/685443c0168901fd06c71708a2a105af.jpg",
    hostname: "Michael Lee",
  },
  {
    id: 4,
    title: "Live Jazz Night",
    description: "Experience a night of mesmerizing jazz music.",
    date: "July 5, 2025",
    time: "8:00 PM",
    location: "Blue Note Club",
    category: "Music",
    image:
      "https://i.pinimg.com/736x/b0/0c/1f/b00c1f37e0710a9d64b626f2d523a397.jpg",
    hostname: "Sophia Davis",
  },
  {
    id: 5,
    title: "Art & Culture Exhibition",
    description: "A showcase of contemporary and traditional artwork.",
    date: "August 12, 2025",
    time: "11:00 AM",
    location: "City Art Gallery",
    category: "Arts",
    image:
      "https://i.pinimg.com/736x/b6/18/11/b6181147f14cbf318253d7e31db659a8.jpg",
    hostname: "Liam Martinez",
  },
];

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0618] text-white">
        <h1 className="text-2xl font-semibold">Event not found</h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0618] via-[#1C1C2E] to-[#2A2438] text-white p-6 pt-24">
      <div className="max-w-4xl w-full bg-[#1C1C2E] bg-opacity-90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border border-[#4A0072]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-80 object-cover rounded-t-xl"
        />

        <div className="p-8">
          <h1 className="text-4xl font-semibold text-[#8A7F9E]">
            {event.title}
          </h1>
          <p className="text-lg text-gray-300 mt-4">{event.description}</p>

          <div className="mt-6 space-y-3 text-lg">
            <p>
              <span className="text-[#6A5F7E] font-medium">Date:</span>{" "}
              {event.date}
            </p>
            <p>
              <span className="text-[#6A5F7E] font-medium">Time:</span>{" "}
              {event.time}
            </p>
            <p>
              <span className="text-[#6A5F7E] font-medium">Location:</span>{" "}
              {event.location}
            </p>
            <p>
              <span className="text-[#6A5F7E] font-medium">Category:</span>{" "}
              {event.category}
            </p>
            <p>
              <span className="text-[#6A5F7E] font-medium">Host:</span>{" "}
              {event.hostname}
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/loginguest"
              className="bg-gradient-to-r from-[#4A0072] to-[#6A5F7E] text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              Book Ticket
            </Link>

            <Link
              to="/events"
              className="border border-[#6A5F7E] text-[#6A5F7E] px-6 py-3 rounded-lg hover:bg-[#6A5F7E] hover:text-white transition-transform transform hover:scale-105"
            >
              Back to Events
            </Link>
            <Link
              to="/"
              className="border border-[#6A5F7E] text-[#6A5F7E] px-6 py-3 rounded-lg hover:bg-[#6A5F7E] hover:text-white transition-transform transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
