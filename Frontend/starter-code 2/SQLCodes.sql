-- CREATE TABLES

-- to contain the list of users and their roles (user/admin)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    "user" VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role VARCHAR(255)[]
);

-- to contain the itineraries that have been created
CREATE TABLE Itinerary (
    itinerary_id serial PRIMARY KEY,
    id INT,
    activity_id INT,
    title VARCHAR(255),
    location VARCHAR(255),
    num_of_days INT,
    day INT,
    FOREIGN KEY (id) REFERENCES "users" (id),
    FOREIGN KEY (activity_id) REFERENCES Activity (activity_id)
);

-- to contain the different activities based on itinerary_id (when user adds activities to their itinerary)
CREATE TABLE ItineraryActivity (
    itinerary_id INT,
    activity_id INT,
    day INT,
    FOREIGN KEY (itinerary_id) REFERENCES Itinerary (itinerary_id),
    FOREIGN KEY (activity_id) REFERENCES Activity (activity_id)
);

-- to contain different types of activities
CREATE TABLE ActivityType (
    activity_type_name VARCHAR(255) PRIMARY KEY NOT NULL
);

-- to contain different activities
CREATE TABLE Activity (
    activity_id serial PRIMARY KEY,
    activity_type_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    district VARCHAR(255) NOT NULL,
    opening_hours TIME NOT NULL,
    address TEXT NOT NULL,
    ratings VARCHAR(255) NOT NULL,
    FOREIGN KEY (activity_type_name) REFERENCES ActivityType (activity_type_name)
);


-- POPULATE ACTIVITY TABLE

-- food & drinks
INSERT INTO Activity (activity_type_name, title, description, district, opening_hours, address, ratings, cost, image)
VALUES
    ('Food & Drinks', 'Nenno Pizza Restaurant', 'Nenno is an Italian pizza restaurant in the heart of Kings Cross. All Nenno meals, pizza and pasta are made from fresh seasonal ingredients. ', 'Islington', '11:00 AM - 10:00 PM', '14-16 Caledonian Road, London N1 9DU England', '4.5', '£££', 'nenno.png'),
    ('Food & Drinks', 'Scarlett Green', 'Quintessential heart of Soho, Scarlett Green has been the proud title holder of Number One brunch Spot in the World on TripAdvisor. Spend intimate evenings chatting and indulging in our ‘Scarlett Nights’ menu; our BBQ meat board featuring an HG Walter prime lamb tomahawk, 28 day dry aged onglet steak, our fennel, chilli and herb sausages, and smoky BBQ back ribs.', 'Soho', '11:00 AM - 10:00 PM', '4 Noel Street Soho, London W1F 8GB England', '5.0', '££££', 'scarlettgreen.png'),
    ('Food & Drinks', 'Taste Of Nawab', 'Welcome to the Taste of Nawab – a small family restaurant – rated as one of the best Indian Restaurant in North London, where our award-winning chef prepares exquisite cuisine fit for a Nawab (an Indian Prince) to taste. ', 'Hampstead Heath', '10:00 AM - 8:00 PM', '97 Colney Hatch Lane, London N10 1LR England', '5.0', '££££', 'nawab.png'),
   ('Food & Drinks', 'Gigs Fish and Chips', 'Gigs was established in 1958 and is located right in the heart of London''s west end Fitzrovia district. They are world famous for serving traditional British fish & chips but are also well known for their authentic Cypriot cuisine which includes, souvlaki, calamari, kleftico, halloumi, sheftalia plus many other dishes. All their grilled dishes are still cooked the traditional way, over real charcoal and can be enjoyed either in the restaurant or in the new outdoor seating area.', 'Fitzrovia', '11:00 AM - 10:00 PM', '12 Tottenham Street Fitzrovia, London W1T 4RE England', '4.5', '££', 'gigs.png'),
   ('Food & Drinks', 'Bruce Burgers', 'Hand made burgers with unique flours and special.. BBQ and Burger sauce… Lamp chop with juicy BBQ sauce.. Or our flour some Mac & Cheese with garlic and peppers… and Hand made desserts...', 'Tottenham', '11:00 AM - 10:00 PM', 'Addr93 Bruce Grove Tottenham, London N17 6UZ Englandess', '5', '££', 'bruce.png');

