insert into public.crafts (name, slug, short_description, description, region, province, island_group, image_url, interesting_fact, ubra_url, stamp_name, question, options, correct_answer) values
(
  'Burnay Pottery', 'burnay-pottery',
  'Earthenware jars fired in ground kilns, made in Ilocos for centuries.',
  'Burnay are large earthenware jars shaped on a potter''s wheel and fired in massive ground kilns. In Vigan, potters mix local clay with fine sand (anay) and use a foot-powered wheel to build jars traditionally used to age rice wine (basi), vinegar, and bagoong.',
  'Ilocos', 'Ilocos Sur', 'Luzon',
  'https://www.ubra.shop/images/museum/burnay-pottery-traditional-ilocos-clay-jars-terrac.jpg',
  'Burnay kilns can reach over 1,000 degrees Celsius, giving the jars their signature stone-hard, dark finish.',
  'https://www.ubra.shop/museum', 'Burnay Jar Stamp',
  'What material is traditionally used to make Burnay jars?',
  '["Bronze", "Bamboo", "Clay", "Glass"]'::jsonb, 2
),
(
  'Bulul Wood Carving', 'bulul-wood-carving',
  'Carved wooden rice guardians of the Ifugao people.',
  'The Bulul is a carved wooden figure representing a rice deity among the Ifugao of the Cordillera. Sculpted from a single piece of narra or other hardwood, Bulul are placed in granaries and homes during rituals to protect and multiply the rice harvest.',
  'Cordillera', 'Ifugao', 'Luzon',
  'https://www.ubra.shop/images/museum/ifugao-bulul-wooden-rice-god-statue-traditional-ca.jpg',
  'Bulul figures are ritually consecrated with sacrificial blood and rice wine, believed to give them their protective power.',
  'https://www.ubra.shop/museum', 'Bulul Guardian Stamp',
  'What does the Ifugao Bulul figure traditionally guard?',
  '["Gold", "Rice harvests", "Fishing boats", "City gates"]'::jsonb, 1
),
(
  'Inabel Weaving', 'inabel-weaving',
  'Handwoven Ilocano textiles, including the hypnotic Binakol pattern.',
  'Inabel is the handwoven cotton cloth of the Ilocos region, made on wooden pedal looms. Its most striking form is the Binakol, whose swirling geometric patterns create an optical, dizzying effect traditionally believed to protect the sleeper from malevolent spirits.',
  'Ilocos', 'Ilocos Sur', 'Luzon',
  'https://www.ubra.shop/images/museum/binakol-woven-blanket-geometric-pattern-traditiona.jpg',
  'The whirlwind-like Binakol design is said to confuse and repel evil spirits, acting as a woven amulet.',
  'https://www.ubra.shop/museum', 'Binakol Weave Stamp',
  'The Binakol textile is famous for its dizzying ___ designs believed to ward off evil spirits.',
  '["Geometric spiral", "Floral bouquet", "Animal portrait", "Written verse"]'::jsonb, 0
),
(
  'Pina Cloth', 'pina-cloth',
  'Sheer, luxurious fabric woven from pineapple-leaf fibers in Aklan.',
  'Pina is a delicate, translucent cloth hand-woven from fibers extracted from the leaves of the red Bisaya pineapple. Centered in Aklan, it is prized for the barong Tagalog and formal wear, with fibers hand-knotted one by one before weaving.',
  'Western Visayas', 'Aklan', 'Visayas',
  'https://www.ubra.shop/images/museum/delicate-pina-cloth-pineapple-fiber-filipino-texti.jpg',
  'A single bolt of pina can take months to make, as each fiber is scraped, washed, and hand-knotted before weaving begins.',
  'https://www.ubra.shop/museum', 'Pina Cloth Stamp',
  'Pina cloth is woven from the fibers of which plant?',
  '["Cotton", "Abaca", "Silk", "Pineapple"]'::jsonb, 3
),
(
  'Banig Mat Weaving', 'banig-mat-weaving',
  'Colorful handwoven mats from the Visayas, made from dried leaves.',
  'The banig is a handwoven mat crafted from dried and dyed leaves of the tikog reed or buri palm. In Samar and Basey, weavers create vivid geometric patterns, producing mats used for sleeping, prayer, and as decorative art.',
  'Eastern Visayas', 'Samar', 'Visayas',
  'https://www.ubra.shop/images/museum/colorful-filipino-banig-woven-mat-traditional-patt.jpg',
  'In Basey, Samar, some banig are woven so finely they can be folded like cloth without cracking.',
  'https://www.ubra.shop/museum', 'Banig Mat Stamp',
  'A banig is a traditional handwoven ___.',
  '["Basket", "Drum", "Sleeping mat", "Clay jar"]'::jsonb, 2
),
(
  'T''nalak Dream Cloth', 'tnalak-dream-cloth',
  'Sacred abaca cloth woven from dreams by the T''boli of Mindanao.',
  'T''nalak is a sacred cloth woven by the T''boli people from abaca fibers, dyed in three colors: black, red, and natural white. Master weavers, called dream weavers, are said to receive their intricate patterns from Fu Dalu, the spirit of abaca, in their dreams.',
  'SOCCSKSARGEN', 'South Cotabato', 'Mindanao',
  'https://www.ubra.shop/images/museum/tboli-tnalak-cloth-traditional-filipino-weaving-ge.jpg',
  'Weavers never cut the cloth carelessly, apologizing to the abaca spirit first, and no two t''nalak patterns are ever exactly alike.',
  'https://www.ubra.shop/museum', 'T''nalak Dream Stamp',
  'T''nalak cloth is woven by the T''boli from which fiber?',
  '["Abaca", "Pineapple", "Wool", "Jute"]'::jsonb, 0
);
