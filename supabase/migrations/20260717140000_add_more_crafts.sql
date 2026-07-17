insert into public.crafts (name, slug, short_description, description, region, province, island_group, image_url, interesting_fact, ubra_url, stamp_name, question, options, correct_answer) values
(
  'Santos Wood Carving', 'santos-wood-carving',
  'Religious wooden figures carved by master santeros of Paete, Laguna.',
  'Santos are carved wooden religious figures — saints, the Holy Family, and angels — produced by the santeros of Paete, Laguna. Using local hardwoods, carvers create highly detailed figures that have been central to Filipino Catholic devotion since the Spanish colonial period. Paete is the recognized woodcarving capital of the Philippines.',
  'Calabarzon', 'Laguna', 'Luzon',
  'https://www.ubra.shop/images/museum/carved-wooden-santos-religious-figure-filipino-col.jpg',
  'Paete, Laguna has been called the "Woodcarving Capital of the Philippines" — practically every family in the town is involved in carving in some way.',
  'https://www.ubra.shop/museum', 'Santos Carving Stamp',
  'Which town is known as the Woodcarving Capital of the Philippines?',
  '["Baguio", "Paete", "Vigan", "Bohol"]'::jsonb, 1
),
(
  'Kulintang Gong Craft', 'kulintang-gong-craft',
  'Handcrafted brass gong sets from the Maranao and Maguindanao peoples.',
  'The kulintang is a set of 8 graduated brass gongs laid horizontally on a wooden rack. Crafted by Maranao and Maguindanao metalworkers in Mindanao, each gong is hand-hammered from brass alloy, tuned by ear, and used in ensemble music for rituals, celebrations, and storytelling.',
  'Bangsamoro', 'Lanao del Sur', 'Mindanao',
  'https://www.ubra.shop/images/museum/kulintang-brass-gong-set-mindanao-traditional-musi.jpg',
  'Kulintang music pre-dates Islam and Christianity in the Philippines — it is one of the oldest continuous musical traditions in Southeast Asia.',
  'https://www.ubra.shop/museum', 'Kulintang Stamp',
  'How many graduated gongs are in a traditional kulintang set?',
  '["5", "8", "12", "3"]'::jsonb, 1
),
(
  'Abaca Weaving', 'abaca-weaving',
  'Ancient fiber weaving using abaca hemp, centered in Cagayan Valley.',
  'Abaca (Manila hemp) is extracted from the stalks of the abaca plant and spun into fibers used for weaving textiles, bags, and home décor. In the Cagayan Valley and Bicol regions, weavers use traditional looms to produce durable, naturally lustrous cloth prized for its strength and beauty.',
  'Cagayan Valley', 'Isabela', 'Luzon',
  'https://www.ubra.shop/images/museum/traditional-filipino-abaca-weaving-loom-artisan-ha.jpg',
  'Abaca fiber is so strong that it was historically used to make ship rigging and is still used in Japanese yen banknotes today.',
  'https://www.ubra.shop/museum', 'Abaca Weave Stamp',
  'Abaca fiber comes from a plant related to which fruit?',
  '["Coconut", "Banana", "Mango", "Papaya"]'::jsonb, 1
),
(
  'Capiz Shell Craft', 'capiz-shell-craft',
  'Translucent shell products handcrafted in Capiz province.',
  'Capiz shells (windowpane oyster shells) are translucent, flat, and durable — qualities that made them the original material for Filipino window panes before glass. Today, artisans in Capiz province craft them into chandeliers, wind chimes, lampshades, trays, and decorative items exported worldwide.',
  'Western Visayas', 'Capiz', 'Visayas',
  'https://www.ubra.shop/images/museum/beautiful-capiz-shell-wind-chime-handcrafted-iride.jpg',
  'Before glass was common in the Philippines, capiz shells served as window panes — which is how Capiz province got its name.',
  'https://www.ubra.shop/museum', 'Capiz Shell Stamp',
  'What were capiz shells originally used for in Filipino homes?',
  '["Roof tiles", "Window panes", "Floor tiles", "Door hinges"]'::jsonb, 1
);