-- hotels
INSERT INTO Activity (activity_type_name, title, description, district, opening_hours, address, ratings, cost, image)
VALUES
    ('Hotels', 'Park Grand London Hyde Park', 'Everyone needs a place to lay their weary head. For travelers visiting London, Park Grand London Hyde Park is an excellent choice for rest and rejuvenation. Well-known for its family-friendly environment and proximity to great restaurants and attractions, Park Grand London Hyde Park makes it easy to enjoy the best of London.', 'Paddington', '24h', '78 - 82 Westbourne Terrace Paddington, London W2 6QA England', '4.5', '£100-120', 'parkgrandhotel.png'),
    ('Hotels', 'The Westminster London, Curio Collection by Hilton', 'The Westminster, an iconic hotel comprising stylish and uniquely designed rooms. Like the location at large, The Westminster echoes a lively but intimate setting infused with mystery and curiosity, leaving you with a feeling there’s more than meets the eye.', 'Central London', '24h', '30 John Islip Street, London SW1P 4DD England', '4.5', '£150-180', 'curiohotel.png'),
    ('Hotels', 'Shangri-La The Shard, London', 'Feel an unparalleled connection at Shangri-La The Shard, London. Stay in the capital’s highest hotel, in one of the world’s most iconic buildings, whilst enjoying panoramic skyline views that connect you to the whole city. This is the only five-star luxury hotel in London Bridge, contrasting sleek modern style with the area’s rich historic character.', 'St Thomas', '24h', '31 St Thomas Street, London SE1 9QU England', '5.0', '£220-260', 'shard.png'),
   ('Hotels', 'Brown''s Hotel', 'Located in London’s most exclusive borough, Brown’s Hotel is a microcosm of chic, modern and arty Mayfair making it the ideal base for luxury travellers. Contemporary design and an eclectic collection of works by leading artists combine to give Brown’s its inimitable style and a charismatic air that brings guests back time and time again. ', 'Mayfair', '24h', '33 Albemarle Street Mayfair, London W1S 4BP England', '5', '£500-700', 'brownshotel.png'),
   ('Hotels', 'One Aldwych', 'Welcome to London’s cultured, independent hotel at the beating heart of city life. One Aldwych is one of the very few hotels in London (or indeed the world) that can say it is truly independent. As such, everything is created and curated to delight. Stepping into the lobby of this singularly beautiful building is to step into a moment in history, dressed up in style. Built in 1905 as the home of the Morning Post newspaper, it still inspires spirited conversation and connection. Today, the building’s Art Nouveau curves and stylish flair sit easily with the modern luxuries of this contemporary, forward-thinking hotel.', 'Aldwych', '24h', '1 Aldwych, London WC2B 4BZ England', '5', '£400-600', 'onealdwych.png');

