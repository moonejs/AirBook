const sampleListings = [
  {
    title: "Serene Mountain Cottage in Manali",
    description: "A peaceful retreat in the Himalayas. Enjoy stunning mountain views, fresh air, and cozy evenings by the fireplace.",
    image: {
      url: "https://images.unsplash.com/photo-1565057943702-c0b3205ea43a?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 3500,
    location: "Manali",
    country: "India",
  },
  {
    title: "Luxury Beachfront Villa in Goa",
    description: "Experience the best of Goa in this stunning villa with a private pool, just steps from the beach. Perfect for a sunny getaway.",
    image: {
      url: "https://images.unsplash.com/photo-1633234606371-4e8edaa6eb30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 15000,
    location: "Goa",
    country: "India",
  },
  {
    title: "Historic Haveli in Jaipur",
    description: "Step back in time in this beautifully restored haveli in the heart of the Pink City. Experience royal Rajasthani hospitality.",
    image: {
      url: "https://images.unsplash.com/photo-1667099639128-4b10f464f4a2?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 8000,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Quaint Houseboat on Kerala Backwaters",
    description: "Float along the tranquil backwaters of Alleppey in a traditional Kettuvallam. A unique and unforgettable experience.",
    image: {
      url: "https://images.unsplash.com/photo-1644186087611-a47c59d3f786?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 6500,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "Modern Urban Apartment in Mumbai",
    description: "A stylish and comfortable apartment in the bustling city of Mumbai. Close to major attractions and nightlife.",
    image: {
      url: "https://images.unsplash.com/photo-1573645594978-b746692d2a84?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 9000,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Riverside Camp in Rishikesh",
    description: "An adventurous stay by the Ganges. Perfect for rafting enthusiasts and those seeking spiritual peace.",
    image: {
      url: "https://images.unsplash.com/photo-1568842602674-d21dadfffddd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 2500,
    location: "Rishikesh",
    country: "India",
  },
  {
    title: "Elegant Lake Palace in Udaipur",
    description: "Live like royalty in this stunning palace overlooking Lake Pichola. A truly magical experience.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1661920471538-d4b17c13f74b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 25000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Colonial Charm in Shimla",
    description: "A beautiful cottage with colonial architecture, offering panoramic views of the surrounding hills.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1697729622923-920b4f4f8d2a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 7000,
    location: "Shimla",
    country: "India",
  },
  {
    title: "Tea Plantation Bungalow in Munnar",
    description: "Wake up to the aroma of fresh tea leaves in this charming bungalow set amidst lush green tea gardens.",
    image: {
      url: "https://images.unsplash.com/photo-1733561589506-3987c5672642?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 5500,
    location: "Munnar",
    country: "India",
  },
  {
    title: "Artistic Studio in Kolkata",
    description: "A vibrant and artistic studio apartment in the cultural capital of India. Perfect for creative souls.",
    image: {
      url: "https://images.unsplash.com/photo-1558288745-f5eae9698d80?q=80&w=1192&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 4000,
    location: "Kolkata",
    country: "India",
  },
  {
    title: "Chic Apartment in South Delhi",
    description: "Explore Delhi from this modern and chic apartment located in a posh South Delhi neighborhood.",
    image: {
      url: "https://images.unsplash.com/photo-1711517479380-9fa1735be261?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 8500,
    location: "New Delhi",
    country: "India",
  },
  {
    title: "Peaceful Homestay in Puducherry",
    description: "Experience French colonial charm in this peaceful homestay located in the beautiful White Town.",
    image: {
      url: "https://images.unsplash.com/photo-1706035067187-365d7f907f6c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 3000,
    location: "Puducherry",
    country: "India",
  },
  {
    title: "Desert Camp under the Stars in Jaisalmer",
    description: "A magical night in the Thar Desert. Enjoy camel safaris, traditional folk music, and a starlit sky.",
    image: {
      url: "https://images.unsplash.com/photo-1662879046665-b286adb83aad?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 4500,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Coffee Estate Homestay in Coorg",
    description: "A refreshing stay in the heart of a coffee plantation. Learn about coffee making and enjoy nature trails.",
    image: {
      url: "https://images.unsplash.com/photo-1715595683223-aaa2b35fa16e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 5000,
    location: "Coorg",
    country: "India",
  },
  {
    title: "Mountain View Room in Darjeeling",
    description: "Wake up to a spectacular view of the Kanchenjunga. Enjoy the famous Darjeeling tea and serene environment.",
    image: {
      url: "https://images.unsplash.com/photo-1647456218646-e8ed1179e20f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 4800,
    location: "Darjeeling",
    country: "India",
  },
  {
    title: "Luxury Tent in Ranthambore",
    description: "Combine wildlife adventure with luxury. Stay in a high-end tent near the Ranthambore National Park.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1663011066177-eb55388cf295?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 12000,
    location: "Ranthambore",
    country: "India",
  },
  {
    title: "Sea View Apartment in Chennai",
    description: "A modern apartment offering stunning views of the Bay of Bengal. Close to the city's cultural hubs.",
    image: {
      url: "https://images.unsplash.com/photo-1625216846235-c49ef7dd38c9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 7500,
    location: "Chennai",
    country: "India",
  },
  {
    title: "Yoga Retreat in McLeod Ganj",
    description: "A serene and spiritual retreat in the home of the Dalai Lama. Perfect for meditation and yoga.",
    image: {
      url: "https://images.unsplash.com/photo-1526718583451-e88ebf774771?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 3200,
    location: "McLeod Ganj",
    country: "India",
  },
  {
    title: "Heritage Hotel in Hampi",
    description: "Stay amidst the ancient ruins of the Vijayanagara Empire. A unique historical experience.",
    image: {
      url: "https://images.unsplash.com/photo-1720655259452-9666b8c4d318?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 6000,
    location: "Hampi",
    country: "India",
  },
  {
    title: "Riverside Cottage in Kasol",
    description: "A cozy cottage by the Parvati river, surrounded by lush green forests and towering mountains.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1683586218068-8f5e7c281804?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listingImage"
    },
    price: 2800,
    location: "Kasol",
    country: "India",
  },
];

module.exports = { data: sampleListings };