-- things to see
INSERT INTO Activity (activity_type_name, title, description, district, opening_hours, address, ratings, cost, image)
VALUES
	('Things to see', 'Tower Bridge', 'An iconic London landmark and one of Britain''s best loved historic sites, Tower Bridge is open to the public 363 days a year. Within the Bridge''s iconic structure and magnificent Victorian Engine rooms, the Tower Bridge Exhibition is the best way of exploring the most famous bridge in the world! ', 'Tower Bridge', '9:30 AM - 6:00 PM', 'Tower Bridge Road, London SE1 2UP England', '4.5', 'Free', 'towerbridge.png'),
    ('Things to see', 'Natural History Museum', 'A center of scientific excellence in the discovery of taxonomy and biodiversity, this world-famous museum promotes the discovery and enjoyment of the natural world through such exciting exhibits as the Life and Earth Galleries, wildlife garden and geological collections.', 'Kensington & Hyde Park', '9:30 AM - 6:00 PM', 'Cromwell Road South Kensington, London SW7 5BD England', '4.5', '£2.50', 'naturalhistorymuseum.png'),
    ('Things to see', 'Hyde Park, London', 'Once the hunting ground for Henry VIII, this large royal park is best known for its famous Speakers'' Corner, where people speak their minds, Rotton Row, a famous horse-riding area and Serpentine Lake, home to waterfowl and oarsmen.', 'Kensington & Hyde Park', '24h', 'Hyde Park', '5.0', 'Free', 'hydepark.png'),
   ('Things to see', 'Buckingham Palace', 'Buckingham Palace is recognised around the world as the focus of national and royal celebrations as well as the backdrop to the regular Changing the Guard ceremony. Explore the magnificent State Rooms which are open to visitors for 10 weeks each summer and on selected dates during winter and spring. During a visit to Buckingham Palace, visitors can see the 19 magnificent State Rooms, which provide the setting for ceremonial occasions and official entertaining. All rooms are furnished with many of the greatest treasures from the Royal Collection.', 'Westminster', '11:00 AM - 5:00 PM
', 'Spur Road, London SW1A 1AA England', '4.5', '£20', 'buckingham.png'),
   ('Things to see', 'Big Ben', 'Better known as Big Ben (it''s actually the name of the Great Bell!), this iconic clock tower which stands at the Houses of Parliament is officially called the Elizabeth Tower, named in honor of Queen Elizabeth II''s Diamond Jubilee. When the Elizabeth Tower is open for tours, you can climb up the tower and admire the clock and bell up close—though slots are limited to U.K. residents and require reservations in advance.', 'Westminster', '8:00 AM - 8:00 PM', 'Parliament Sqaure Elizabeth Tower - Houses of Parliament, Westminster, London SW1A 0AA England', '4.5', 'Free', 'bigben.png');

-- things to do
INSERT INTO Activity (activity_type_name, title, description, district, opening_hours, address, ratings, cost, image)
VALUES
	('Things to do', 'Harry Potter Tour of Warner Bros. Studio Tour', 'Located on the outskirts of London, Warner Bros. Studio is home to a treasure trove of Harry Potter film sets, costumes, props, and other special mementos. On this tour, climb aboard a comfortable coach at a time of your choosing and head straight there. You have time to independently explore the exhibits, take photos, browse the gift shop, and even enjoy a glass of butterbeer (at your own expense).', 'Victoria', '9:30 AM - 6:00 PM', 'Victoria St, London SW1E 5ND, UK', '4.5', '£40', 'harrypotter.png'),
    ('Things to do', 'Stonehenge Tour', 'Explore Stonehenge, one of England’s most famous destinations, with the convenience of a full-day tour that includes round-trip transportation from London. Have time to see the monument independently with commentary provided by an audio guide that delves into the origins of this 5,000-year-old stone monument. Your tour includes admission ticket, audio guide, and transportation.', 'Glouscester', '9:30 AM - 6:00 PM', 'Gloucester Rd, South Kensington, London SW7, UK', '4.5', '£20', 'stonehenge.png'),
    ('Things to do', 'Borough Market', 'Even before the arrival of the instantly iconic Shard, the riverside scene in Southwark had moved well beyond any up-and-coming phase of development. For quite some time, locals and out-of-towners alike have loved browsing the boutiques of Bermondsey High Street, foraging through the bounteous stalls at centuries old foodie haven Borough Market, and flocking to the banks of the Thames to enjoy some of Britain''s biggest attractions such as Tate Modern and Shakespeare''s Globe.', 'Southwark', '9:30 AM - 6:00 PM', '8 Southwark Street, London SE1 1TL England', '5.0', '£10-30', 'boroughmarket.png'),
    ('Things to do', 'Camden Market', 'We''re driven by the belief that you can only keep discovering if you keep looking ... so we''re always adding interesting stores and traders. No two days are ever the same at Camden Market. Keep checking back to see what''s new and what''s next.', 'Camden', '10:00 AM - 10:30 PM', '32 Camden Lock Place, London NW1 8AF England', '4.5', '£10-30', 'camdenmarket.png'),
    ('Things to do', 'London Eye', 'Located along the Thames River, this iconic observation wheel offers unobstructed views from its glass pods. During the 30-minute ride, you''ll be able to see London''s well-known buildings like Buckingham Palace, Big Ben, and The Shard. On a clear day, you can see up to 25 miles from the top—where Windsor Castle is. Sunset views here are otherworldly, but nightfall views of the twinkling lights are great too. ', 'Waterloo', '11:00 AM - 6:00 PM', 'Westminster Bridge Road Riverside Building, County Hall, London SE1 7PB England', '4.5', '£20', 'londoneye.png'),
    ('Things to do', 'Day Trip to Cotswolds', 'Escape the city and explore the charming English countryside on a day trip to the Cotswolds from London. Rather than hiring a car and navigating unfamiliar roads, you’ll be transported between dispersed attractions in comfort, which gives you more time to focus on the scenery.', 'Cotswolds', '24h', 'Cotswolds', '4.5', '£100-150 per day', 'cotswolds.png');


-- POPULATE ACTIVITYTYPE TABLE

INSERT INTO ActivityType (activity_type_name)
VALUES
	('Hotels'),
	('Restaurants'),
	('Things to see'),
	('Things to do');